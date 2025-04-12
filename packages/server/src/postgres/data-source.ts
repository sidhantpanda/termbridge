import { DataSource } from 'typeorm';
import { User } from './models/User';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "100.76.161.90",
  port: 5432,
  username: "sidhant",
  password: "db_pass",
  database: "termbridge",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
