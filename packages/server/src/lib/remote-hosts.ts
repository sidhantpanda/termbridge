import { RemoteHost } from '@termbridge/common';
import { hostsConfig } from '../secret';

export const getRemoteHosts = async (): Promise<RemoteHost[]> => {
  const hosts = Object.keys(hostsConfig);
  return hosts.map((name) => ({ name }));
};
