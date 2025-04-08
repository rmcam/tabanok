import { Entity, Column, OneToMany } from 'typeorm';
import { BaseAchievement } from './base-achievement.entity';
import { UserAchievement } from './user-achievement.entity';

export enum AchievementType {
  LEVEL = 'LEVEL',
  LESSONS = 'LESSONS',
  POINTS = 'POINTS',
  STREAK = 'STREAK',
  CULTURAL = 'CULTURAL',
  OTHER = 'OTHER',
  LEVEL_REACHED = 'LEVEL_REACHED',
  LESSONS_COMPLETED = 'LESSONS_COMPLETED',
  PERFECT_SCORES = 'PERFECT_SCORES',
  STREAK_MAINTAINED = 'STREAK_MAINTAINED',
  CULTURAL_CONTRIBUTIONS = 'CULTURAL_CONTRIBUTIONS',
  POINTS_EARNED = 'POINTS_EARNED',
  FIRST_DAILY_LOGIN = 'FIRST_DAILY_LOGIN'
}

@Entity('achievements')
export class Achievement extends BaseAchievement {
  @Column({ type: 'enum', enum: AchievementType, default: AchievementType.OTHER })
  type: AchievementType;

  @Column({ comment: 'Criteria needed to complete, e.g., points, lessons completed' })
  criteria: string;

  @Column('int', { default: 0 })
  requirement: number;

  @Column('int', { default: 0 })
  bonusPoints: number;

  @Column('jsonb', { nullable: true })
  badge?: {
    id: string;
    name: string;
    icon: string;
  };

  @OneToMany(() => UserAchievement, userAchievement => userAchievement.achievement)
  userAchievements: UserAchievement[];
}
