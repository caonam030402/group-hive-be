import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDocsHub1741861765999 implements MigrationInterface {
  name = 'CreateDocsHub1741861765999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "docs_hub" ADD "scope" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "docs_hub" DROP COLUMN "scope"`);
  }
}
