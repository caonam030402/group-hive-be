import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1736706692648 implements MigrationInterface {
  name = 'InitDB1736706692648';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "chats" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "chats" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
