import { Router } from 'express';
import { getRepository } from 'typeorm';

import OrderService from '../models/OrderService';
import CreateOrderService from '../services/orderServices/CreateOrderService';
import DeleteOrderService from '../services/orderServices/DeleteOrderService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const orderServicesRouter = Router();

orderServicesRouter.use(ensureAuthenticated);

orderServicesRouter.get('/', async (request, response) => {
  const orderServiceRepository = getRepository(OrderService);
  const orders = await orderServiceRepository.find();
  return response.json(orders);
});

orderServicesRouter.post('/', async (request, response) => {
  const {
    name,
    product,
    quantity,
    price,
    paymentForm,
    description,
  } = request.body;

  const createOrderService = new CreateOrderService();

  const orderService = await createOrderService.execute({
    name,
    product,
    quantity,
    price,
    paymentForm,
    description,
  });

  return response.json(orderService);
});

orderServicesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteUserService = new DeleteOrderService();

  await deleteUserService.execute(id);

  return response.status(204).send();
});

export default orderServicesRouter;
