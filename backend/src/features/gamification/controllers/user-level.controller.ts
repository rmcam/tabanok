import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { UserLevelService } from '../services/user-level.service';
import { UserLevel } from '../entities/user-level.entity';
import { UpdateUserLevelDto } from '../dto/update-user-level.dto';

@Controller('levels')
export class UserLevelController {
  constructor(private readonly userLevelService: UserLevelService) {}

  @Get(':userId')
  getUserLevel(@Param('userId') userId: string): Promise<UserLevel> {
    return this.userLevelService.getUserLevel(userId);
  }

  @Put(':userId')
  updateUserLevel(
    @Param('userId') userId: string,
    @Body() updateUserLevelDto: UpdateUserLevelDto,
  ): Promise<UserLevel> {
    return this.userLevelService.updateUserLevel(userId, updateUserLevelDto);
  }

  @Post(':userId/add-xp')
  addXp(
    @Param('userId') userId: string,
    @Body('xp') xp: number,
  ): Promise<UserLevel> {
    return this.userLevelService.addExperiencePoints(userId, xp);
  }
}
