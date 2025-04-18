import { Test, TestingModule } from '@nestjs/testing';
import { CollaborationRewardService } from '../collaboration-reward.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CollaborationReward, CollaborationType } from '../../entities/collaboration-reward.entity';
import { Gamification } from '../../entities/gamification.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CollaborationRewardService', () => {
  let service: CollaborationRewardService;
  const mockCollaborationRewardRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };
  const mockGamificationRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollaborationRewardService,
        {
          provide: getRepositoryToken(CollaborationReward),
          useValue: mockCollaborationRewardRepository,
        },
        {
          provide: getRepositoryToken(Gamification),
          useValue: mockGamificationRepository,
        },
      ],
    }).compile();

    service = module.get<CollaborationRewardService>(CollaborationRewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('awardCollaboration', () => {
    it('should throw BadRequestException if collaboration type is invalid', async () => {
      const userId = 'user-id';
      const contributionId = 'contribution-id';
      const type = 'invalid_type' as CollaborationType;
      const quality = 'excellent';

      await expect(service.awardCollaboration(userId, contributionId, type, quality)).rejects.toThrowError(BadRequestException);
    });

    it('should throw NotFoundException if reward configuration is not found', async () => {
      const userId = 'user-id';
      const contributionId = 'contribution-id';
      const type = CollaborationType.CONTENIDO_CREACION;
      const quality = 'excellent';

      mockCollaborationRewardRepository.findOne.mockResolvedValue(null);

      await expect(service.awardCollaboration(userId, contributionId, type, quality)).rejects.toThrowError(NotFoundException);
    });

    it('should throw NotFoundException if gamification profile is not found', async () => {
      const userId = 'user-id';
      const contributionId = 'contribution-id';
      const type = CollaborationType.CONTENIDO_CREACION;
      const quality = 'excellent';
      const reward = {
        basePoints: 100,
        qualityMultipliers: { excellent: 1, good: 0.8, average: 0.5 },
        history: [],
        streakBonuses: [],
      };

      mockCollaborationRewardRepository.findOne.mockResolvedValue(reward);
      mockGamificationRepository.findOne.mockResolvedValue(null);

      await expect(service.awardCollaboration(userId, contributionId, type, quality)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('getCollaborationStats', () => {
    it('should return collaboration stats', async () => {
      const userId = 'user-id';
      const rewards = [
        {
          type: CollaborationType.CONTENIDO_CREACION,
          history: [
            { userId, contributionId: '1', type: CollaborationType.CONTENIDO_CREACION, quality: 'excellent', pointsAwarded: 100, awardedAt: new Date() },
            { userId, contributionId: '2', type: CollaborationType.CONTENIDO_CREACION, quality: 'good', pointsAwarded: 80, awardedAt: new Date() },
          ],
        },
        {
          type: CollaborationType.CONTENIDO_REVISION,
          history: [
            { userId, contributionId: '3', type: CollaborationType.CONTENIDO_REVISION, quality: 'excellent', pointsAwarded: 120, awardedAt: new Date() },
          ],
        },
      ];

      mockCollaborationRewardRepository.find.mockResolvedValue(rewards);

      const result = await service.getCollaborationStats(userId);

      expect(result).toEqual({
        totalContributions: 3,
        excellentContributions: 2,
        currentStreak: 0,
        totalPoints: 300,
        badges: [],
      });
    });

    it('should return collaboration stats filtered by type', async () => {
      const userId = 'user-id';
      const type = CollaborationType.CONTENIDO_CREACION;
      const rewards = [
        {
          type: CollaborationType.CONTENIDO_CREACION,
          history: [
            { userId, contributionId: '1', type: CollaborationType.CONTENIDO_CREACION, quality: 'excellent', pointsAwarded: 100, awardedAt: new Date() },
            { userId, contributionId: '2', type: CollaborationType.CONTENIDO_CREACION, quality: 'good', pointsAwarded: 80, awardedAt: new Date() },
          ],
        },
        {
          type: CollaborationType.CONTENIDO_REVISION,
          history: [
            { userId, contributionId: '3', type: CollaborationType.CONTENIDO_REVISION, quality: 'excellent', pointsAwarded: 120, awardedAt: new Date() },
          ],
        },
      ];

      mockCollaborationRewardRepository.find.mockResolvedValue(rewards);

      const result = await service.getCollaborationStats(userId, type);

      expect(result).toEqual({
        totalContributions: 2,
        excellentContributions: 1,
        currentStreak: 0,
        totalPoints: 180,
        badges: [],
      });
    });
  });
});
