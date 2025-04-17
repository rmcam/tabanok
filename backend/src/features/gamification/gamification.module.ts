import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../auth/entities/user.entity';
import { Leaderboard } from './entities/leaderboard.entity';
import { LeaderboardRepository } from './repositories/leaderboard.repository';
import { NotificationsModule } from '../notifications/notifications.module';
import { Reward } from './entities/reward.entity';

// Controladores
import { GamificationController } from './controllers/gamification.controller';
import { CulturalAchievementController } from './controllers/cultural-achievement.controller';
import { MentorController } from './controllers/mentor.controller';
import { RewardController } from './controllers/reward.controller';
import { UserLevelController } from './controllers/user-level.controller';

// Entidades
import { AchievementProgress } from './entities/achievement-progress.entity';
import { Achievement } from './entities/achievement.entity';
import { Badge } from './entities/badge.entity';
import { CulturalAchievement } from './entities/cultural-achievement.entity';
import { Gamification } from './entities/gamification.entity';
import { MentorSpecialization } from './entities/mentor-specialization.entity';
import { Mentor } from './entities/mentor.entity';
import { MentorshipRelation } from './entities/mentorship-relation.entity';
import { Mission } from './entities/mission.entity';
import { UserAchievement } from './entities/user-achievement.entity';
import { UserLevel } from './entities/user-level.entity';
import { UserReward } from './entities/user-reward.entity';

// Servicios
import { GamificationService } from './services/gamification.service';
import { CulturalAchievementService } from './services/cultural-achievement.service';
import { CulturalRewardService } from './services/cultural-reward.service';
import { EvaluationRewardService } from './services/evaluation-reward.service';
import { MentorService } from './services/mentor.service';
import { MissionService } from './services/mission.service';
import { RewardService } from './services/reward.service';
import { LeaderboardService } from './services/leaderboard.service';
import { UserLevelService } from './services/user-level.service';
import { AchievementService } from './services/achievement.service';
import { MissionTemplateService } from './services/mission-template.service';

import { UserMission } from './entities/user-mission.entity';
import { UserMissionRepository } from './repositories/user-mission.repository';
import { MissionTemplate } from './entities/mission-template.entity';
import { MissionTemplateController } from './controllers/mission-template.controller';
import { MissionTemplateRepository } from './repositories/mission-template.repository';
import { AuthModule } from '../../auth/auth.module';

const ENTITIES = [
    User,
    CulturalAchievement,
    Achievement,
    Badge,
    AchievementProgress,
    Mentor,
    MentorSpecialization,
    MentorshipRelation,
    Reward,
    UserLevel,
    UserReward,
    UserAchievement,
    Gamification,
    Mission,
    Leaderboard,
    MissionTemplate,
    UserMission
];

const CONTROLLERS = [
    GamificationController,
    CulturalAchievementController,
    MentorController,
    RewardController,
    UserLevelController,
    MissionTemplateController
];

const SERVICES = [
    GamificationService,
    CulturalAchievementService,
    MentorService,
    RewardService,
    UserLevelService,
    CulturalRewardService,
    EvaluationRewardService,
    AchievementService,
    MissionService,
    LeaderboardService,
    LeaderboardRepository,
    MissionTemplateService,
    UserMissionRepository,
    MissionTemplateRepository
];

@Module({
    imports: [
        TypeOrmModule.forFeature(ENTITIES),
        NotificationsModule,
        AuthModule
    ],
    controllers: CONTROLLERS,
    providers: SERVICES,
    exports: SERVICES
})
export class GamificationModule {}
