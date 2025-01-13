import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInit1736734406086 implements MigrationInterface {
  name = 'CreateInit1736734406086';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "isVerified" integer, "avatar" character varying, "socialId" character varying, "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_75e2be4ce11d447ef43be0e374" UNIQUE ("photoId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_workspaces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer, "workspaceId" uuid, CONSTRAINT "PK_3c26b2f35801149e8f0af2e4fb0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workspaces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "industry" character varying NOT NULL, "size" character varying NOT NULL, "region" character varying NOT NULL, "description" character varying, "avatar" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_098656ae401f3e1a4586f47fd8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" integer, "expiresTime" integer NOT NULL, "expiresAt" TIMESTAMP, "numberOfSubmissions" integer, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_db724db1bc3d94ad5ba3851843" UNIQUE ("userId"), CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" integer NOT NULL, "content" character varying NOT NULL, "status" integer NOT NULL DEFAULT '1', "sentAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, "chatId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "chats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL DEFAULT 'private_chat', "chatType" integer NOT NULL DEFAULT '1', "avatar" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastMessageId" uuid, "workspaceId" uuid, CONSTRAINT "REL_5768a56bdd855c5b78ce66c9a3" UNIQUE ("lastMessageId"), CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "connected_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "socketId" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_509f0623b39c0c278ea0c063f3" UNIQUE ("userId"), CONSTRAINT "PK_fdd3395ee69c8b2ca474b3552f0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workspaces" ADD CONSTRAINT "FK_a9eab88a60b4f0314575d26ae47" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workspaces" ADD CONSTRAINT "FK_465cb7a34626136bc14f5405ba7" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_77607c5b6af821ec294d33aab0c" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "otp" ADD CONSTRAINT "FK_db724db1bc3d94ad5ba38518433" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" ADD CONSTRAINT "FK_5768a56bdd855c5b78ce66c9a37" FOREIGN KEY ("lastMessageId") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "connected_user" ADD CONSTRAINT "FK_509f0623b39c0c278ea0c063f35" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "connected_user" DROP CONSTRAINT "FK_509f0623b39c0c278ea0c063f35"`,
    );
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
      `ALTER TABLE "chats" DROP CONSTRAINT "FK_5768a56bdd855c5b78ce66c9a37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`,
    );
    await queryRunner.query(
      `ALTER TABLE "otp" DROP CONSTRAINT "FK_db724db1bc3d94ad5ba38518433"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP CONSTRAINT "FK_77607c5b6af821ec294d33aab0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workspaces" DROP CONSTRAINT "FK_465cb7a34626136bc14f5405ba7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workspaces" DROP CONSTRAINT "FK_a9eab88a60b4f0314575d26ae47"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(`DROP TABLE "connected_user"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_08c4d895f04a49b5360f42a377"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bf986dc7900663ca73ab642530"`,
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
    await queryRunner.query(`DROP TABLE "otp"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "workspaces"`);
    await queryRunner.query(`DROP TABLE "user_workspaces"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
