import { Controller, Get, Param } from '@nestjs/common';
import { LeaderboardService } from '../services/leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  async getLeaderboard(): Promise<any[]> {
    return await this.leaderboardService.getLeaderboard();
  }

  @Get(':userId')
  async getUserRank(@Param('userId') userId: string): Promise<any> {
    return await this.leaderboardService.getUserRank(userId);
  }
}
