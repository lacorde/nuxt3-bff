import IAPIClient from "./IApiClient";
import FakeClient from "../clients/FakeClient";
import { IncomingMessage, ServerResponse } from "http";

export default class StoreClient implements IAPIClient {
  fakeClient;

  constructor(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const config = useRuntimeConfig();
    this.fakeClient = new FakeClient({
      baseURL: config.public.apiBaseUrl ?? "",
      res,
    });
  }
}
