import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDocsHub1741843319160 implements MigrationInterface {
  name = 'CreateDocsHub1741843319160';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_docs_hub" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user_docs_hub" ADD CONSTRAINT "FK_b2c3af32145c00594be53242f60" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_docs_hub" DROP CONSTRAINT "FK_b2c3af32145c00594be53242f60"`,
    );
    await queryRunner.query(`ALTER TABLE "user_docs_hub" DROP COLUMN "userId"`);
  }
}
