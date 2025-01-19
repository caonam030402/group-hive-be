import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1737003790833 implements MigrationInterface {
  name = 'InitDB1737003790833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invite-workspaces" ADD "workspaceId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite-workspaces" ADD CONSTRAINT "UQ_5d6b8e02003db1536593c56057d" UNIQUE ("workspaceId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite-workspaces" ADD CONSTRAINT "FK_5d6b8e02003db1536593c56057d" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invite-workspaces" DROP CONSTRAINT "FK_5d6b8e02003db1536593c56057d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite-workspaces" DROP CONSTRAINT "UQ_5d6b8e02003db1536593c56057d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite-workspaces" DROP COLUMN "workspaceId"`,
    );
  }
}
