import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldOtp1728840472899 implements MigrationInterface {
  name = 'AddFieldOtp1728840472899';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "otp" ADD "numberOfSubmissions" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "otp" DROP COLUMN "numberOfSubmissions"`,
    );
  }
}
