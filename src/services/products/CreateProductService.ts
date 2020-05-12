import { getRepository } from 'typeorm';

import Product from '../../models/Product';
import AppError from '../../error/AppError';

interface Request {
  name: string;
}

class CreateProductService {
  public async execute({ name }: Request): Promise<Product> {
    const productsReposiroty = getRepository(Product);

    const checkProductExists = await productsReposiroty.findOne({
      where: { name },
    });

    if (checkProductExists) {
      throw new AppError('Product already exists');
    }

    const product = productsReposiroty.create({ name });

    await productsReposiroty.save(product);

    return product;
  }
}

export default CreateProductService;
