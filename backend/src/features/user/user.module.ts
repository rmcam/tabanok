import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../account/entities/account.entity';
import { User } from '../../auth/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, Account]), GamificationModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
