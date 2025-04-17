import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @Column()
  requiredXp: number;
}
