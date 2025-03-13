import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDocsHub1741839367460 implements MigrationInterface {
    name = 'CreateDocsHub1741839367460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_docs_hub" DROP CONSTRAINT "FK_4064d8d5d86d3d46f5b0105694b"`);
        await queryRunner.query(`ALTER TABLE "permission_docs_hub" DROP COLUMN "userDocsHubId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_docs_hub" ADD "userDocsHubId" uuid`);
        await queryRunner.query(`ALTER TABLE "permission_docs_hub" ADD CONSTRAINT "FK_4064d8d5d86d3d46f5b0105694b" FOREIGN KEY ("userDocsHubId") REFERENCES "user_docs_hub"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
