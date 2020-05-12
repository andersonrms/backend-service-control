import { getRepository, getCustomRepository } from 'typeorm';

import OrderService from '../../models/OrderService';
import ProductRepository from '../../repositories/ProductRepository';

interface Request {
  name: string;
  product: string;
  quantity: number;
  price: number;
  paymentForm: string;
  description: string;
}

class CreateOrderService {
  public async execute({
    name,
    product,
    quantity,
    price,
    paymentForm,
    description,
  }: Request): Promise<OrderService> {
    const orderServiceRepository = getRepository(OrderService);

    const productRepository = getCustomRepository(ProductRepository);

    const findProduct = await productRepository.checkProduct(product);

    const orderService = await orderServiceRepository.create({
      name,
      product: findProduct,
      quantity,
      price,
      total: price * quantity,
      paymentForm,
      description,
    });

    await orderServiceRepository.save(orderService);

    return orderService;
  }
}

export default CreateOrderService;
