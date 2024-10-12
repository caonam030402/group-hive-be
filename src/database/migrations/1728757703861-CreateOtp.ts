import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOtp1728757703861 implements MigrationInterface {
  name = 'CreateOtp1728757703861';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "otp" ADD "expiresAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "expiresAt"`);
  }
}
