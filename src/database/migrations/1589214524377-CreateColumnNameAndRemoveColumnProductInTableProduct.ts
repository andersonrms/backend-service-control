import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateColumnNameAndRemoveColumnProductInTableProduct1589214524377
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'product');

    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'name',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'name');

    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'product',
        type: 'varchar',
      }),
    );
  }
}
