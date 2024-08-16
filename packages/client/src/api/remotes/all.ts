import { GetRemoteHostsResponse, RemoteHost } from '@termbridge/common';
import { API_METHODS, makeApiCall } from '../base-api';

export const getAllRemotes = async (): Promise<RemoteHost[]> => {
  const response = await makeApiCall<GetRemoteHostsResponse>(API_METHODS.GET, '/api/remotes/all');
  return response.hosts;
};
