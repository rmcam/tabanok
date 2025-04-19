import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BadgeService } from '../services/badge.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@ApiTags('Gamification - Badges')
@Controller('badges')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get('users/:userId')
  @ApiOperation({ summary: 'Obtiene las insignias de un usuario' })
  @ApiParam({ name: 'userId', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Insignias del usuario obtenidas exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  async getBadgesByUserId(@Param('userId') userId: string) {
    return this.badgeService.getBadgesByUserId(userId);
  }
}
