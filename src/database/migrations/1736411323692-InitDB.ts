import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1736411323692 implements MigrationInterface {
  name = 'InitDB1736411323692';

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
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "isVerified" integer, "avatar" character varying, "socialId" character varying, "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_75e2be4ce11d447ef43be0e374" UNIQUE ("photoId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "workspaces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "industry" character varying NOT NULL, "size" character varying NOT NULL, "region" character varying NOT NULL, "description" character varying, "avatar" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_098656ae401f3e1a4586f47fd8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" integer, "expiresTime" integer NOT NULL, "expiresAt" TIMESTAMP, "numberOfSubmissions" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_db724db1bc3d94ad5ba3851843" UNIQUE ("userId"), CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer, "groupId" uuid, CONSTRAINT "PK_4644edf515e3c0b88e988522588" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."messages_type_enum" NOT NULL, "content" character varying NOT NULL, "status" "public"."messages_status_enum" NOT NULL DEFAULT 'sent', "sentAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "groupId" uuid, "chatId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4838cd4fc48a6ff2d4aa01aa64" ON "messages" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_438f09ab5b4bbcd27683eac2a5" ON "messages" ("groupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_36bc604c820bb9adc4c75cd411" ON "messages" ("chatId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f1f1283c5ab0dd8fc76deb1505" ON "messages" ("sentAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_577fe4fc23363e9ba10c3203d5" ON "messages" ("groupId", "sentAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e8c8c23efe5190bd43e419c8a5" ON "messages" ("chatId", "sentAt") `,
    );
    await queryRunner.query(
      `CREATE TABLE "chats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f63b5cc5bf67e5251f28301d7e" ON "chats" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_chats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "joinedAt" TIMESTAMP NOT NULL DEFAULT now(), "lastReadAt" TIMESTAMP, "isMuted" boolean NOT NULL DEFAULT false, "userId" integer, "chatId" uuid, CONSTRAINT "UQ_890d4de9219d57143c5a1d49743" UNIQUE ("userId", "chatId"), CONSTRAINT "PK_37f492184a99167c6fe190fd4fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_08c4d895f04a49b5360f42a377" ON "users_chats" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf986dc7900663ca73ab642530" ON "users_chats" ("chatId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2ce81392a18ec27a31a01aa781" ON "users_chats" ("userId", "lastReadAt") `,
    );
    await queryRunner.query(
      `CREATE TABLE "connectedUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "socketId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_f7b787b4f9a3bcc33570a91754" UNIQUE ("userId"), CONSTRAINT "PK_1f3f4831add6fa13c0452027567" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_workspace" ("workspacesId" uuid NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_b13c6d31b2002d8606106c44bde" PRIMARY KEY ("workspacesId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0f463ff0b11dff7d77e287db2b" ON "user_workspace" ("workspacesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4ea12fabb12c08c3dc8839d093" ON "user_workspace" ("userId") `,
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
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_77607c5b6af821ec294d33aab0c" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "otp" ADD CONSTRAINT "FK_db724db1bc3d94ad5ba38518433" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups" ADD CONSTRAINT "FK_682de41e20f223092c7353974b7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups" ADD CONSTRAINT "FK_71c149feea5a44f7ff77a10d463" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chats" ADD CONSTRAINT "FK_08c4d895f04a49b5360f42a3777" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chats" ADD CONSTRAINT "FK_bf986dc7900663ca73ab6425300" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "connectedUser" ADD CONSTRAINT "FK_f7b787b4f9a3bcc33570a91754b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workspace" ADD CONSTRAINT "FK_0f463ff0b11dff7d77e287db2bf" FOREIGN KEY ("workspacesId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workspace" ADD CONSTRAINT "FK_4ea12fabb12c08c3dc8839d0932" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_workspace" DROP CONSTRAINT "FK_4ea12fabb12c08c3dc8839d0932"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workspace" DROP CONSTRAINT "FK_0f463ff0b11dff7d77e287db2bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "connectedUser" DROP CONSTRAINT "FK_f7b787b4f9a3bcc33570a91754b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chats" DROP CONSTRAINT "FK_bf986dc7900663ca73ab6425300"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chats" DROP CONSTRAINT "FK_08c4d895f04a49b5360f42a3777"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups" DROP CONSTRAINT "FK_71c149feea5a44f7ff77a10d463"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups" DROP CONSTRAINT "FK_682de41e20f223092c7353974b7"`,
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
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4ea12fabb12c08c3dc8839d093"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0f463ff0b11dff7d77e287db2b"`,
    );
    await queryRunner.query(`DROP TABLE "user_workspace"`);
    await queryRunner.query(`DROP TABLE "connectedUser"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2ce81392a18ec27a31a01aa781"`,
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
      `DROP INDEX "public"."IDX_577fe4fc23363e9ba10c3203d5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f1f1283c5ab0dd8fc76deb1505"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_36bc604c820bb9adc4c75cd411"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_438f09ab5b4bbcd27683eac2a5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4838cd4fc48a6ff2d4aa01aa64"`,
    );
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "users_groups"`);
    await queryRunner.query(`DROP TABLE "groups"`);
    await queryRunner.query(`DROP TABLE "otp"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "workspaces"`);
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
