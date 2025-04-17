import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Level } from '../entities/level.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class LevelRepository extends Repository<Level> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Level, dataSource.manager);
  }
}
