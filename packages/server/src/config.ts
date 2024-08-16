export const MONGO_HOST = process.env.MONGO_HOST ?? 'localhost';
export const MONGO_PORT = process.env.MONGO_PORT ?? '27017';
export const MONGO_USER = process.env.MONGO_USER ?? 'admin';
export const MONGO_PASS = process.env.MONGO_PASS ?? 'admin';
export const MONGO_DBNAME = process.env.MONGO_DBNAME ?? 'termbridge';

export const COUCHDB_HOST = process.env.COUCHDB_HOST ?? 'localhost';
export const COUCHDB_PORT = process.env.COUCHDB_PORT ?? '5984';
export const COUCHDB_USER = process.env.COUCHDB_USER ?? 'admin';
export const COUCHDB_PASS = process.env.COUCHDB_PASS ?? 'admin';