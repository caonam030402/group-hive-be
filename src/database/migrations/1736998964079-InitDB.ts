import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1736998964079 implements MigrationInterface {
  name = 'InitDB1736998964079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chats" DROP CONSTRAINT "FK_5768a56bdd855c5b78ce66c9a37"`,
    );
    await queryRunner.query(
      `CREATE TABLE "invite-workspaces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "inviteCode" character varying, "link" character varying, "expiredAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9ce04698c7431ce166e404b8b89" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP COLUMN "inviteCode"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" DROP CONSTRAINT "REL_5768a56bdd855c5b78ce66c9a3"`,
    );
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "lastMessageId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chats" ADD "lastMessageId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "chats" ADD CONSTRAINT "REL_5768a56bdd855c5b78ce66c9a3" UNIQUE ("lastMessageId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "inviteCode" character varying`,
    );
    await queryRunner.query(`DROP TABLE "invite-workspaces"`);
    await queryRunner.query(
      `ALTER TABLE "chats" ADD CONSTRAINT "FK_5768a56bdd855c5b78ce66c9a37" FOREIGN KEY ("lastMessageId") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
