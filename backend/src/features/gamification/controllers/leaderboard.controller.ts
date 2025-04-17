import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LeaderboardService } from '../services/leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  async getLeaderboard(): Promise<any[]> {
    return await this.leaderboardService.getLeaderboard();
  }

  @Get(':userId')
  async getUserRank(@Param('userId', ParseIntPipe) userId: number): Promise<any> {
    return await this.leaderboardService.getUserRank(userId);
  }
}
