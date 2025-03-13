import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDocsHub1741837430752 implements MigrationInterface {
    name = 'CreateDocsHub1741837430752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_docs_hub" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "docsHubId" uuid, CONSTRAINT "PK_d8542540e222a9c6147513e51d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_docs_hub" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "userDocsHubId" uuid, CONSTRAINT "PK_23a5abdfc3a0a24b39590c7d753" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_docs_hub" ADD CONSTRAINT "FK_c90c473eca5bff9ce66dbca8122" FOREIGN KEY ("docsHubId") REFERENCES "docs_hub"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_docs_hub" ADD CONSTRAINT "FK_4064d8d5d86d3d46f5b0105694b" FOREIGN KEY ("userDocsHubId") REFERENCES "user_docs_hub"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_docs_hub" DROP CONSTRAINT "FK_4064d8d5d86d3d46f5b0105694b"`);
        await queryRunner.query(`ALTER TABLE "user_docs_hub" DROP CONSTRAINT "FK_c90c473eca5bff9ce66dbca8122"`);
        await queryRunner.query(`DROP TABLE "permission_docs_hub"`);
        await queryRunner.query(`DROP TABLE "user_docs_hub"`);
    }

}
