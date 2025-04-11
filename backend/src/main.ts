import * as crypto from 'crypto';
if (!globalThis.crypto) {
  (globalThis as any).crypto = crypto;
}

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import favicon from 'serve-favicon';
import { join } from 'path';

async function bootstrap() {
  // Crear la aplicación con opciones de seguridad
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    },
  });

  // Middleware para imprimir el cuerpo crudo recibido
  // app.use((req, res, next) => {
  //   console.log('Content-Type recibido:', req.headers['content-type']);
  //   let data = '';
  //   req.on('data', chunk => {
  //     data += chunk;
  //   });
  //   req.on('end', () => {
  //     console.log('Raw body recibido:', data);
  //     next();
  //   });
  // });

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Configurar middleware de seguridad
  app.use(helmet() as any);
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: configService.get('RATE_LIMIT_MAX', 100), // límite por IP
    }) as any,
  );

  app.use(favicon(join(__dirname, '..', 'public', 'favicon.ico')));

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configurar prefijo global para la API
  app.setGlobalPrefix('api/v1');

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Tabanok API')
    .setDescription('API para la plataforma de aprendizaje Tabanok - Lengua Kamentsa')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticación y autorización')
    .addTag('users', 'Gestión de usuarios')
    .addTag('learning-content', 'Gestión de contenido educativo')
    .addTag('learning-lessons', 'Gestión de lecciones')
    .addTag('learning-activities', 'Gestión de actividades')
    .addTag('user-notifications', 'Gestión de notificaciones')
    .build();
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  // Configurar puerto y host
  const port = process.env.PORT || 8000; // Puerto por defecto para local y Docker
  const host = '0.0.0.0'; // Render requiere enlazar en 0.0.0.0

  // Ejecutar migraciones automáticas
  try {
    const dataSource = app.get(require('typeorm').DataSource);
    await dataSource.runMigrations();
    console.log('Migraciones aplicadas correctamente');
  } catch (error) {
    console.error('Error aplicando migraciones:', error);
  }

  // Iniciar la aplicación
  await app.listen(port, host);
  logger.log(`API documentation available at: http://localhost:${port}/api/v1/docs`);
  logger.log(`Backend running at: http://localhost:${port}`);

  // Manejar señales de terminación
  process.on('SIGTERM', async () => {
    logger.log('SIGTERM received. Closing application gracefully...');
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    logger.log('SIGINT received. Closing application gracefully...');
    await app.close();
    process.exit(0);
  });
}

bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
