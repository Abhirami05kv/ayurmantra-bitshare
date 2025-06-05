import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategoryTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE category (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE category`);
  }
}
