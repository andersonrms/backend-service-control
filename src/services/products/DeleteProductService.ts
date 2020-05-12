import { getRepository } from 'typeorm';

import Product from '../../models/Product';
import AppError from '../../error/AppError';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productRepository = getRepository(Product);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product does not exists');
    }

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
