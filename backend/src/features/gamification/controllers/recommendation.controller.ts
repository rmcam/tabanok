import { Controller, Get, Param } from '@nestjs/common';
import { RecommendationService } from 'src/features/gamification/services/recommendation.service';

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get('users/:userId')
  async getRecommendationsByUserId(@Param('userId') userId: string) {
    return this.recommendationService.getRecommendationsByUserId(userId);
  }
}
