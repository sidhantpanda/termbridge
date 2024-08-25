import { AddRemoteHostRequest, AddRemoteHostResponse } from './api/config/add-remote-host';
import {
  CreateOrUpdateHostRequest,
  CreateOrUpdateHostRequestBody,
  CreateOrUpdateHostRequestQuery,
  CreateOrUpdateHostResponse
} from './api/config/create-or-update-host';
import { GetRemoteByIdResponse } from './api/config/get-remote-by-id';
import { GetRemoteHostsResponse } from './api/config/get-remote-hosts';
import RemoteHost from './models/RemoteHost';

export {
  RemoteHost,
  GetRemoteHostsResponse,
  AddRemoteHostRequest,
  AddRemoteHostResponse,
  GetRemoteByIdResponse,
  CreateOrUpdateHostRequest,
  CreateOrUpdateHostRequestBody,
  CreateOrUpdateHostRequestQuery,
  CreateOrUpdateHostResponse
};
