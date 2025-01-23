import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1737652511312 implements MigrationInterface {
  name = 'InitDB1737652511312';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_workspaces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer, "workspaceId" uuid, CONSTRAINT "PK_3c26b2f35801149e8f0af2e4fb0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workspaces" ADD CONSTRAINT "FK_a9eab88a60b4f0314575d26ae47" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workspaces" ADD CONSTRAINT "FK_465cb7a34626136bc14f5405ba7" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_workspaces" DROP CONSTRAINT "FK_465cb7a34626136bc14f5405ba7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workspaces" DROP CONSTRAINT "FK_a9eab88a60b4f0314575d26ae47"`,
    );
    await queryRunner.query(`DROP TABLE "user_workspaces"`);
  }
}
