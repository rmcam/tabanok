import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, UpdateDateColumn } from 'typeorm';
import { BaseAchievement } from './base-achievement.entity';
import { User } from '../../../auth/entities/user.entity';

export enum AchievementCategory {
    LENGUA = 'lengua',
    DANZA = 'danza',
    MUSICA = 'musica',
    ARTESANIA = 'artesania',
    HISTORIA = 'historia',
    TRADICION = 'tradicion',
    GASTRONOMIA = 'gastronomia',
    MEDICINA = 'medicina'
}

export enum AchievementTier {
    BRONCE = 'bronce',
    PLATA = 'plata',
    ORO = 'oro',
    PLATINO = 'platino',
    ANCESTRAL = 'ancestral'
}

@Entity('cultural_achievements')
export class CulturalAchievement extends BaseAchievement {
    @Column({
        type: 'enum',
        enum: AchievementCategory
    })
    category: AchievementCategory;

    @Column({
        type: 'enum',
        enum: AchievementTier
    })
    tier: AchievementTier;

    @Column('json')
    requirements: {
        type: string;
        value: number;
        description: string;
    }[];

    @Column('int')
    pointsReward: number;

    @Column('int', { nullable: true })
    expirationDays?: number;

    @Column('json', { nullable: true })
    additionalRewards?: {
        type: string;
        value: any;
        description: string;
    }[];

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isSecret: boolean;

    @Column({ default: 0 })
    points: number;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
