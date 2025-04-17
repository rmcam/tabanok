import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { agent } from 'supertest';
import { AppModule } from '../../../app.module';

describe('GamificationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/gamification (GET)', () => {
    return agent(app.getHttpServer())
      .get('/gamification')
      .expect(200)
      .expect('Hello World!');
  });

  it('/gamification/grant-points/:userId (POST)', () => {
    return agent(app.getHttpServer())
      .post('/gamification/grant-points/1')
      .send({ points: 10 })
      .expect(200);
  });

  it('/gamification/:userId/assign-mission/:missionId (POST)', () => {
    return agent(app.getHttpServer())
      .post('/gamification/1/assign-mission/1')
      .expect(201);
  });
});
