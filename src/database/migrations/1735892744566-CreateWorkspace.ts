import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWorkspace1735892744566 implements MigrationInterface {
  name = 'CreateWorkspace1735892744566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspaces" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ALTER COLUMN "avatar" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspaces" ALTER COLUMN "avatar" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ALTER COLUMN "description" SET NOT NULL`,
    );
  }
}
