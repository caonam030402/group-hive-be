import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIsVerify1730309501382 implements MigrationInterface {
  name = 'CreateIsVerify1730309501382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" boolean`);
  }
}
