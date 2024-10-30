import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIsVerify1730306933108 implements MigrationInterface {
  name = 'CreateIsVerify1730306933108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" boolean`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
  }
}
