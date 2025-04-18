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

  async grantBadge(userId: number, badgeId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Lógica para otorgar la insignia al usuario
    // (Aquí iría la lógica para registrar la insignia en la tabla User)
    // Por ahora no se registra la insignia

    await this.userRepository.save(user);

    return user;
  }

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
    user.points += points;
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
      level: calculateLevel(user.points),
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

  async awardReward(userId: number, rewardId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const reward = await this.rewardRepository.findOne({ where: { id: rewardId.toString() } });
    if (!reward) {
      throw new Error(`Reward with ID ${rewardId} not found`);
    }

    // Lógica para otorgar la recompensa al usuario
    // (Aquí iría la lógica para registrar la recompensa en la tabla User)
    // Por ahora no se registra la recompensa

    await this.userRepository.save(user);

    return user;
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

  async awardPoints(userId: number, points: number, activityType: string, description: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    user.points += points;

    // Registrar la actividad
    // (Aquí iría la lógica para registrar la actividad en la tabla User)
    // Por ahora no se registra la actividad

    await this.userRepository.save(user);

    return user;
  }
}
