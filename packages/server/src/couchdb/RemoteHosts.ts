import { getDb } from '.';

export const REMOTE_HOSTS_DB_NAME = 'remote_hosts';

interface RemoteHostDoc {
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
}

const RemoteHosts = getDb<RemoteHostDoc>(REMOTE_HOSTS_DB_NAME);

export default RemoteHosts;
