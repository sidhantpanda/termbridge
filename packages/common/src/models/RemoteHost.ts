import { ConnectConfig } from 'ssh2';

type PartialConnectConfig = Omit<
  ConnectConfig,
  'debug' | 'hostVerifier' | 'password' | 'privateKey'
>

interface RemoteHost extends PartialConnectConfig {
  id: string;
  name: string;
  tailscaleIps?: string[];
}

export default RemoteHost;
