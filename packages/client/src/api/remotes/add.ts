import { AddRemoteHostRequest, AddRemoteHostResponse } from '@termbridge/common';
import { API_METHODS, makeApiCall } from '../base-api';

export const addRemoteHost = async (options: AddRemoteHostRequest): Promise<void> => {
  await makeApiCall<AddRemoteHostResponse>(API_METHODS.POST, '/api/remotes/add', {
    body: options
  });
};
