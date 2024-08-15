import { hostsConfig } from '../secret';

interface RemoteHost {
  name: string;
}

export const getRemoteHosts = async (): Promise<RemoteHost[]> => {
  const hosts = Object.keys(hostsConfig);
  return hosts.map((name) => ({ name }));
};
