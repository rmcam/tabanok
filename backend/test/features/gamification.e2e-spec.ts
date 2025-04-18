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

  describe('/gamification/leaderboard (GET)', () => {
    it('debería devolver 200 y la tabla de clasificación', async () => {
      const response = await request(app.getHttpServer())
        .get(`/gamification/leaderboard`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
    });

    it('debería devolver 401 si no se envía token', async () => {
      const response = await request(app.getHttpServer())
        .get(`/gamification/leaderboard`)
        .expect(401);

      expect(response.body.message || response.body.error || '').toMatch(/no autorizado/i);
    });
  });

  // Pendiente: agregar pruebas para puntos, nivel, logros y recompensas
});
