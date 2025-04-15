import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { AuthService } from '../src/auth/auth.service';
import { AuthModule } from '../src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LoginDto, RegisterDto } from '../src/auth/dto/auth.dto';
import { User } from '../src/auth/entities/user.entity';
import { UserRole, UserStatus } from '../src/auth/enums/auth.enum';
import { UserService } from '../src/features/user/user.service';
import { MailService } from '../src/lib/mail.service';

jest.mock('argon2', () => ({
  ...jest.requireActual('argon2'),
  hash: jest.fn(() => Promise.resolve('hashedPassword')),
  verify: jest.fn((hash, plain) => Promise.resolve(hash === 'hashedPassword' && !!plain)),
}));

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { createTestDatabase } from './test-utils';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'Rm88cam88',
  database: process.env.DB_NAME || 'tabanok_db',
  entities: [User],
  synchronize: true,
  dropSchema: true,
  logging: false,
};

describe('AuthService', () => {
  let service: AuthService;
  let module: TestingModule;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(async () => {
    // Crear la base de datos de pruebas y ejecutar las migraciones
    await createTestDatabase();

    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([User]),
        AuthModule,
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockToken'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              switch (key) {
                case 'DB_HOST':
                  return process.env.DB_HOST || 'localhost';
                case 'DB_PORT':
                  return parseInt(process.env.DB_PORT || '5432', 10);
                case 'DB_USER':
                  return process.env.DB_USER || 'postgres';
                case 'DB_PASS':
                  return process.env.DB_PASS || 'Rm88cam88';
                case 'DB_NAME':
                  return process.env.DB_NAME || 'tabanok_db';
                case 'DB_SSL':
                  return process.env.DB_SSL === 'true';
                case 'JWT_SECRET':
                  return process.env.JWT_SECRET || 'test_secret_key';
                case 'PORT':
                  return parseInt(process.env.PORT || '3001', 10);
                default:
                  return process.env[key];
              }
            },
          },
        },
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            updateLastLogin: jest.fn(),
            findOne: jest.fn(),
            updatePassword: jest.fn(),
            setResetToken: jest.fn(),
            findByResetToken: jest.fn(),
            updatePasswordAndClearResetToken: jest.fn(),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendResetPasswordEmail: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userServiceMock = module.get(UserService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password',
      } as RegisterDto;

      // Simular que el usuario NO existe lanzando NotFoundException
      userServiceMock.findByEmail.mockImplementation(() => {
        const error = new NotFoundException();
        return Promise.reject(error);
      });

      // Mockear creación exitosa de usuario con id
      userServiceMock.create.mockResolvedValue({
        id: '1',
        email: registerDto.email,
        password: 'hashedPassword',
        status: UserStatus.ACTIVE,
        role: UserRole.USER,
        firstName: '',
        lastName: '',
        languages: [],
        preferences: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        resetPasswordToken: null,
        resetPasswordExpires: null,
      } as unknown as User);

      const result = await service.register(registerDto);
      expect(result).toEqual({
        user: expect.any(Object),
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });
  });

  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      const loginDto: LoginDto = {
        identifier: 'test@example.com',
        password: 'password',
      } as LoginDto;

      // Simular usuario encontrado con password hasheado
      userServiceMock.findByEmail.mockResolvedValue({
        id: '1',
        email: loginDto.identifier,
        password: 'hashedPassword',
        status: UserStatus.ACTIVE,
        role: UserRole.USER,
        firstName: '',
        lastName: '',
        languages: [],
        preferences: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        resetPasswordToken: null,
        resetPasswordExpires: null,
      } as unknown as User);

      const result = await service.login(loginDto);
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe(loginDto.identifier);
    });
  });
});
