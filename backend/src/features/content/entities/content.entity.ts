import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Lesson } from '../../lesson/entities/lesson.entity';

@Entity()
export class Content {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column({ type: 'json' })
    data: Record<string, any>;

    @Column({ default: 1 })
    order: number;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'int', nullable: true })
    level: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
    lesson: Lesson;

    @Column()
    lessonId: string;
} 