import { Level } from '../../features/gamification/entities/level.entity';
import { DataSource } from 'typeorm';

export const LevelSeeder = {
  async seed(dataSource: DataSource): Promise<void> {
    const levelRepository = dataSource.getRepository(Level);

    // Check if levels already exist
    const existingLevels = await levelRepository.count();
    if (existingLevels > 0) {
      console.log('Levels already exist, skipping seeding...');
      return;
    }

    const levels = [
      { level: 1, requiredXp: 0 },
      { level: 2, requiredXp: 100 },
      { level: 3, requiredXp: 250 },
      { level: 4, requiredXp: 500 },
      { level: 5, requiredXp: 1000 },
    ];

    await levelRepository.insert(levels);
    console.log('Levels seeded successfully!');
  },
};
