import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../../../auth/entities/user.entity';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { MissionTemplateService } from '../services/mission-template.service';
import { MissionTemplate } from '../entities/mission-template.entity';

@ApiTags('mission-templates')
@ApiBearerAuth()
@Controller('mission-templates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MissionTemplateController {
  constructor(private readonly missionTemplateService: MissionTemplateService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Listar todas las plantillas de misiones' })
  async findAll(): Promise<MissionTemplate[]> {
    return this.missionTemplateService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Obtener una plantilla de misión por ID' })
  async findOne(@Param('id') id: string): Promise<MissionTemplate> {
    return this.missionTemplateService.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Crear una nueva plantilla de misión' })
  async create(@Body() data: Partial<MissionTemplate>): Promise<MissionTemplate> {
    return this.missionTemplateService.create(data);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Actualizar una plantilla de misión' })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<MissionTemplate>,
  ): Promise<MissionTemplate> {
    return this.missionTemplateService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Eliminar una plantilla de misión' })
  @ApiResponse({ status: 204, description: 'Eliminado exitosamente' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.missionTemplateService.remove(id);
  }
}
