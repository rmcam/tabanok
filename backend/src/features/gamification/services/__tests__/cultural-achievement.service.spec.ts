import { Test, TestingModule } from '@nestjs/testing';
import { CulturalAchievementService } from '../cultural-achievement.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CulturalAchievement } from '../../entities/cultural-achievement.entity';
import { AchievementProgress } from '../../entities/achievement-progress.entity';
import { User } from '../../../../auth/entities/user.entity';
import { NotificationService } from '../../../notifications/services/notification.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AchievementCategory, AchievementType, AchievementTier } from '../../entities/cultural-achievement.entity';

describe('CulturalAchievementService', () => {
  let service: CulturalAchievementService;
  const mockCulturalAchievementRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    }),
  };
  const mockAchievementProgressRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };
  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };
  const mockNotificationService = {
    createNotification: jest.fn(),
    notifyAchievementUnlocked: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CulturalAchievementService,
        {
          provide: getRepositoryToken(CulturalAchievement),
          useValue: mockCulturalAchievementRepository,
        },
        {
          provide: getRepositoryToken(AchievementProgress),
          useValue: mockAchievementProgressRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
    }).compile();

    service = module.get<CulturalAchievementService>(CulturalAchievementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAchievement', () => {
    it('should create a new achievement', async () => {
      const achievementData = {
        name: 'Test Achievement',
        description: 'Test Description',
        category: AchievementCategory.LENGUA,
        type: AchievementType.CONTRIBUCION_CULTURAL,
        tier: AchievementTier.BRONCE,
        requirements: [],
        pointsReward: 100,
      };
      mockCulturalAchievementRepository.create.mockReturnValue(achievementData);
      mockCulturalAchievementRepository.save.mockResolvedValue(achievementData);

      const result = await service.createAchievement(achievementData);

      expect(mockCulturalAchievementRepository.create).toHaveBeenCalledWith(achievementData);
      expect(mockCulturalAchievementRepository.save).toHaveBeenCalledWith(achievementData);
      expect(result).toEqual(achievementData);
    });

    it('should throw BadRequestException if achievement type is invalid', async () => {
      const achievementData = {
        name: 'Test Achievement',
        description: 'Test Description',
        category: AchievementCategory.LENGUA,
        type: 'invalid_type' as AchievementType,
        tier: AchievementTier.BRONCE,
        requirements: [],
        pointsReward: 100,
      };

      await expect(service.createAchievement(achievementData as any)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('getAchievements', () => {
    it('should return all achievements', async () => {
      const achievements = [
        {
          name: 'Test Achievement 1',
          description: 'Test Description 1',
          category: AchievementCategory.LENGUA,
          type: AchievementType.CONTRIBUCION_CULTURAL,
          tier: AchievementTier.BRONCE,
          requirements: [],
          pointsReward: 100,
        },
        {
          name: 'Test Achievement 2',
          description: 'Test Description 2',
          category: AchievementCategory.DANZA,
          type: AchievementType.PARTICIPACION_EVENTO,
          tier: AchievementTier.PLATA,
          requirements: [],
          pointsReward: 200,
        },
      ];
      mockCulturalAchievementRepository.createQueryBuilder().getMany.mockResolvedValue(achievements);

      const result = await service.getAchievements();

      expect(result).toEqual(achievements);
    });

    it('should return achievements filtered by category', async () => {
      const achievements = [
        {
          name: 'Test Achievement 1',
          description: 'Test Description 1',
          category: AchievementCategory.LENGUA,
          type: AchievementType.CONTRIBUCION_CULTURAL,
          tier: AchievementTier.BRONCE,
          requirements: [],
          pointsReward: 100,
        },
      ];
      mockCulturalAchievementRepository.createQueryBuilder().getMany.mockResolvedValue(achievements);

      const result = await service.getAchievements(AchievementCategory.LENGUA);

      expect(result).toEqual(achievements);
    });

    it('should return achievements filtered by type', async () => {
      const achievements = [
        {
          name: 'Test Achievement 1',
          description: 'Test Description 1',
          category: AchievementCategory.LENGUA,
          type: AchievementType.CONTRIBUCION_CULTURAL,
          tier: AchievementTier.BRONCE,
          requirements: [],
          pointsReward: 100,
        },
      ];
      mockCulturalAchievementRepository.createQueryBuilder().getMany.mockResolvedValue(achievements);

      const result = await service.getAchievements(undefined, AchievementType.CONTRIBUCION_CULTURAL);

      expect(result).toEqual(achievements);
    });
  });

  describe('initializeUserProgress', () => {
    it('should initialize user progress for an achievement', async () => {
      const userId = 'user-id';
      const achievementId = 'achievement-id';
      const user = { id: userId };
      const achievement = {
        id: achievementId,
        requirements: [{ type: 'test', value: 10, description: 'Test Requirement' }],
      };
      const progress = {
        user,
        achievement,
        progress: [{ requirementType: 'test', currentValue: 0, targetValue: 10, lastUpdated: new Date() }],
        percentageCompleted: 0,
        isCompleted: false,
        milestones: [],
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      mockCulturalAchievementRepository.findOne.mockResolvedValue(achievement);
      mockAchievementProgressRepository.findOne.mockResolvedValue(null);
      mockAchievementProgressRepository.create.mockReturnValue(progress);
      mockAchievementProgressRepository.save.mockResolvedValue(progress);

      const result = await service.initializeUserProgress(userId, achievementId);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
      expect(mockCulturalAchievementRepository.findOne).toHaveBeenCalledWith({ where: { id: achievementId } });
      expect(mockAchievementProgressRepository.findOne).toHaveBeenCalledWith({
        where: {
          user: { id: userId },
          achievement: { id: achievementId },
        },
      });
      expect(mockAchievementProgressRepository.create).toHaveBeenCalledWith({
        user,
        achievement,
        progress: expect.any(Array),
        percentageCompleted: 0,
        isCompleted: false,
        milestones: [],
      });
      expect(mockAchievementProgressRepository.save).toHaveBeenCalledWith(progress);
      expect(result).toEqual(progress);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 'user-id';
      const achievementId = 'achievement-id';

      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.initializeUserProgress(userId, achievementId)).rejects.toThrowError(NotFoundException);
    });

    it('should throw NotFoundException if achievement is not found', async () => {
      const userId = 'user-id';
      const achievementId = 'achievement-id';

      mockUserRepository.findOne.mockResolvedValue({ id: userId });
      mockCulturalAchievementRepository.findOne.mockResolvedValue(null);

      await expect(service.initializeUserProgress(userId, achievementId)).rejects.toThrowError(NotFoundException);
    });

    it('should throw BadRequestException if progress is already initialized', async () => {
      const userId = 'user-id';
      const achievementId = 'achievement-id';

      mockUserRepository.findOne.mockResolvedValue({ id: userId });
      mockCulturalAchievementRepository.findOne.mockResolvedValue({ id: achievementId });
      mockAchievementProgressRepository.findOne.mockResolvedValue({});

      await expect(service.initializeUserProgress(userId, achievementId)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('updateProgress', () => {
    it('should update progress for an achievement', async () => {
      const userId = 'user-id';
      const achievementId = 'achievement-id';
      const updates = [{ type: 'test', value: 5 }];
      const achievement = {
        id: achievementId,
        type: AchievementType.CONTRIBUCION_CULTURAL,
      };
      const progress = {
        user: { id: userId },
        achievement,
        progress: [{ requirementType: 'test', currentValue: 0, targetValue: 10, lastUpdated: new Date() }],
        percentageCompleted: 0,
        isCompleted: false,
        milestones: [],
      };

      mockAchievementProgressRepository.findOne.mockResolvedValue(progress);
      mockAchievementProgressRepository.save.mockResolvedValue(progress);

      const result = await service.updateProgress(userId, achievementId, updates);

      expect(mockAchievementProgressRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId }, achievement: { id: achievementId } },
        relations: ['achievement', 'user'],
      });
      expect(mockAchievementProgressRepository.save).toHaveBeenCalledWith(progress);
      expect(result).toEqual(progress);
    });

    it('should throw NotFoundException if progress is not found', async () => {
      const userId = 'user-id';
      const achievementId = 'achievement-id';
      const updates = [{ type: 'test', value: 5 }];

      mockAchievementProgressRepository.findOne.mockResolvedValue(null);

      await expect(service.updateProgress(userId, achievementId, updates)).rejects.toThrowError(NotFoundException);
    });

    it('should throw BadRequestException if achievement is already completed', async () => {
      const userId = 'user-id';
      const achievementId = 'achievement-id';
      const updates = [{ type: 'test', value: 5 }];
      const achievement = {
        id: achievementId,
        type: AchievementType.CONTRIBUCION_CULTURAL,
      };
      const progress = {
        user: { id: userId },
        achievement,
        progress: [{ requirementType: 'test', currentValue: 0, targetValue: 10, lastUpdated: new Date() }],
        percentageCompleted: 0,
        isCompleted: true,
        milestones: [],
      };

      mockAchievementProgressRepository.findOne.mockResolvedValue(progress);

      await expect(service.updateProgress(userId, achievementId, updates)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('getUserAchievements', () => {
    it('should return user achievements', async () => {
      const userId = 'user-id';
      const achievements = [
        {
          name: 'Test Achievement 1',
          description: 'Test Description 1',
          category: AchievementCategory.LENGUA,
          type: AchievementType.CONTRIBUCION_CULTURAL,
          tier: AchievementTier.BRONCE,
          requirements: [],
          pointsReward: 100,
        },
        {
          name: 'Test Achievement 2',
          description: 'Test Description 2',
          category: AchievementCategory.DANZA,
          type: AchievementType.PARTICIPACION_EVENTO,
          tier: AchievementTier.PLATA,
          requirements: [],
          pointsReward: 200,
        },
      ];
      const progresses = [
        {
          achievement: achievements[0],
          isCompleted: true,
        },
        {
          achievement: achievements[1],
          isCompleted: false,
        },
      ];

      mockAchievementProgressRepository.find.mockResolvedValue(progresses);

      const result = await service.getUserAchievements(userId);

      expect(mockAchievementProgressRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ['achievement'],
      });
      expect(result).toEqual({
        completed: [achievements[0]],
        inProgress: [{ achievement: achievements[1], progress: progresses[1] }],
      });
    });
  });

  describe('getAchievementProgress', () => {
    it('should return achievement progress', async () => {
      const userId = 'user-id';
      const achievementId = 'achievement-id';
      const progress = {
        user: { id: userId },
        achievement: { id: achievementId },
        progress: [{ requirementType: 'test', currentValue: 0, targetValue: 10, lastUpdated: new Date() }],
        percentageCompleted: 0,
        isCompleted: false,
        milestones: [],
      };

      mockAchievementProgressRepository.findOne.mockResolvedValue(progress);

      const result = await service.getAchievementProgress(userId, achievementId);

      expect(mockAchievementProgressRepository.findOne).toHaveBeenCalledWith({
        where: {
          user: { id: userId },
          achievement: { id: achievementId },
        },
        relations: ['achievement'],
      });
      expect(result).toEqual(progress);
    });

    it('should throw NotFoundException if progress is not found', async () => {
      const userId = 'user-id';
      const achievementId = 'achievement-id';

      mockAchievementProgressRepository.findOne.mockResolvedValue(null);

      await expect(service.getAchievementProgress(userId, achievementId)).rejects.toThrowError(NotFoundException);
    });
  });
});
