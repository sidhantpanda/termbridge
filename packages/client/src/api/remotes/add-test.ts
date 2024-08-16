import { AddRemoteHostRequest, AddRemoteHostResponse, GetRemoteHostsResponse, RemoteHost } from '@termbridge/common';
import { API_METHODS, makeApiCall } from '../base-api';

export const addRemoteHostTest = async (options: AddRemoteHostRequest): Promise<void> => {
  await makeApiCall<AddRemoteHostResponse>(API_METHODS.POST, '/api/remotes/add-test', {
    body: options
  });
};
