import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dochub1741156491672 implements MigrationInterface {
  name = 'Dochub1741156491672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "docs_hub" ADD "docsType" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "docs_hub" ADD "name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "docs_hub" ADD "lastOpenedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "docs_hub" ADD "authorId" integer`);
    await queryRunner.query(
      `ALTER TABLE "docs_hub" ADD CONSTRAINT "FK_cdab7697aa740e5bac76818756a" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "docs_hub" DROP CONSTRAINT "FK_cdab7697aa740e5bac76818756a"`,
    );
    await queryRunner.query(`ALTER TABLE "docs_hub" DROP COLUMN "authorId"`);
    await queryRunner.query(
      `ALTER TABLE "docs_hub" DROP COLUMN "lastOpenedAt"`,
    );
    await queryRunner.query(`ALTER TABLE "docs_hub" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "docs_hub" DROP COLUMN "docsType"`);
  }
}
