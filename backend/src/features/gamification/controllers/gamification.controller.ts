import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { GamificationService } from '../services/gamification.service';

@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Post('grant-points/:userId')
  async grantPoints(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('points') points: number,
  ) {
    return this.gamificationService.grantPoints(userId, points);
  }
}
