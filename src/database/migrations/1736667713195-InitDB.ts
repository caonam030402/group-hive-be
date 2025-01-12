import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1736667713195 implements MigrationInterface {
  name = 'InitDB1736667713195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chats" ADD "workspaceId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "chats" ADD CONSTRAINT "FK_50548018aed753ac0fc9774f771" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chats" DROP CONSTRAINT "FK_50548018aed753ac0fc9774f771"`,
    );
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "workspaceId"`);
  }
}
