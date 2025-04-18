import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DataSource } from 'typeorm';
import {
  clearDatabase,
  closeTestingModule,
  createTestingModule,
  initializeTestApp,
} from './test-utils';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let moduleFixture;

  beforeAll(async () => {
    try {
      moduleFixture = await createTestingModule();
      app = await initializeTestApp(moduleFixture);
      dataSource = moduleFixture.get(DataSource);

      if (!dataSource.isInitialized) {
        await dataSource.initialize();
      }
    } catch (error) {
      console.error('Error in beforeAll:', error);
      throw error;
    }
  });

  beforeEach(async () => {
    try {
      await clearDatabase(dataSource);
    } catch (error) {
      console.error('Error in beforeEach:', error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      await closeTestingModule();
    } catch (error) {
      console.error('Error in afterAll:', error);
    }
  });

  describe('POST /auth/signin', () => {
    it('should validate required fields', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({})
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toBeInstanceOf(Array);
          expect(res.body.message).toContain('El identificador no debe estar vacío.');
          expect(res.body.message).toContain('El identificador debe ser una cadena de texto.');
          expect(res.body.message).toContain(
            'La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula, una letra minúscula y un carácter especial.',
          );
        });
    });

    it('should validate email format', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          identifier: 'invalid-email',
          password: 'password123',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('El correo electrónico debe ser válido.');
        });
    });
  });

  describe('POST /auth/register', () => {
    it('should validate required fields', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({})
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toBeInstanceOf(Array);
          expect(res.body.message).toContain('El nombre no debe estar vacío.'); // Changed
          expect(res.body.message).toContain('El apellido no debe estar vacío.'); // Changed
          expect(res.body.message).toContain('El correo electrónico debe ser válido.');
          expect(res.body.message).toContain(
            'La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula, una letra minúscula y un carácter especial.',
          );
        });
    });

    it('should validate email format', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          // Corrected payload: removed username and profile, added firstName/lastName directly
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'invalid-email',
          password: 'Password123!', // Use a valid password format here to isolate email validation
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('El correo electrónico debe ser válido.');
        });
    });

    it('should validate password complexity', () => {
      // Renamed test for clarity
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          // Corrected payload
          firstName: 'Juan',
          lastName: 'Pérez',
          email: `test_${Date.now()}@example.com`, // Use unique email
          password: 'short', // Invalid password
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain(
            'La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula, una letra minúscula y un carácter especial.',
          );
        });
    });

    it('should successfully register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          username: `testuser_${Date.now()}`,
          firstName: 'Juan',
          LastName: 'Perez',
          email: `test_${Date.now()}@example.com`,
          password: 'Password123!',
          languages: ['es', 'kam'],
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user).toHaveProperty('id');
          expect(res.body.user).toHaveProperty('email');
          expect(res.body.user).toHaveProperty('firstName', 'Juan');
          expect(res.body.user).toHaveProperty('lastName', 'Perez');
          expect(res.body.user).toHaveProperty('role', 'user');
        });
    });

    it('should fail to register with an existing email', async () => {
      const uniqueEmail = `existing_${Date.now()}@example.com`;
      // First, register a user
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          firstName: 'Existing',
          lastName: 'User',
          email: uniqueEmail,
          password: 'Password123!',
          languages: ['es'],
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user).toHaveProperty('id');
          expect(res.body.user).toHaveProperty('email');
          expect(res.body.user).toHaveProperty('firstName', 'Existing');
          expect(res.body.user).toHaveProperty('lastName', 'User');
          expect(res.body.user).toHaveProperty('role', 'user');
        });

      // Then, attempt to register again with the same email
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          username: `testuser_${Date.now()}`,
          firstName: 'Another',
          LastName: 'User',
          email: uniqueEmail,
          password: 'Password456!',
          languages: ['kam'],
        })
        .expect(409)
         .expect((res) => {
          expect(res.body.message).toContain('El correo electrónico ya está registrado.');
        });
    });
  });

  describe('POST /auth/signin (Success and Failure Cases)', () => {
    const testEmail = `signin_test_${Date.now()}@example.com`;
    const testPassword = 'Password123!';

    let registeredUserEmail: string;

    it('should successfully log in a registered user', async () => {
      // Register a user specifically for signin tests
      const registerResponse = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          username: `testuser_${Date.now()}`,
          firstName: 'signin',
          lastName: 'TestUser',
          email: testEmail,
          password: testPassword,
          languages: ['es'],
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
           expect(res.body).toHaveProperty('user');
        });

      registeredUserEmail = registerResponse.body.user.email;

      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          identifier: registeredUserEmail,
          password: testPassword,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.email).toEqual(registeredUserEmail);
        });
    });

    it('should fail to log in with incorrect password', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          identifier: testEmail,
          password: 'WrongPassword!',
        })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toContain('Credenciales inválidas');
        });
    });

    it('should fail to log in with non-existent email', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          identifier: 'nonexistent@example.com',
          password: testPassword,
        })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toContain('Credenciales inválidas');
        });
    });
  });
});
