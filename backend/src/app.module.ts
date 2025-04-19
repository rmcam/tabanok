import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './features/account/account.module';
import { ActivityModule } from './features/activity/activity.module';
import { ContentModule } from './features/content/content.module';
import { ExercisesModule } from './features/exercises/exercises.module';
import { GamificationModule } from './features/gamification/gamification.module';
import { KamentsaValidatorService } from './features/language-validation/kamentsa-validator.service';
import { LanguageValidationController } from './features/language-validation/language-validation.controller';
import { LessonModule } from './features/lesson/lesson.module';
import { NotificationsModule } from './features/notifications/notifications.module';
import { StatisticsModule } from './features/statistics/statistics.module';
import { TopicModule } from './features/topic/topic.module';
import { UnityModule } from './features/unity/unity.module';
import { UserModule } from './features/user/user.module';
import { VocabularyModule } from './features/vocabulary/vocabulary.module';
import { RecommendationsModule } from './features/recommendations/recommendations.module';
import { ActivityRepository } from './features/gamification/repositories/activity.repository';
import { RootController } from './root.controller';
import { AuthController } from './auth/auth.controller';
import { DictionaryModule } from './features/dictionary/dictionary.module';
import { CulturalContentModule } from './features/cultural-content/cultural-content.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UserModule,
    AccountModule,
    ContentModule,
    ExercisesModule,
    GamificationModule,
    LessonModule,
    NotificationsModule,
    StatisticsModule,
    TopicModule,
    UnityModule,
    VocabularyModule,
    RecommendationsModule,
    DictionaryModule,
    CulturalContentModule,
  ],
  controllers: [LanguageValidationController, RootController, AuthController],
  providers: [KamentsaValidatorService],
})
export class AppModule {}
