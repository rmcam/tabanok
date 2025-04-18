import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';

// Desactivar nest-commander durante las pruebas
process.env.DISABLE_NEST_COMMANDER = 'true';
process.env.NODE_ENV = 'test';

let app: INestApplication;
let moduleFixture: TestingModule;
let dataSource: DataSource;

async function createTestDatabase() {
  // Crear una conexión temporal a la base de datos postgres
  const tempDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5436', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'postgres', // Conectar a la base de datos postgres para crear/eliminar la de pruebas
  });

  try {
    await tempDataSource.initialize();

   try {
      // Intentar crear la base de datos
      await tempDataSource.query(`CREATE DATABASE tabanok_test;`);
    } catch (error) {
      // Corregir el código de error para "database already exists"
      if (error.code === '42P04') {
        console.log('La base de datos tabanok_test ya existe, continuando...');
      } else {
        console.error(
          `Error inesperado al crear la base de datos: ${error.message} (Code: ${error.code})`,
        );
        throw error; // Re-lanzar otros errores
      }
    }

    // Conectar a la base de datos de prueba para crear las extensiones
    await tempDataSource.destroy();
    // Configurar correctamente la conexión y las migraciones para testDataSource
    const testDataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5436', 10), // Usar puerto correcto
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'Rm88cam88', // Usar contraseña correcta
      database: 'tabanok_test',
      entities: [__dirname + '/../src/**/*.entity{.ts,.js}'], // Añadir entidades por si acaso
      migrations: [__dirname + '/../src/migrations/*{.ts,.js}'], // Añadir ruta de migraciones
      migrationsTableName: 'migrations_test', // Usar tabla separada para migraciones de test (opcional pero buena práctica)
    });

    await testDataSource.initialize();
    await testDataSource.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await testDataSource.query(`CREATE EXTENSION IF NOT EXISTS "plpgsql";`);

    // Ejecutar las migraciones usando TypeORM
    console.log('Ejecutando migraciones con TypeORM...');
    try {
      // Asegurarse de que las entidades y migraciones estén configuradas en testDataSource si es necesario
      // O configurar TypeOrmModule para usar esta conexión en AppModule para pruebas
      // Aquí asumimos que testDataSource está configurado para encontrar las migraciones
      await testDataSource.runMigrations();
      console.log('Migraciones completadas exitosamente usando TypeORM');
    } catch (error) {
      console.error('Error ejecutando migraciones con TypeORM:', error);
      // No necesitamos rollback manual, runMigrations lo maneja o falla
      throw error; // Re-lanzar para que el setup falle
    } finally {
      // Destruir la conexión después de las migraciones
      await testDataSource.destroy();
    }
  } catch (error) {
    console.error('Error creating test database:', error);
    throw error;
  } finally {
    if (tempDataSource.isInitialized) {
      await tempDataSource.destroy();
    }
  }
}

export async function createTestingModule(): Promise<TestingModule> {
  if (!moduleFixture) {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  }
  return moduleFixture;
}

export async function initializeTestApp(module: TestingModule): Promise<INestApplication> {
  if (!app) {
    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        validateCustomDecorators: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API documentation for the application')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // Añadir prefijo global para las pruebas E2E
    // app.setGlobalPrefix('api/v1');

    await app.init();
  }
  return app;
}

export async function clearDatabase(ds: DataSource): Promise<void> {
  try {
    if (!ds.isInitialized) {
      await ds.initialize();
    }

    // Desactivar restricciones de clave foránea temporalmente
    await ds.query('SET session_replication_role = replica;');

    // Obtener todas las tablas excepto migrations
    const tables = await ds.query(`
            SELECT tablename
            FROM pg_tables
            WHERE schemaname = 'public'
            AND tablename != 'migrations'
            ORDER BY tablename DESC;
        `);

    // Truncar cada tabla
    for (const { tablename } of tables) {
      try {
        await ds.query(`TRUNCATE TABLE "${tablename}" CASCADE;`);
      } catch (error) {
        console.error(`Error truncating table ${tablename}:`, error);
      }
    }

    // Reactivar restricciones de clave foránea
    await ds.query('SET session_replication_role = DEFAULT;');
  } catch (error) {
    console.error('Error in clearDatabase:', error);
    throw error;
  }
}

export async function closeTestingModule(): Promise<void> {
  try {
    if (app) {
      await app.close();
      app = null;
    }
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
      dataSource = null;
    }
    if (moduleFixture) {
      await moduleFixture.close();
      moduleFixture = null;
    }
  } catch (error) {
    console.error('Error in closeTestingModule:', error);
  }
}

// Exportar la función para que pueda ser importada con require
export { createTestDatabase };
