import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamificationModule } from '../gamification/gamification.module';
import { StatisticsController } from './controllers/statistics.controller';
import { Statistics } from './entities/statistics.entity';
import { StatisticsReportService } from './services/statistics-report.service';
import { StatisticsService } from './services/statistics.service';
import { StatisticsRepository } from './repositories/statistics.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Statistics]),
        GamificationModule
    ],
    controllers: [StatisticsController],
    providers: [
        StatisticsService,
        StatisticsReportService,
        StatisticsRepository
    ],
    exports: [StatisticsService, StatisticsRepository, TypeOrmModule]
})
export class StatisticsModule { }
