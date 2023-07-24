import { $Fetch, FetchOptions, FetchResponse } from "ofetch";
import { IncomingMessage, ServerResponse } from "http";

export default interface IFakeClient {
  baseURL: string;
  client: $Fetch;
  res: ServerResponse<IncomingMessage>;

  call(endpoint: string, fetchOptions?: FetchOptions<"json">): Promise<any>;
}

export interface IConstructFakeClient {
  baseURL: string;
  res: ServerResponse<IncomingMessage>;
}
