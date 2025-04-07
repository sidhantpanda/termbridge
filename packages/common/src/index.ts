import { AddRemoteHostRequest, AddRemoteHostResponse } from './api/config/add-remote-host';
import {
  CreateOrUpdateHostRequest,
  CreateOrUpdateHostRequestBody,
  CreateOrUpdateHostRequestQuery,
  CreateOrUpdateHostResponse
} from './api/config/create-or-update-host';
import { GetRemoteByIdResponse } from './api/config/get-remote-by-id';
import { GetRemoteHostsResponse } from './api/config/get-remote-hosts';
import { GetDockerContainers } from './api/docker/get-containers';
import { GetTailscaleInfoResponse } from './api/remotes/get-tailscale-info';
import { DockerContainer } from './models/DockerContainer';
import RemoteHost from './models/RemoteHost';

export {
  RemoteHost,
  DockerContainer,
  GetRemoteHostsResponse,
  AddRemoteHostRequest,
  AddRemoteHostResponse,
  GetRemoteByIdResponse,
  CreateOrUpdateHostRequest,
  CreateOrUpdateHostRequestBody,
  CreateOrUpdateHostRequestQuery,
  CreateOrUpdateHostResponse,
  GetDockerContainers,
  GetTailscaleInfoResponse
};
