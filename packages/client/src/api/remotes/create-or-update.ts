import {
  CreateOrUpdateHostRequest,
  CreateOrUpdateHostRequestBody,
  CreateOrUpdateHostResponse
} from '@termbridge/common';
import { API_METHODS, makeApiCall } from '../base-api';

export const createOrUpdateHost = async ({ body, query }: CreateOrUpdateHostRequest): Promise<void> => {
  console.log({ body, query });
  const endpoint = body.remote._id ? `/api/remotes/${body.remote._id}` : '/api/remotes/new';
  await makeApiCall<
    CreateOrUpdateHostResponse,
    CreateOrUpdateHostRequestBody
  >(API_METHODS.PUT, endpoint, {
    body,
    query
  });
};
