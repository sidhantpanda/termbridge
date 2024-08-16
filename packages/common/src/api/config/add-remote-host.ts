import RemoteHost from '../../models/RemoteHost';

export interface AddRemoteHostRequest {
  name: string,
  host: string,
  port: number,
  username: string,
  password: string,
}

interface AddRemoteHostResponseSuccess {
  message: string;
  remote: RemoteHost;
}

interface AddRemoteHostResponseError {
  error: string;
}

export type AddRemoteHostResponse = AddRemoteHostResponseSuccess | AddRemoteHostResponseError;
