import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { MissionService } from '../services/mission.service';
import { CreateMissionDto } from '../dto/create-mission.dto';
import { UpdateMissionDto } from '../dto/update-mission.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  async create(@Body() createMissionDto: CreateMissionDto) {
    return await this.missionService.createMission(createMissionDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Request() req) {
    const userId = req.user.id;
    return await this.missionService.getActiveMissions(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.missionService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMissionDto: UpdateMissionDto) {
    return await this.missionService.update(id, updateMissionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.missionService.remove(id);
  }
}
