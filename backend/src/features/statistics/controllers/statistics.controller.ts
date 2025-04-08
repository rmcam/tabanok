import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatisticsService } from '../services/statistics.service';
import { CreateStatisticsDto } from '../dto/create-statistics.dto';
import { GenerateReportDto } from '../dto/statistics-report.dto';
import { Statistics } from '../entities/statistics.entity';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @Post()
    @ApiOperation({ summary: 'Create statistics for a user' })
    @ApiResponse({ status: 201, description: 'Statistics created successfully', type: Statistics })
    async create(@Body() createStatisticsDto: CreateStatisticsDto): Promise<Statistics> {
        return this.statisticsService.create(createStatisticsDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all statistics' })
    @ApiResponse({ status: 200, description: 'Return all statistics', type: [Statistics] })
    async findAll(): Promise<Statistics[]> {
        return this.statisticsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get statistics by ID' })
    @ApiResponse({ status: 200, description: 'Return statistics by id', type: Statistics })
    async findOne(@Param('id') id: string): Promise<Statistics> {
        return this.statisticsService.findOne(id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get statistics by user ID' })
    @ApiResponse({ status: 200, description: 'Return statistics by user id', type: Statistics })
    async findByUserId(@Param('userId') userId: string): Promise<Statistics> {
        return this.statisticsService.findByUserId(userId);
    }

    @Post('report')
    @ApiOperation({ summary: 'Generate statistics report' })
    @ApiResponse({ status: 200, description: 'Return generated report' })
    async generateReport(@Body() generateReportDto: GenerateReportDto): Promise<any> {
        return this.statisticsService.generateReport(generateReportDto);
    }
} 