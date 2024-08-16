import { GetRemoteByIdResponse, RemoteHost } from '@termbridge/common';
import { API_METHODS, makeApiCall } from '../base-api';

export const removeRemote = async ({ id }: { id: string }): Promise<RemoteHost> => {
  const response = await makeApiCall<GetRemoteByIdResponse>(API_METHODS.DELETE, `/api/remotes/${id}`);
  return response.remote;
};
