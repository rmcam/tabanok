import { Controller, Get, Param } from '@nestjs/common';
import { BadgeService } from '../services/badge.service';

@Controller('badges')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get('users/:userId')
  async getBadgesByUserId(@Param('userId') userId: string) {
    return this.badgeService.getBadgesByUserId(userId);
  }
}
