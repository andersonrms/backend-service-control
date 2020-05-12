import { EntityRepository, Repository } from 'typeorm';

import Product from '../models/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async checkProduct(name: string): Promise<Product> {
    const findProduct = await this.findOne({
      where: { name },
    });

    if (findProduct) return findProduct;

    const product = this.create({
      name,
    });

    await this.save(product);

    return product;
  }
}

export default ProductRepository;
