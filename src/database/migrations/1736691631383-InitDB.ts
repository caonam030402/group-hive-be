import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1736691631383 implements MigrationInterface {
  name = 'InitDB1736691631383';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chats" ADD "lastMessageId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "chats" ADD CONSTRAINT "UQ_5768a56bdd855c5b78ce66c9a37" UNIQUE ("lastMessageId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" ADD CONSTRAINT "FK_5768a56bdd855c5b78ce66c9a37" FOREIGN KEY ("lastMessageId") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chats" DROP CONSTRAINT "FK_5768a56bdd855c5b78ce66c9a37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" DROP CONSTRAINT "UQ_5768a56bdd855c5b78ce66c9a37"`,
    );
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "lastMessageId"`);
  }
}
