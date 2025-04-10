import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; // Ruta corregida
import { UserModule } from '../features/user/user.module';
import { MailModule } from '../lib/mail.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRATION') || '1d',
                },
            }),
            inject: [ConfigService],
        }),
        UserModule,
        MailModule,
        HttpModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        RolesGuard
    ],
    exports: [
        JwtModule,
        AuthService,
        RolesGuard
    ],
})
export class AuthModule { }
