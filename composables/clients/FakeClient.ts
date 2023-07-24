import { $Fetch, $fetch, FetchOptions, FetchResponse } from "ofetch";
import IFakeClient, { IConstructFakeClient } from "./IFakeClient";
import { IncomingMessage, ServerResponse } from "http";

const getDefaultPagination = (totalItems: number) => ({
  first: 1,
  previous: 0,
  current: 1,
  next: undefined,
  last: 1,
  totalItems,
});

export default class FakeClient implements IFakeClient {
  baseURL: string;
  client: $Fetch;
  res: ServerResponse<IncomingMessage>;

  constructor(props: IConstructFakeClient) {
    this.baseURL = props.baseURL;
    this.res = props.res;

    this.client = $fetch.create({
      baseURL: this.baseURL,
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    });
  }

  async call(
    endpoint: string,
    fetchOptions?: FetchOptions<any>
  ): Promise<FetchResponse<any>> {
    try {
      const response = await this.client(`/${endpoint}`, fetchOptions);

      return response;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
