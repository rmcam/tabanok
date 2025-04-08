import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../src/auth/auth.service';
import { LoginDto, RegisterDto } from '../src/auth/dto/auth.dto';
import { User, UserRole, UserStatus } from '../src/auth/entities/user.entity';
import { UserService } from '../src/features/user/user.service';
import { MailService } from '../src/lib/mail.service';

jest.mock('bcrypt', () => ({
  ...jest.requireActual('bcrypt'),
  compare: jest.fn(() => Promise.resolve(true)),
}));

describe('AuthService', () => {
  let service: AuthService;
  let module: TestingModule;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
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
            get: jest.fn().mockReturnValue('mockValue'),
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
        email: 'test@example.com',
        password: 'password',
      } as LoginDto;

      // Simular usuario encontrado con password hasheado
      userServiceMock.findByEmail.mockResolvedValue({
        id: '1',
        email: loginDto.email,
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
      expect(result.user.email).toBe(loginDto.email);
    });
  });
});
