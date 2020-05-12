import { getRepository } from 'typeorm';

import Product from '../../models/Product';
import AppError from '../../error/AppError';

interface Request {
  id: string;
  name: string;
}

class UpdateProductService {
  public async execute({ id, name }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);

    const findProduct = productsRepository.findOne(id);

    if (!findProduct) {
      throw new AppError('Product does not exists');
    }

    const product = productsRepository.create({
      id,
      name,
    });

    await productsRepository.update({ id }, { name });

    return product;
  }
}

export default UpdateProductService;
