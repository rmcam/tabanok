import { Injectable, Inject } from '@nestjs/common';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Multimedia } from './entities/multimedia.entity';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import * as fs from 'fs';
import * as util from 'util';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);

@Injectable()
export class MultimediaService {
  private uploadPath: string;
  private storageProvider: string;
  private s3Client: S3Client;
  private s3Bucket: string;

  constructor(
    @InjectRepository(Multimedia)
    private multimediaRepository: Repository<Multimedia>,
    @Inject(ConfigService) private configService: ConfigService,
  ) {
    this.storageProvider = this.configService.get<string>('app.storage.provider');
    this.uploadPath = './uploads/multimedia'; // Directorio local por defecto

    if (this.storageProvider === 'local') {
      this.ensureUploadDirectoryExists();
    } else if (this.storageProvider === 'aws-s3') {
      this.s3Bucket = this.configService.get<string>('app.storage.bucket');
      this.s3Client = new S3Client({
        region: this.configService.get<string>('app.storage.region'),
        credentials: {
          accessKeyId: this.configService.get<string>('app.storage.accessKey'),
          secretAccessKey: this.configService.get<string>('app.storage.secretKey'),
        },
      });
    }
  }

  private async ensureUploadDirectoryExists() {
    try {
      await mkdir(this.uploadPath, { recursive: true });
    } catch (error) {
      console.error('Error creating upload directory:', error);
      // Dependiendo de la estrategia de manejo de errores, podrías lanzar una excepción aquí
    }
  }

  async create(file: Express.Multer.File, lessonId?: number): Promise<Multimedia> {
    let filePath: string;
    const fileKey = `${Date.now()}-${file.originalname}`; // Usar un nombre único para S3

    if (this.storageProvider === 'local') {
      // Lógica de almacenamiento local
      const filename = `${Date.now()}-${file.originalname}`;
      filePath = `${this.uploadPath}/${filename}`;

      // Mover el archivo temporal a la ubicación final
      await util.promisify(fs.rename)(file.path, filePath);

    } else if (this.storageProvider === 'aws-s3') {
      // Lógica de subida a AWS S3
      const fileContent = await readFile(file.path);
      const uploadParams = {
        Bucket: this.s3Bucket,
        Key: fileKey,
        Body: fileContent,
        ContentType: file.mimetype,
      };

      try {
        await this.s3Client.send(new PutObjectCommand(uploadParams));
        filePath = `s3://${this.s3Bucket}/${fileKey}`; // Guardar la URI de S3
      } catch (error) {
        console.error(`Error uploading file ${file.originalname} to S3:`, error);
        // Asegurarse de eliminar el archivo temporal incluso si la subida a S3 falla
        try {
          await unlink(file.path);
        } catch (unlinkError) {
          console.error(`Error deleting temporary file ${file.path} after S3 upload failure:`, unlinkError);
        }
        throw new Error('Failed to upload file to storage.');
      } finally {
        // Eliminar el archivo temporal después de intentar subirlo a S3
        try {
          await unlink(file.path);
        } catch (unlinkError) {
          console.error(`Error deleting temporary file ${file.path}:`, unlinkError);
        }
      }

    } else {
      // Asegurarse de eliminar el archivo temporal si el proveedor no es soportado
      try {
        await unlink(file.path);
      } catch (unlinkError) {
        console.error(`Error deleting temporary file ${file.path} after unsupported provider error:`, unlinkError);
      }
      throw new Error(`Unsupported storage provider: ${this.storageProvider}`);
    }

    const createMultimediaDto: CreateMultimediaDto = {
      fileName: file.originalname,
      filePath: filePath, // Ruta donde se guardó el archivo (local o URI de S3)
      fileType: file.mimetype.split('/')[0], // e.g., 'image', 'video', 'audio'
      mimeType: file.mimetype,
      size: file.size,
      lessonId: lessonId,
    };

    const multimedia = this.multimediaRepository.create(createMultimediaDto);
    return this.multimediaRepository.save(multimedia);
  }

  findAll() {
    return this.multimediaRepository.find();
  }

  findOne(id: number) {
    return this.multimediaRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const multimedia = await this.multimediaRepository.findOneBy({ id });
    if (!multimedia) {
      return null; // O lanzar una excepción
    }

    if (this.storageProvider === 'local') {
      // Lógica para eliminar archivo local
      try {
        // Verificar si el archivo existe antes de intentar eliminarlo
        await fs.promises.access(multimedia.filePath, fs.constants.F_OK);
        await unlink(multimedia.filePath);
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.warn(`Local file not found for deletion: ${multimedia.filePath}`);
        } else {
          console.error(`Error deleting local file ${multimedia.filePath}:`, error);
          // Dependiendo de la estrategia, podrías lanzar una excepción o registrar el error
        }
        // Continuar con la eliminación de metadatos aunque falle la eliminación del archivo
      }
    } else if (this.storageProvider === 'aws-s3') {
      // Lógica para eliminar archivo de S3
      const fileKey = multimedia.filePath.replace(`s3://${this.s3Bucket}/`, '');
      const deleteParams = {
        Bucket: this.s3Bucket,
        Key: fileKey,
      };
      try {
        await this.s3Client.send(new DeleteObjectCommand(deleteParams));
      } catch (error) {
        // Manejar errores específicos de S3 si es necesario (ej: archivo no encontrado)
        console.error(`Error deleting file ${fileKey} from S3:`, error);
        // Continuar con la eliminación de metadatos aunque falle la eliminación del archivo
      }
    }

    // Eliminar el registro de la base de datos independientemente del resultado de la eliminación del archivo
    return this.multimediaRepository.delete(id);
  }

  async getFile(multimediaId: number): Promise<string> {
    const multimedia = await this.multimediaRepository.findOneBy({ id: multimediaId });
    if (!multimedia) {
      // Lanzar una excepción si el registro de multimedia no existe
      throw new Error(`Multimedia with ID ${multimediaId} not found.`);
    }

    if (this.storageProvider === 'local') {
      const filePath = multimedia.filePath; // Usar la ruta completa guardada en la DB
      try {
        // Verificar si el archivo local existe
        await fs.promises.access(filePath, fs.constants.F_OK);
        return filePath; // Devolver la ruta local si existe
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.error(`Local file not found: ${filePath}`);
          throw new Error('File not found.');
        } else {
          console.error(`Error accessing local file ${filePath}:`, error);
          throw new Error('Failed to retrieve file.');
        }
      }
    } else if (this.storageProvider === 'aws-s3') {
      // Lógica para obtener URL firmada desde S3
      // Extraer el fileKey de la URI de S3 guardada en la DB
      const fileKey = multimedia.filePath.replace(`s3://${this.s3Bucket}/`, '');
      const getParams = {
        Bucket: this.s3Bucket,
        Key: fileKey,
      };
      try {
        // Generar una URL firmada que expira en 15 minutos (ajustar según necesidad)
        const signedUrl = await getSignedUrl(this.s3Client, new GetObjectCommand(getParams), { expiresIn: 60 * 15 });
        return signedUrl; // Devolver la URL firmada
      } catch (error) {
        console.error(`Error getting signed URL for file ${fileKey} from S3:`, error);
        throw new Error('Failed to retrieve file from storage.');
      }
    } else {
      throw new Error(`Unsupported storage provider: ${this.storageProvider}`);
    }
  }
}
