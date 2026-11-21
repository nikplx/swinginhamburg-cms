import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE text;
  -- The 'system' role is removed; demote any remaining system users before the cast.
  UPDATE "users" SET "role" = 'guest' WHERE "role" = 'system';
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'guest'::text;
  DROP TYPE "public"."enum_users_role";
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'writer', 'school', 'guest');
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'guest'::"public"."enum_users_role";
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."enum_users_role" USING "role"::"public"."enum_users_role";
  ALTER TABLE "events" DROP COLUMN "last_confirmed";
  ALTER TABLE "_events_v" DROP COLUMN "version_last_confirmed";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_users_role" ADD VALUE 'system' BEFORE 'admin';
  ALTER TABLE "events" ADD COLUMN "last_confirmed" timestamp(3) with time zone;
  ALTER TABLE "_events_v" ADD COLUMN "version_last_confirmed" timestamp(3) with time zone;`)
}
