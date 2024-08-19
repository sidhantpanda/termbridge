export const IS_DEV = process.env.IS_DEV === '1';
export const CLIENT_DIST = process.env.CLIENT_DIST ?? 'client/dist';

export const COUCHDB_HOST = process.env.COUCHDB_HOST ?? 'localhost';
export const COUCHDB_PORT = process.env.COUCHDB_PORT ?? '5984';
export const COUCHDB_USER = process.env.COUCHDB_USER ?? 'admin';
export const COUCHDB_PASS = process.env.COUCHDB_PASS ?? 'admin';
