import couch from 'nano';
import { getNano } from '.';
import { REMOTE_HOSTS_DB_NAME } from './RemoteHosts';

const createOrGetDb = async (dbName: string) => {
  const nano = getNano();
  try {
    await nano.db.create(dbName);
  } catch (e: unknown) {
    const error = e as couch.RequestError;
    if (error.statusCode !== 412) {
      console.error('Error creating database', error);
      throw e;
    }
  }
};

const DBs = [REMOTE_HOSTS_DB_NAME];

export const ensureDBs = async () => {
  await Promise.all(DBs.map(createOrGetDb));
};
