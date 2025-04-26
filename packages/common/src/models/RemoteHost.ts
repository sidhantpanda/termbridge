import { ConnectConfig } from 'ssh2';
import { DocumentGetResponse } from 'nano';

type PartialConnectConfig = Omit<
  ConnectConfig,
  'debug' | 'hostVerifier' | 'password' | 'privateKey'
> & DocumentGetResponse;

interface RemoteHost extends PartialConnectConfig {
  id: string;
  name: string;
  tailscaleIps?: string[];
}

export default RemoteHost;
