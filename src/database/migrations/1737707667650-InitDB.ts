import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1737707667650 implements MigrationInterface {
    name = 'InitDB1737707667650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspaces" ADD "quantityMembers" integer DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "quantityMembers"`);
    }

}
