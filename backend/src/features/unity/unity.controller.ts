import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/entities/user.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { LoggingInterceptor } from '../../common/LogginInterceptor';
import { CreateUnityDto } from './dto/create-unity.dto';
import { UpdateUnityDto } from './dto/update-unity.dto';
import { UnityService } from './unity.service';

@ApiTags('units')
@Controller('unity')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UnityController {
  constructor(private readonly unityService: UnityService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Crear unidad de aprendizaje',
    description:
      'Crea una nueva unidad de aprendizaje en el sistema con su contenido y configuración inicial',
  })
  @ApiResponse({
    status: 201,
    description: 'Unidad de aprendizaje creada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'No tiene permisos de administrador para realizar esta acción',
  })
  create(@Body() createUnityDto: CreateUnityDto) {
    return this.unityService.create(createUnityDto);
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  @ApiOperation({
    summary: 'Listar unidades de aprendizaje',
    description: 'Obtiene todas las unidades de aprendizaje disponibles en el sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de unidades obtenida exitosamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  findAll(@Request() req) {
    return this.unityService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener unidad de aprendizaje',
    description: 'Obtiene los detalles de una unidad de aprendizaje específica por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la unidad de aprendizaje',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Unidad de aprendizaje encontrada exitosamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Unidad de aprendizaje no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.unityService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Actualizar unidad de aprendizaje',
    description: 'Actualiza la información y configuración de una unidad de aprendizaje existente',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la unidad de aprendizaje',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Unidad de aprendizaje actualizada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'No tiene permisos de administrador para realizar esta acción',
  })
  @ApiResponse({
    status: 404,
    description: 'Unidad de aprendizaje no encontrada',
  })
  update(@Param('id') id: string, @Body() updateUnityDto: UpdateUnityDto) {
    return this.unityService.update(id, updateUnityDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Eliminar unidad de aprendizaje',
    description: 'Desactiva una unidad de aprendizaje existente en el sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la unidad de aprendizaje',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Unidad de aprendizaje eliminada exitosamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'No tiene permisos de administrador para realizar esta acción',
  })
  @ApiResponse({
    status: 404,
    description: 'Unidad de aprendizaje no encontrada',
  })
  remove(@Param('id') id: string) {
    return this.unityService.remove(id);
  }

  @Patch(':id/toggle-lock')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Alternar bloqueo de unidad',
    description:
      'Cambia el estado de bloqueo de una unidad de aprendizaje entre bloqueado y desbloqueado',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la unidad de aprendizaje',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado de bloqueo actualizado exitosamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'No tiene permisos de administrador para realizar esta acción',
  })
  @ApiResponse({
    status: 404,
    description: 'Unidad de aprendizaje no encontrada',
  })
  toggleLock(@Param('id') id: string) {
    return this.unityService.toggleLock(id);
  }

  @Patch(':id/points')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Actualizar puntos de unidad',
    description: 'Modifica los puntos requeridos para completar una unidad de aprendizaje',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la unidad de aprendizaje',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Puntos actualizados exitosamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'No tiene permisos de administrador para realizar esta acción',
  })
  @ApiResponse({
    status: 404,
    description: 'Unidad de aprendizaje no encontrada',
  })
  updatePoints(@Param('id') id: string, @Body('points') points: number) {
    return this.unityService.updatePoints(id, points);
  }
}
