import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1736055818662 implements MigrationInterface {
  name = 'UpdateUser1736055818662';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "avatar" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
  }
}
