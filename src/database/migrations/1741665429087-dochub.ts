import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dochub1741665429087 implements MigrationInterface {
  name = 'Dochub1741665429087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "docs_hub" ADD "content" bytea`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "docs_hub" DROP COLUMN "content"`);
  }
}
