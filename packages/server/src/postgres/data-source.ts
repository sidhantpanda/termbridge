import { DataSource } from 'typeorm';
import { User } from './models/User';
import { PG_DB, PG_HOST, PG_PASS, PG_PORT, PG_USER } from '../config';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: PG_HOST,
  port: parseInt(PG_PORT),
  username: PG_USER,
  password: PG_PASS,
  database: PG_DB,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
