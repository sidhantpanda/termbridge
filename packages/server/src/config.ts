import path from 'path';

export const IS_DEV = process.env.IS_DEV === '1';
export const CLIENT_DIST = path.resolve(process.cwd(), '..', process.env.CLIENT_DIST ?? 'client/dist');

export const PG_HOST = process.env.PG_HOST ?? 'localhost';
export const PG_PORT = process.env.PG_PORT ?? '5432';
export const PG_USER = process.env.PG_USER ?? 'postgres';
export const PG_PASS = process.env.PG_PASS ?? 'postgres';
export const PG_DB = process.env.PG_DB ?? 'postgres';

export const REDIS_HOST = process.env.REDIS_HOST;
