import { GetRemoteHostsResponse, RemoteHost } from '@termbridge/common';
import { API_METHODS, makeApiCall } from '../base-api';

export const getRemoteHosts = async (): Promise<RemoteHost[]> => {
  const response = await makeApiCall<GetRemoteHostsResponse>(API_METHODS.GET, '/api/config/remote-hosts');
  return response.hosts;
};
