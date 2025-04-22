import path from 'path';

export const IS_DEV = process.env.IS_DEV === '1';
export const CLIENT_DIST = path.resolve(process.cwd(), '..', process.env.CLIENT_DIST ?? 'client/dist');

export const COUCHDB_HOST = process.env.COUCHDB_HOST ?? 'localhost';
export const COUCHDB_PORT = process.env.COUCHDB_PORT ?? '5984';
export const COUCHDB_USER = process.env.COUCHDB_USER ?? 'admin';
export const COUCHDB_PASS = process.env.COUCHDB_PASS ?? 'admin';

export const PG_HOST = process.env.PG_HOST ?? 'localhost';
export const PG_PORT = process.env.PG_PORT ?? '5432';
export const PG_USER = process.env.PG_USER ?? 'postgres';
export const PG_PASS = process.env.PG_PASS ?? 'postgres';
export const PG_DB = process.env.PG_DB ?? 'postgres';

export const REDIS_HOST = process.env.REDIS_HOST;
