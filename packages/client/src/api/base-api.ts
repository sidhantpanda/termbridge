import request from 'superagent';
import { API_HOST } from '../config';

export enum API_METHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export interface MakeApiCallOptions {
  query?: Record<string, string | number>;
  json?: boolean;
  body?: object;
}

export class ApiError extends Error {
  public statusCode: number;
  public title: string;
  public detail?: string;

  constructor(statusCode: number, title: string, detail?: string) {
    super(title);
    this.statusCode = statusCode;
    this.title = title;
    this.detail = detail;
  }
}

export const makeApiCall = async <ResponseType = unknown>(
  method: API_METHODS,
  url: string,
  options?: MakeApiCallOptions
): Promise<ResponseType> => {
  const { json = true, body, query } = options ?? {};
  const hostname = window.location.hostname;
  const port = window.location.port;
  const protocol = window.location.protocol;



  const host = API_HOST === 'PROD_BUILD' ? `${protocol}//${hostname}:${port}` : API_HOST;

  const fullUrl = `${host}${url}`;

  console.log({ hostname, port, protocol, host, fullUrl })

  try {
    const req = request(method, fullUrl).ok((res) => res.status >= 200); // Will handle this error code ourselves

    if (body) {
      req.send(body);
    }
    if (json) {
      req.set('Accept', 'application/json');
    }
    if (query) {
      req.query(query);
    }

    const response = await req;

    if (response.status >= 200 && response.status < 300) {
      if (json) {
        const result = JSON.parse(response.text) as ResponseType;
        return result;
      } else {
        return response.text as unknown as ResponseType;
      }
    } else {
      console.error('Error from API', response.body);
      if (response?.body?.error) {
        let detail = '';
        if (response?.body?.detail) {
          detail = response.body.detail;
        }
        throw new ApiError(response.status, response.body.error, detail);
      } else {
        throw new ApiError(
          response.status,
          'Error calling API',
          JSON.stringify(response.body, null, 4)
        );
      }
    }
  } catch (err) {
    console.error('Error calling', method, url, err);
    throw err;
  }
};
