import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1736670210339 implements MigrationInterface {
  name = 'InitDB1736670210339';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" integer NOT NULL, "content" character varying NOT NULL, "status" integer NOT NULL DEFAULT '1', "sentAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "chatId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4838cd4fc48a6ff2d4aa01aa64" ON "messages" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_36bc604c820bb9adc4c75cd411" ON "messages" ("chatId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f1f1283c5ab0dd8fc76deb1505" ON "messages" ("sentAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e8c8c23efe5190bd43e419c8a5" ON "messages" ("chatId", "sentAt") `,
    );
    await queryRunner.query(
      `CREATE TABLE "chats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL DEFAULT 'private_chat', "chatType" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workspaceId" uuid, CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f63b5cc5bf67e5251f28301d7e" ON "chats" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_chats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer, "chatId" uuid, CONSTRAINT "UQ_890d4de9219d57143c5a1d49743" UNIQUE ("userId", "chatId"), CONSTRAINT "PK_37f492184a99167c6fe190fd4fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_08c4d895f04a49b5360f42a377" ON "users_chats" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf986dc7900663ca73ab642530" ON "users_chats" ("chatId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" ADD CONSTRAINT "FK_50548018aed753ac0fc9774f771" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chats" ADD CONSTRAINT "FK_08c4d895f04a49b5360f42a3777" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chats" ADD CONSTRAINT "FK_bf986dc7900663ca73ab6425300" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_chats" DROP CONSTRAINT "FK_bf986dc7900663ca73ab6425300"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chats" DROP CONSTRAINT "FK_08c4d895f04a49b5360f42a3777"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" DROP CONSTRAINT "FK_50548018aed753ac0fc9774f771"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_08c4d895f04a49b5360f42a377"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bf986dc7900663ca73ab642530"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_08c4d895f04a49b5360f42a377"`,
    );
    await queryRunner.query(`DROP TABLE "users_chats"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f63b5cc5bf67e5251f28301d7e"`,
    );
    await queryRunner.query(`DROP TABLE "chats"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e8c8c23efe5190bd43e419c8a5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f1f1283c5ab0dd8fc76deb1505"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_36bc604c820bb9adc4c75cd411"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4838cd4fc48a6ff2d4aa01aa64"`,
    );
    await queryRunner.query(`DROP TABLE "messages"`);
  }
}
