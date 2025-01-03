import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWorkspace1735885195768 implements MigrationInterface {
  name = 'CreateWorkspace1735885195768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workspaces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "industry" character varying NOT NULL, "size" character varying NOT NULL, "region" character varying NOT NULL, "description" character varying NOT NULL, "avatar" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "REL_77607c5b6af821ec294d33aab0" UNIQUE ("ownerId"), CONSTRAINT "PK_098656ae401f3e1a4586f47fd8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_77607c5b6af821ec294d33aab0c" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP CONSTRAINT "FK_77607c5b6af821ec294d33aab0c"`,
    );
    await queryRunner.query(`DROP TABLE "workspaces"`);
  }
}
