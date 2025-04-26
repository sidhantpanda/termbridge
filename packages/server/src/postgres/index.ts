import {AppDataSource} from './data-source';

export const startDb = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Postgres DB is ready');
  } catch (error) {
    console.error('Error during Data Source initialization', error);
  }
}