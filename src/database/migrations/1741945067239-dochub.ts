import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dochub1741945067239 implements MigrationInterface {
  name = 'Dochub1741945067239';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pinned_docs_hub" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, "docsHubId" uuid, CONSTRAINT "PK_06c95c7df59e08be2735a3d9704" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pinned_docs_hub" ADD CONSTRAINT "FK_7bd254f3ef3bcc283591c767c88" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "pinned_docs_hub" DROP CONSTRAINT "FK_7bd254f3ef3bcc283591c767c88"`,
    );
    await queryRunner.query(`DROP TABLE "pinned_docs_hub"`);
  }
}
