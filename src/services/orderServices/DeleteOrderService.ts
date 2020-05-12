import { getRepository } from 'typeorm';

import OrderService from '../../models/OrderService';
import AppError from '../../error/AppError';

class DeleteOrderServices {
  public async execute(id: string): Promise<void> {
    const orderRepository = getRepository(OrderService);

    const order = await orderRepository.findOne(id);

    if (!order) {
      throw new AppError('Order Service does not exists');
    }

    await orderRepository.remove(order);
  }
}

export default DeleteOrderServices;
