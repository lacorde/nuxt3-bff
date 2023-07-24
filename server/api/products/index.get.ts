import StoreClient from "~/composables/api/StoreClient";
import ProductRepository from "~/composables/repository/ProductRepository";

export default defineEventHandler(async (event) => {
  const client = new StoreClient(event.node.req, event.node.res);

  const productRepository = new ProductRepository(client);
  const products = await productRepository.getAll();

  return products;
});
