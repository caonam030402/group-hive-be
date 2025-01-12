import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1736705074660 implements MigrationInterface {
  name = 'InitDB1736705074660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET TIMEZONE = 'UTC'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET TIMEZONE = 'UTC'`);
  }
}
