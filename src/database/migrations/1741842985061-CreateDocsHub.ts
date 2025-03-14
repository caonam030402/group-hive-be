import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDocsHub1741842985061 implements MigrationInterface {
  name = 'CreateDocsHub1741842985061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permission_docs_hub" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" integer, CONSTRAINT "PK_23a5abdfc3a0a24b39590c7d753" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_docs_hub" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "docsHubId" uuid, CONSTRAINT "PK_d8542540e222a9c6147513e51d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "docs_hub" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "docsType" integer NOT NULL, "name" character varying, "content" bytea, "lastOpenedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" integer, "workspaceId" uuid, CONSTRAINT "PK_15c83f41a161eeb29489df398f7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_docs_hub" ADD CONSTRAINT "FK_c90c473eca5bff9ce66dbca8122" FOREIGN KEY ("docsHubId") REFERENCES "docs_hub"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "docs_hub" ADD CONSTRAINT "FK_cdab7697aa740e5bac76818756a" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "docs_hub" ADD CONSTRAINT "FK_c728ba31c6a8411c35fbde21f6e" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "docs_hub" DROP CONSTRAINT "FK_c728ba31c6a8411c35fbde21f6e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "docs_hub" DROP CONSTRAINT "FK_cdab7697aa740e5bac76818756a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_docs_hub" DROP CONSTRAINT "FK_c90c473eca5bff9ce66dbca8122"`,
    );
    await queryRunner.query(`DROP TABLE "docs_hub"`);
    await queryRunner.query(`DROP TABLE "user_docs_hub"`);
    await queryRunner.query(`DROP TABLE "permission_docs_hub"`);
  }
}
