import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1736707129652 implements MigrationInterface {
  name = 'InitDB1736707129652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e8c8c23efe5190bd43e419c8a5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f1f1283c5ab0dd8fc76deb1505"`,
    );
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "sentAt"`);
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "sentAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "chats" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "otp" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "otp" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "connected_user" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "connected_user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "connected_user" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "connected_user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f1f1283c5ab0dd8fc76deb1505" ON "messages" ("sentAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e8c8c23efe5190bd43e419c8a5" ON "messages" ("chatId", "sentAt") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e8c8c23efe5190bd43e419c8a5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f1f1283c5ab0dd8fc76deb1505"`,
    );
    await queryRunner.query(
      `ALTER TABLE "connected_user" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "connected_user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "connected_user" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "connected_user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "otp" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "otp" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "chats" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "sentAt"`);
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "sentAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f1f1283c5ab0dd8fc76deb1505" ON "messages" ("sentAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e8c8c23efe5190bd43e419c8a5" ON "messages" ("chatId", "sentAt") `,
    );
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
