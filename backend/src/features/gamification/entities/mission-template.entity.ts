import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
