import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Gamification } from '../entities/gamification.entity';
import { Leaderboard } from '../entities/leaderboard.entity';
import { LeaderboardCategory, LeaderboardType } from '../enums/leaderboard.enum';
import { LeaderboardRepository } from '../repositories/leaderboard.repository';
import { User } from '../../../auth/entities/user.entity';

@Injectable()
export class LeaderboardService {
    constructor(
        private leaderboardRepository: LeaderboardRepository,
        @InjectRepository(Gamification)
        private gamificationRepository: Repository<Gamification>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async getLeaderboard(): Promise<any[]> {
        // TODO: Implement leaderboard logic
        return [];
    }

    async getUserRank(userId: number): Promise<any> {
        // TODO: Implement user rank logic
        return 0;
    }
}
