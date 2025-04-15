import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reward } from '../entities/reward.entity';
import { User } from '../../../auth/entities/user.entity';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getRewards(): Promise<Reward[]> {
    return this.rewardRepository.find();
  }

  async grantPoints(userId: number, points: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    user.points = (user.points || 0) + points;
    return this.userRepository.save(user);
  }

  async findByUserId(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: userId.toString() } });
  }

  async addPoints(userId: number, points: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    user.points = (user.points || 0) + points;
    return this.userRepository.save(user);
  }

  async updateStats(userId: number, stats: any): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    // Update user stats here
    return this.userRepository.save(user);
  }

  async getUserStats(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return {
      points: user.points || 0,
      level: 1, // Replace with actual level calculation
    };
  }
}
