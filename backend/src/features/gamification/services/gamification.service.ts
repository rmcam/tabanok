import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import { calculateLevel } from '../../../lib/gamification';
import { Achievement } from '../entities/achievement.entity';
import { Mission } from '../entities/mission.entity';
import { Reward } from '../entities/reward.entity';
import { UserAchievement } from '../entities/user-achievement.entity';
import { UserLevel } from '../entities/user-level.entity';
import { UserMission } from '../entities/user-mission.entity';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Achievement)
    private achievementRepository: Repository<Achievement>,
    @InjectRepository(UserAchievement)
    private userAchievementRepository: Repository<UserAchievement>,
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
    @InjectRepository(UserMission)
    private userMissionRepository: Repository<UserMission>,
    @InjectRepository(UserLevel)
    private userLevelRepository: Repository<UserLevel>,
  ) { }

  async createUserLevel(user: User): Promise<UserLevel> {
    const newUserLevel = this.userLevelRepository.create({
      user,
      userId: user.id,
    });
    return this.userLevelRepository.save(newUserLevel);
  }

  async getRewards(): Promise<Reward[]> {
    return this.rewardRepository.find();
  }

  async grantPoints(userId: number, points: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
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
    return this.userRepository.save(user);
  }

  async updateStats(userId: number, stats: any): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return this.userRepository.save(user);
  }

  async getUserStats(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return {
      level: calculateLevel(0),
    };
  }

  async grantAchievement(userId: number, achievementId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const achievement = await this.achievementRepository.findOne({ where: { id: achievementId.toString() } });
    if (!achievement) {
      throw new Error(`Achievement with ID ${achievementId} not found`);
    }

    const userAchievement = await this.userAchievementRepository.findOne({
      where: {
        user: { id: userId.toString() },
        achievement: { id: achievementId.toString() },
      },
    });

    if (userAchievement) {
      return user;
    }

    const newUserAchievement = this.userAchievementRepository.create({
      user: user,
      achievement: achievement,
    });

    await this.userAchievementRepository.save(newUserAchievement);

    return this.userRepository.save(user);
  }

  async assignMission(userId: number, missionId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const mission = await this.missionRepository.findOne({ where: { id: missionId.toString() } });
    if (!mission) {
      throw new Error(`Mission with ID ${missionId} not found`);
    }

    const newUserMission = this.userMissionRepository.create({
      user: user,
      mission: mission,
    });

    await this.userMissionRepository.save(newUserMission);

    return this.userRepository.save(user);
  }
}
