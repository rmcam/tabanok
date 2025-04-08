import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from '../services/leaderboard.service';
import { LeaderboardType, LeaderboardCategory } from '../enums/leaderboard.enum';

describe('LeaderboardController', () => {
  let controller: LeaderboardController;
  let service: LeaderboardService;

  const mockLeaderboardService = {
    getLeaderboard: jest.fn(),
    getUserRank: jest.fn(),
    updateLeaderboards: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaderboardController],
      providers: [
        {
          provide: LeaderboardService,
          useValue: mockLeaderboardService,
        },
      ],
    }).compile();

    controller = module.get<LeaderboardController>(LeaderboardController);
    service = module.get<LeaderboardService>(LeaderboardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get leaderboard', async () => {
    const mockResult = { id: '1', rankings: [] };
    mockLeaderboardService.getLeaderboard.mockResolvedValue(mockResult);

    const result = await controller.getLeaderboard(LeaderboardType.DAILY, LeaderboardCategory.POINTS);
    expect(result).toEqual(mockResult);
    expect(mockLeaderboardService.getLeaderboard).toHaveBeenCalledWith(LeaderboardType.DAILY, LeaderboardCategory.POINTS);
  });

  it('should get user rank', async () => {
    const mockResult = { rank: 1, total: 10 };
    mockLeaderboardService.getUserRank.mockResolvedValue(mockResult);

    const result = await controller.getUserRanking('user-id', LeaderboardType.DAILY, LeaderboardCategory.POINTS);
    expect(result).toEqual(mockResult);
    expect(mockLeaderboardService.getUserRank).toHaveBeenCalledWith('user-id', LeaderboardType.DAILY, LeaderboardCategory.POINTS);
  });

  it('should update all leaderboards', async () => {
    mockLeaderboardService.updateLeaderboards.mockResolvedValue(undefined);

    const result = await controller.updateAllLeaderboards();
    expect(result).toEqual({ message: 'Leaderboards actualizados' });
    expect(mockLeaderboardService.updateLeaderboards).toHaveBeenCalled();
  });
});
