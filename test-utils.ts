import { DataSource } from 'typeorm';
import { Student } from './src/entity/Student';

export const setupTestDataSource = async (): Promise<DataSource> => {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'satnam',
    password: 'password',
    database: 'satnam_db',
    synchronize: true,
    dropSchema: true,
    entities: [Student],
    logging: false,
  });

  await AppDataSource.initialize();
  return AppDataSource;
};
