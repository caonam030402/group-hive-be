import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInit1736237421517 implements MigrationInterface {
  name = 'CreateInit1736237421517';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "connectedUser" DROP COLUMN "socketId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "connectedUser" ADD "socketId" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "connectedUser" DROP COLUMN "socketId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "connectedUser" ADD "socketId" integer NOT NULL`,
    );
  }
}
