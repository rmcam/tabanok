import { Test, TestingModule } from '@nestjs/testing';
import { GamificationService } from '../gamification.service';
import { LeaderboardService } from '../leaderboard.service';
import { MissionService } from '../mission.service';
import { Repository } from 'typeorm';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getUserStats should throw NotFoundException if user not found', async () => {
    jest.spyOn(mockRepo, 'findOne').mockResolvedValue(null);
    await expect(service.getUserStats('user-id')).rejects.toThrow();
  });

  it('getUserStats should return stats if user exists', async () => {
    const mockUser = { id: 'user-id', points: 100, level: 2 };
    jest.spyOn(mockRepo, 'findOne').mockResolvedValue(mockUser);

    const result = await service.getUserStats('user-id');

    expect(result).toHaveProperty('points', 100);
    expect(result).toHaveProperty('level', 2);
  });

  it('updateUserPoints should throw NotFoundException if user not found', async () => {
    jest.spyOn(mockRepo, 'findOne').mockResolvedValue(null);
    await expect(service.updateUserPoints('user-id', 10)).rejects.toThrow();
  });

  it('updateUserPoints should update points if user exists', async () => {
    const mockUser = { id: 'user-id', points: 50 };
    jest.spyOn(mockRepo, 'findOne').mockResolvedValue(mockUser);
    mockRepo.save = jest.fn().mockResolvedValue({ ...mockUser, points: 60 });

    const result = await service.updateUserPoints('user-id', 10);

    expect(mockRepo.save).toHaveBeenCalledWith({ ...mockUser, points: 60 });
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
