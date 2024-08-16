import couch from 'nano';
import { COUCHDB_HOST, COUCHDB_PASS, COUCHDB_PORT, COUCHDB_USER } from '../config';

export const getNano = (): couch.ServerScope => {
  const host = COUCHDB_HOST;
  const port = COUCHDB_PORT;
  const url = `http://${COUCHDB_USER}:${COUCHDB_PASS}@${host}:${port}`;
  const nano = couch(url);
  return nano;
};

export const getDb = <T>(name: string) => {
  const nano = getNano();
  return nano.db.use<T>(name);
};
