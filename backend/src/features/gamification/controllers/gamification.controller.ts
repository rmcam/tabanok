import { Body, Controller, Get, Param, ParseIntPipe, Post, InternalServerErrorException } from '@nestjs/common';
import { LeaderboardEntryDto } from '../dto/leaderboard-entry.dto';
import { GamificationService } from '../services/gamification.service';
import { LeaderboardService } from '../services/leaderboard.service';

@Controller('gamification')
export class GamificationController {
  constructor(
    private readonly gamificationService: GamificationService,
    private readonly leaderboardService: LeaderboardService,
  ) {}

  @Post('grant-points/:userId')
  async grantPoints(@Param('userId', ParseIntPipe) userId: number, @Body('points') points: number) {
    return this.gamificationService.grantPoints(userId, points);
  }

  @Post(':userId/assign-mission/:missionId')
  async assignMission(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('missionId', ParseIntPipe) missionId: number,
  ) {
    return this.gamificationService.assignMission(userId, missionId);
  }

  @Get('leaderboard')
  async getLeaderboard(): Promise<LeaderboardEntryDto[]> {
    try {
      return await this.leaderboardService.getLeaderboard();
    } catch (error) {
      console.error('Error al obtener la tabla de clasificación:', error);
      throw new InternalServerErrorException('Error al obtener la tabla de clasificación');
    }
  }
}
