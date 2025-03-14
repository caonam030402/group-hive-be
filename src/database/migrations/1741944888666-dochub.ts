import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dochub1741944888666 implements MigrationInterface {
  name = 'Dochub1741944888666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pinned_docs_hub" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "pinned_docs_hub" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pinned_docs_hub" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pinned_docs_hub" DROP COLUMN "createdAt"`,
    );
  }
}
