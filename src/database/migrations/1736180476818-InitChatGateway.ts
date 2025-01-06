import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitChatGateway1736180476818 implements MigrationInterface {
  name = 'InitChatGateway1736180476818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "connectedUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "socketId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_f7b787b4f9a3bcc33570a91754" UNIQUE ("userId"), CONSTRAINT "PK_1f3f4831add6fa13c0452027567" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "connectedUser" ADD CONSTRAINT "FK_f7b787b4f9a3bcc33570a91754b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "connectedUser" DROP CONSTRAINT "FK_f7b787b4f9a3bcc33570a91754b"`,
    );
    await queryRunner.query(`DROP TABLE "connectedUser"`);
  }
}
