import { ConnectConfig } from 'ssh2';
import { getDb } from '.';

export const REMOTE_HOSTS_DB_NAME = 'termbridge_remote_hosts';
// Remember to update the init script with the DB name if copying this file

type ConnectConfigPartial = Omit<ConnectConfig, 'debug' | 'hostVerifier'>;

export interface RemoteHostDoc extends ConnectConfigPartial {
  name: string;
}

const RemoteHosts = getDb<RemoteHostDoc>(REMOTE_HOSTS_DB_NAME);

export default RemoteHosts;
