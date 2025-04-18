import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { clearDatabase, closeTestingModule, createTestingModule, initializeTestApp } from '../test-utils';

describe('CulturalAchievementController (e2e)', () => {
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

    let jwtToken: string;
    let userId: string;
    let achievementId: string;

    it('should update progress and award achievement', async () => {
        // 1. Crear un usuario
        const registerDto = {
            username: 'testuser',
            firstName: 'Test',
            firstLastName: 'User',
            email: 'test@example.com',
            password: 'Test123!'
        };

const registerResponse = await request(app.getHttpServer())
            .post('/auth/signup')
            .send(registerDto);

        expect(registerResponse.status).toBe(201);
        userId = registerResponse.body.id;
        jwtToken = registerResponse.body.token;

        // 2. Crear un logro cultural
        const createAchievementDto = {
            name: 'Test Achievement',
            description: 'Test Achievement Description',
            category: 'LENGUA',
            tier: 'BRONCE',
            requirements: [{ type: 'practice', value: 10, description: 'Practice 10 times' }],
            pointsReward: 100
        };

        const createAchievementResponse = await request(app.getHttpServer())
            .post('/cultural-achievements')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send(createAchievementDto);

        expect(createAchievementResponse.status).toBe(201);
        achievementId = createAchievementResponse.body.id;

        // 3. Inicializar el progreso del usuario en el logro cultural
        const initializeProgressResponse = await request(app.getHttpServer())
            .post(`/cultural-achievements/${achievementId}/progress/${userId}`)
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(initializeProgressResponse.status).toBe(201);

        // 4. Actualizar el progreso del usuario en el logro cultural
        const updateProgressDto = {
            updates: [{ type: 'practice', value: 10 }]
        };

        const updateProgressResponse = await request(app.getHttpServer())
            .put(`/cultural-achievements/${achievementId}/progress/${userId}`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .send(updateProgressDto);

        expect(updateProgressResponse.status).toBe(200);

        // 5. Verificar que el usuario recibe los puntos y las recompensas adicionales cuando completa el logro
        const getUserResponse = await request(app.getHttpServer())
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(getUserResponse.status).toBe(200);
        expect(getUserResponse.body.culturalPoints).toBe(100);
    });
});
