import { Controller, Get, Param, Query, ParseEnumPipe, NotFoundException } from '@nestjs/common';
import { LeaderboardService } from '../services/leaderboard.service';
import { LeaderboardType, LeaderboardCategory } from '../enums/leaderboard.enum';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Leaderboards')
@Controller('leaderboards')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener leaderboard por tipo y categoría' })
  @ApiQuery({ name: 'type', enum: LeaderboardType })
  @ApiQuery({ name: 'category', enum: LeaderboardCategory })
  async getLeaderboard(
    @Query('type', new ParseEnumPipe(LeaderboardType)) type: LeaderboardType,
    @Query('category', new ParseEnumPipe(LeaderboardCategory)) category: LeaderboardCategory
  ) {
    const leaderboard = await this.leaderboardService.getLeaderboard(type, category);
    if (!leaderboard) {
      throw new NotFoundException('Leaderboard no encontrado');
    }
    return leaderboard;
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener ranking de un usuario' })
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiQuery({ name: 'type', enum: LeaderboardType })
  @ApiQuery({ name: 'category', enum: LeaderboardCategory })
  async getUserRanking(
    @Param('userId') userId: string,
    @Query('type', new ParseEnumPipe(LeaderboardType)) type: LeaderboardType,
    @Query('category', new ParseEnumPipe(LeaderboardCategory)) category: LeaderboardCategory
  ) {
    return this.leaderboardService.getUserRank(userId, type, category);
  }

  @Get('update/all')
  @ApiOperation({ summary: 'Actualizar todos los leaderboards' })
  async updateAllLeaderboards() {
    await this.leaderboardService.updateLeaderboards();
    return { message: 'Leaderboards actualizados' };
  }
}
