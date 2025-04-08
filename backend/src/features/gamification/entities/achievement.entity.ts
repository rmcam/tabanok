import { Entity, Column, OneToMany } from 'typeorm';
import { BaseAchievement } from './base-achievement.entity';
import { UserAchievement } from './user-achievement.entity';

@Entity('achievements')
export class Achievement extends BaseAchievement {
  @Column({ comment: 'Criteria needed to complete, e.g., points, lessons completed' })
  criteria: string; // O podría ser un JSON o un valor numérico dependiendo de la complejidad

  @OneToMany(() => UserAchievement, userAchievement => userAchievement.achievement)
  userAchievements: UserAchievement[];
}
