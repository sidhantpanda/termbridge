import { GetDockerContainers } from '@termbridge/common';
import { API_METHODS, makeApiCall } from '../base-api';

export const getDockerContainers = async ({ id }: { id: string }) => {
  const response = await makeApiCall<GetDockerContainers>(API_METHODS.GET, `/api/docker/${id}/ps`);
  return response;
};
