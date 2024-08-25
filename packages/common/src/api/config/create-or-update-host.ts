import RemoteHost from '../../models/RemoteHost';

export interface CreateOrUpdateHostRequestBody {
  remote: {
    _id?: string,
    name: string,
    host: string,
    port: number,
    username: string,
    // If _id is not provided, password is required
    password: string,
  }
}

export interface CreateOrUpdateHostRequestQuery {
  dryRun: 'true' | 'false';
}

export interface CreateOrUpdateHostRequest {
  body: CreateOrUpdateHostRequestBody;
  query: CreateOrUpdateHostRequestQuery;
}

interface CreateOrUpdateHostResponseSuccess {
  message: string;
  remote: RemoteHost;
}

interface CreateOrUpdateHostResponseError {
  error: string;
}

export type CreateOrUpdateHostResponse = CreateOrUpdateHostResponseSuccess | CreateOrUpdateHostResponseError;
