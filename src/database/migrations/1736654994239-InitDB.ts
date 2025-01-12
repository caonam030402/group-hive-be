import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1736654994239 implements MigrationInterface {
  name = 'InitDB1736654994239';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workspaces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer, "workspaceId" uuid, CONSTRAINT "PK_098656ae401f3e1a4586f47fd8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP COLUMN "workspaceId"`,
    );
    await queryRunner.query(`ALTER TABLE "workspaces" ADD "userId" integer`);
    await queryRunner.query(`ALTER TABLE "workspaces" ADD "workspaceId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "industry" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "size" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "region" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "avatar" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "workspaces" ADD "ownerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_dc53b3d0b16419a8f5f17458403" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_2557bb69821e2172713c6710a8e" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_77607c5b6af821ec294d33aab0c" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP CONSTRAINT "FK_77607c5b6af821ec294d33aab0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP CONSTRAINT "FK_2557bb69821e2172713c6710a8e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP CONSTRAINT "FK_dc53b3d0b16419a8f5f17458403"`,
    );
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "ownerId"`);
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "avatar"`);
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP COLUMN "description"`,
    );
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "region"`);
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "size"`);
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "industry"`);
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP COLUMN "workspaceId"`,
    );
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "workspaces" ADD "workspaceId" uuid`);
    await queryRunner.query(`ALTER TABLE "workspaces" ADD "userId" integer`);
    await queryRunner.query(`DROP TABLE "workspaces"`);
  }
}
