import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dochub1741946201289 implements MigrationInterface {
  name = 'Dochub1741946201289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pinned_docs_hub" DROP CONSTRAINT "FK_cdcc33757393f2ed10642949fa3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pinned_docs_hub" ADD CONSTRAINT "UQ_cdcc33757393f2ed10642949fa3" UNIQUE ("docsHubId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "pinned_docs_hub" ADD CONSTRAINT "FK_cdcc33757393f2ed10642949fa3" FOREIGN KEY ("docsHubId") REFERENCES "docs_hub"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pinned_docs_hub" DROP CONSTRAINT "FK_cdcc33757393f2ed10642949fa3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pinned_docs_hub" DROP CONSTRAINT "UQ_cdcc33757393f2ed10642949fa3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pinned_docs_hub" ADD CONSTRAINT "FK_cdcc33757393f2ed10642949fa3" FOREIGN KEY ("docsHubId") REFERENCES "docs_hub"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
