import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MissionType } from './mission.entity';

export enum MissionFrequency {
  DIARIA = 'diaria',
  SEMANAL = 'semanal',
  MENSUAL = 'mensual',
  TEMPORADA = 'temporada',
}

@Entity('mission_templates')
export class MissionTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: MissionType })
  type: MissionType;

  @Column({ type: 'enum', enum: MissionFrequency })
  frequency: MissionFrequency;

  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  tags?: string;

  @Column('json', { nullable: true })
  conditions?: any;

  @Column('json', { nullable: true })
  rewards?: any;

  @Column({ type: 'date', nullable: true })
  startDate?: string;

  @Column({ type: 'date', nullable: true })
  endDate?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('int', { default: 1 })
  minLevel: number;

  @Column('int', { default: 0 })
  maxLevel: number;

  @Column('float', { default: 1 })
  baseTargetValue: number;

  @Column('float', { default: 1 })
  baseRewardPoints: number;

  @Column('jsonb', { nullable: true })
  rewardBadge?: {
    id: string;
    name: string;
    icon: string;
  };

  @Column('jsonb', { nullable: true })
  bonusConditions?: {
    condition: string;
    multiplier: number;
    description?: string;
  }[];

  @Column('jsonb', { nullable: true })
  requirements?: {
    minimumStreak?: number;
    specificAchievements?: string[];
    previousMissions?: string[];
  };

  @Column('jsonb', { nullable: true })
  difficultyScaling?: {
    level: number;
    targetMultiplier: number;
    rewardMultiplier: number;
  }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
