import StoreRepository from "./StoreRepository";
import IAPIClient from "../api/IApiClient";
import { IFakeProduct } from "../interfaces/fake/IFakeProduct";
import FakeMapper from "../mapper/FakeMapper";

export default class ProductRepository extends StoreRepository<IFakeProduct> {
  client;

  constructor(client: IAPIClient) {
    super(client, FakeMapper.Product);

    this.client = client;
  }
}
