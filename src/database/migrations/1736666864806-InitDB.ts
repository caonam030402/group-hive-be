import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1736666864806 implements MigrationInterface {
  name = 'InitDB1736666864806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_438f09ab5b4bbcd27683eac2a5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_577fe4fc23363e9ba10c3203d5"`,
    );
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "groupId"`);
    await queryRunner.query(
      `ALTER TABLE "chats" ADD "chatType" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "chatType"`);
    await queryRunner.query(`ALTER TABLE "messages" ADD "groupId" uuid`);
    await queryRunner.query(
      `CREATE INDEX "IDX_577fe4fc23363e9ba10c3203d5" ON "messages" ("groupId", "sentAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_438f09ab5b4bbcd27683eac2a5" ON "messages" ("groupId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
