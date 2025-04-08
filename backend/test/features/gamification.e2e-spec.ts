import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('GamificationController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    jwtService = moduleFixture.get(JwtService);

    // Crear un token JWT válido para pruebas (ajustar payload según implementación real)
    accessToken = jwtService.sign({ sub: 'test-user-id', username: 'testuser' });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/v1/gamification/stats/:userId (GET)', () => {
    it('debería devolver 200 y las estadísticas del usuario', async () => {
      const userId = 'test-user-id';

      const response = await request(app.getHttpServer())
        .get(`/api/v1/gamification/stats/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('points');
      expect(response.body).toHaveProperty('level');
    });

    it('debería devolver 401 si no se envía token', async () => {
      const userId = 'test-user-id';

      const response = await request(app.getHttpServer())
        .get(`/api/v1/gamification/stats/${userId}`)
        .expect(401);

      expect(response.body.message || response.body.error || '').toMatch(/no autorizado/i);
    });

    it('debería devolver 404 si el usuario no existe', async () => {
      const nonExistentUserId = 'non-existent-user';

      const response = await request(app.getHttpServer())
        .get(`/api/v1/gamification/stats/${nonExistentUserId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);

      expect(response.body.message || response.body.error || '').toMatch(/no encontrado/i);
    });
  });

  // Pendiente: agregar pruebas para puntos, nivel, logros y recompensas
});
