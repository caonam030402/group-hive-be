import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1736655063187 implements MigrationInterface {
  name = 'InitDB1736655063187';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP CONSTRAINT "FK_dc53b3d0b16419a8f5f17458403"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP CONSTRAINT "FK_2557bb69821e2172713c6710a8e"`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_workspaces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer, "workspaceId" uuid, CONSTRAINT "PK_3c26b2f35801149e8f0af2e4fb0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP COLUMN "workspaceId"`,
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
    await queryRunner.query(`ALTER TABLE "workspaces" ADD "workspaceId" uuid`);
    await queryRunner.query(`ALTER TABLE "workspaces" ADD "userId" integer`);
    await queryRunner.query(`DROP TABLE "user_workspaces"`);
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_2557bb69821e2172713c6710a8e" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_dc53b3d0b16419a8f5f17458403" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
