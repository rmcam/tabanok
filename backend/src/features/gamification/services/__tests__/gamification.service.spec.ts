import { Test, TestingModule } from '@nestjs/testing';
import { GamificationService } from '../gamification.service';
import { LeaderboardService } from '../leaderboard.service';
import { MissionService } from '../mission.service';

import { DeepPartial } from 'typeorm';
import { User } from '../../../../auth/entities/user.entity';
import { UserRole, UserStatus } from '@/auth/enums/auth.enum';

describe('GamificationService', () => {
  let service: GamificationService;

  const mockRepo = {
    findOne: jest.fn(),
    save: jest.fn(),
  };
  const mockLeaderboardService = { updateUserRank: jest.fn() };
  const mockMissionService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamificationService,
        { provide: 'UserRepository', useValue: mockRepo },
        { provide: 'CulturalAchievementRepository', useValue: mockRepo },
        { provide: 'UserAchievementRepository', useValue: mockRepo },
        { provide: 'UserLevelRepository', useValue: mockRepo },
        { provide: 'UserRewardRepository', useValue: mockRepo },
        { provide: 'RewardRepository', useValue: mockRepo },
        { provide: 'GamificationRepository', useValue: mockRepo },
        { provide: LeaderboardService, useValue: mockLeaderboardService },
        { provide: MissionService, useValue: mockMissionService },
      ],
    }).compile();

    service = module.get<GamificationService>(GamificationService);
  });
  describe('addPoints', () => {
    it('should throw NotFoundException if gamification not found', async () => {
      service.findByUserId = jest.fn().mockRejectedValue(new Error('Gamification not found'));
      await expect(service.addPoints('user-id', 10, 'lección', 'Completó una lección')).rejects.toThrow();
    });

    it('should add points and recent activity, and call checkCompletedMissions', async () => {
      const gamification = {
        id: 'g1',
        userId: 'user-id',
        user: {
          id: 'user-id',
          username: 'testuser',
          email: 'test@example.com',
          password: 'hashedpassword',
          firstName: 'Test',
          lastName: 'User',
          role: UserRole.STUDENT,
          status: UserStatus.ACTIVE,
          languages: [],
          preferences: {
            notifications: true,
            language: 'es',
            theme: 'light',
          },
          points: 0,
          level: 1,
          gameStats: {
            totalPoints: 0,
            level: 1,
            lessonsCompleted: 0,
            exercisesCompleted: 0,
            perfectScores: 0,
          },
          achievements: [],
          rewards: [],
          culturalPoints: 0,
          culturalAchievements: [],
          leaderboards: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          isEmailVerified: true,
          accounts: [],
          userRewards: [],
          userAchievements: [],
          progress: [],
        } as unknown as User,
        points: 0,
        level: 1,
        experience: 0,
        nextLevelExperience: 100,
        achievements: [],
        rewards: [],
        badges: [],
        activeMissions: [],
        recentActivities: [],
        culturalAchievements: [],
        stats: {
          lessonsCompleted: 0,
          exercisesCompleted: 0,
          perfectScores: 0,
          learningStreak: 0,
          culturalContributions: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.findByUserId = jest.fn().mockResolvedValue(gamification);
      const saveSpy = jest.spyOn(service['gamificationRepository'], 'save').mockResolvedValue(gamification);
      service['checkCompletedMissions'] = jest.fn();

      await service.addPoints('user-id', 10, 'lección', 'Completó una lección');

      expect(gamification.points).toBe(10);
      expect(gamification.recentActivities.length).toBe(1);
      expect(gamification.recentActivities[0]).toMatchObject({
        type: 'lección',
        description: 'Completó una lección',
        pointsEarned: 10,
      });
      expect(saveSpy).toHaveBeenCalledWith(gamification);
      expect(service['checkCompletedMissions']).toHaveBeenCalledWith('user-id', expect.anything());
    });

    it('should keep only the last 50 activities', async () => {
      const activities = Array.from({ length: 51 }, (_, i) => ({
        type: 'lección',
        description: `Actividad ${i}`,
        pointsEarned: 1,
        timestamp: new Date(),
      }));
      const gamification = {
        id: 'g2',
        userId: 'user-id',
        user: {
          id: 'user-id',
          username: 'testuser',
          email: 'test@example.com',
          password: 'hashedpassword',
          firstName: 'Test',
          lastName: 'User',
          role: UserRole.STUDENT,
          status: UserStatus.ACTIVE,
          languages: [],
          preferences: {
            notifications: true,
            language: 'es',
            theme: 'light',
          },
          points: 0,
          level: 1,
          gameStats: {
            totalPoints: 0,
            level: 1,
            lessonsCompleted: 0,
            exercisesCompleted: 0,
            perfectScores: 0,
          },
          achievements: [],
          rewards: [],
          culturalPoints: 0,
          culturalAchievements: [],
          leaderboards: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          isEmailVerified: true,
          accounts: [],
          userRewards: [],
          userAchievements: [],
          progress: [],
        } as unknown as User,
        points: 0,
        level: 1,
        experience: 0,
        nextLevelExperience: 100,
        achievements: [],
        rewards: [],
        badges: [],
        activeMissions: [],
        recentActivities: activities,
        culturalAchievements: [],
        stats: {
          lessonsCompleted: 0,
          exercisesCompleted: 0,
          perfectScores: 0,
          learningStreak: 0,
          culturalContributions: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.findByUserId = jest.fn().mockResolvedValue(gamification);
      const saveSpy = jest.spyOn(service['gamificationRepository'], 'save').mockResolvedValue(gamification);
      service['checkCompletedMissions'] = jest.fn();

      await service.addPoints('user-id', 5, 'lección', 'Nueva actividad');

      expect(gamification.recentActivities.length).toBe(50);
      expect(gamification.recentActivities[0].description).toBe('Nueva actividad');
      expect(saveSpy).toHaveBeenCalledWith(gamification);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getUserStats should throw NotFoundException if user not found', async () => {
    jest.spyOn(mockRepo, 'findOne').mockResolvedValue(null);
    await expect(service.getUserStats('user-id')).rejects.toThrow();
  });

  it('getUserStats should return stats if user exists', async () => {
    const mockUser = {
      id: 'user-id',
      points: 100,
      level: 1,
      achievements: [],
      rewards: [],
      gameStats: {
        totalPoints: 100,
        level: 1,
        lessonsCompleted: 0,
        exercisesCompleted: 0,
        perfectScores: 0,
      },
      culturalPoints: 0,
      culturalAchievements: [],
    };
    mockRepo.findOne = jest.fn().mockResolvedValue(mockUser);

    const result = await service.getUserStats('user-id');

    expect(result).toEqual(
      expect.objectContaining({
        points: 100,
        level: 1,
        gameStats: {
          exercisesCompleted: 0,
          lessonsCompleted: 0,
          level: 1,
          perfectScores: 0,
          totalPoints: 100,
        },
      }),
    );
  });

  it('updateUserPoints should throw NotFoundException if user not found', async () => {
    jest.spyOn(mockRepo, 'findOne').mockResolvedValue(null);
    await expect(service.updateUserPoints('user-id', 10)).rejects.toThrow();
  });

  it('updateUserPoints should update points if user exists', async () => {
    const mockUser = { 
      id: 'user-id', 
      points: 50, 
      gameStats: {
        totalPoints: 50,
        level: 1,
        lessonsCompleted: 0,
        exercisesCompleted: 0,
        perfectScores: 0,
      }
    };
    jest.spyOn(mockRepo, 'findOne').mockResolvedValue(mockUser);
    mockRepo.save = jest.fn().mockResolvedValue({ ...mockUser, points: 60, gameStats: { ...mockUser.gameStats, totalPoints: 60 } });

    const result = await service.updateUserPoints('user-id', 10);

    expect(mockRepo.save).toHaveBeenCalledWith({ ...mockUser, points: 60, gameStats: { ...mockUser.gameStats, totalPoints: 60 } });
    expect(result).toHaveProperty('points', 60);
  });

  it('updateUserLevel should throw NotFoundException if user not found', async () => {
    jest.spyOn(mockRepo, 'findOne').mockResolvedValue(null);
    await expect(service.updateUserLevel('user-id')).rejects.toThrow();
  });

  it('awardAchievement should throw NotFoundException if user not found', async () => {
    jest.spyOn(mockRepo, 'findOne').mockResolvedValue(null);
    await expect(service.awardAchievement('user-id', 'ach-id')).rejects.toThrow();
  });

  it('awardReward should throw NotFoundException if user not found', async () => {
    jest.spyOn(mockRepo, 'findOne').mockResolvedValue(null);
    await expect(service.awardReward('user-id', 'reward-id')).rejects.toThrow();
  });
});
