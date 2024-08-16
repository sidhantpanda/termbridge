import { ConnectConfig } from 'ssh2';
import { getDb } from '.';

export const REMOTE_HOSTS_DB_NAME = 'remote_hosts';

export interface RemoteHostDoc extends ConnectConfig {
  name: string;
}

const RemoteHosts = getDb<RemoteHostDoc>(REMOTE_HOSTS_DB_NAME);

export default RemoteHosts;
