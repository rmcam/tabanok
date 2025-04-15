import { Controller, Get, Param, Query, ParseEnumPipe, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { LeaderboardService } from '../services/leaderboard.service';
import { LeaderboardType, LeaderboardCategory } from '../enums/leaderboard.enum';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('Leaderboards')
@Controller('leaderboards')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener leaderboard por tipo y categoría' })
  @ApiQuery({ name: 'type', enum: LeaderboardType, description: 'Tipo de leaderboard' })
  @ApiQuery({ name: 'category', enum: LeaderboardCategory, description: 'Categoría del leaderboard' })
  @ApiResponse({ status: 200, description: 'Leaderboard obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Leaderboard no encontrado' })
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
  @ApiParam({ name: 'userId', type: 'string', format: 'uuid', description: 'ID del usuario (UUID)' })
  @ApiQuery({ name: 'type', enum: LeaderboardType, description: 'Tipo de leaderboard' })
  @ApiQuery({ name: 'category', enum: LeaderboardCategory, description: 'Categoría del leaderboard' })
  @ApiResponse({ status: 200, description: 'Ranking de usuario obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getUserRanking(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('type', new ParseEnumPipe(LeaderboardType)) type: LeaderboardType,
    @Query('category', new ParseEnumPipe(LeaderboardCategory)) category: LeaderboardCategory
  ) {
    return this.leaderboardService.getUserRank(userId, type, category);
  }

  @Get('update/all')
  @ApiOperation({ summary: 'Actualizar todos los leaderboards' })
  @ApiResponse({ status: 200, description: 'Leaderboards actualizados exitosamente' })
  async updateAllLeaderboards() {
    await this.leaderboardService.updateLeaderboards();
    return { message: 'Leaderboards actualizados' };
  }
}
