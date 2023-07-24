import IAPIClient from "../api/IApiClient";
import IFakeClient from "../clients/IFakeClient";
import IRepository from "./IRepository";

export default class StoreRepository<FakeEntity> implements IRepository {
  fakeIndex: string;
  fake: IFakeClient;

  constructor(client: IAPIClient, fakeIndex: string) {
    this.fake = client.fakeClient;
    this.fakeIndex = fakeIndex;
  }

  async getAll(params?: object): Promise<FakeEntity> {
    return await this.fake.call(this.fakeIndex, params);
  }
}
