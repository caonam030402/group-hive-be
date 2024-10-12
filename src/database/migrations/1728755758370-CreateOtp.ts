import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOtp1728755758370 implements MigrationInterface {
  name = 'CreateOtp1728755758370';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "otp" RENAME COLUMN "expiresAt" TO "expiresTime"`,
    );
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "expiresTime"`);
    await queryRunner.query(
      `ALTER TABLE "otp" ADD "expiresTime" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "expiresTime"`);
    await queryRunner.query(
      `ALTER TABLE "otp" ADD "expiresTime" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "otp" RENAME COLUMN "expiresTime" TO "expiresAt"`,
    );
  }
}
