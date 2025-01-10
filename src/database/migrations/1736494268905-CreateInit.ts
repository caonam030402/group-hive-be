import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInit1736494268905 implements MigrationInterface {
  name = 'CreateInit1736494268905';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chats" ALTER COLUMN "name" SET DEFAULT 'private_chat'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chats" ALTER COLUMN "name" DROP DEFAULT`,
    );
  }
}
