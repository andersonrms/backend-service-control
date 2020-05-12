import { Router } from 'express';
import { getRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Product from '../models/Product';
import CreateProductService from '../services/products/CreateProductService';
import UpdateProductService from '../services/products/UpdateProductService';
import DeleteProductServices from '../services/products/DeleteProductService';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

productsRouter.get('/', async (request, response) => {
  const productServiceRepository = getRepository(Product);
  const product = await productServiceRepository.find();
  return response.json(product);
});

productsRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const createProductService = new CreateProductService();

  const product = await createProductService.execute({ name });

  return response.json(product);
});

productsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  const updateProduct = new UpdateProductService();

  const product = await updateProduct.execute({ id, name });

  return response.json(product);
});

productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProduct = new DeleteProductServices();

  await deleteProduct.execute(id);

  return response.send();
});

export default productsRouter;
