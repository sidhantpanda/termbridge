import { GetTailscaleInfoResponse } from '@termbridge/common';
import { API_METHODS, makeApiCall } from '../base-api';

export const getTailscaleInfo = async ({ id }: { id: string }): Promise<GetTailscaleInfoResponse> => {
  const response = await makeApiCall<GetTailscaleInfoResponse>(API_METHODS.GET, `/api/remotes/${id}/info/tailscale`);
  return response;
};
