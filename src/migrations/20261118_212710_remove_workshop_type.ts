import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * `workshop` is no longer an event type; workshops are ordinary events now.
 * Existing rows are mapped to `event` before the enum is rebuilt. Postgres
 * cannot remove enum values, so the type is recreated.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE text;
   UPDATE "events" SET "type" = 'event' WHERE "type" = 'workshop';
   ALTER TABLE "events" ALTER COLUMN "type" SET DEFAULT 'event'::text;
   DROP TYPE "public"."enum_events_type";
   CREATE TYPE "public"."enum_events_type" AS ENUM('social', 'event', 'class');
   ALTER TABLE "events" ALTER COLUMN "type" SET DEFAULT 'event'::"public"."enum_events_type";
   ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE "public"."enum_events_type" USING "type"::"public"."enum_events_type";
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DATA TYPE text;
   UPDATE "_events_v" SET "version_type" = 'event' WHERE "version_type" = 'workshop';
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DEFAULT 'event'::text;
   DROP TYPE "public"."enum__events_v_version_type";
   CREATE TYPE "public"."enum__events_v_version_type" AS ENUM('social', 'event', 'class');
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DEFAULT 'event'::"public"."enum__events_v_version_type";
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DATA TYPE "public"."enum__events_v_version_type" USING "version_type"::"public"."enum__events_v_version_type";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE text;
   ALTER TABLE "events" ALTER COLUMN "type" SET DEFAULT 'event'::text;
   DROP TYPE "public"."enum_events_type";
   CREATE TYPE "public"."enum_events_type" AS ENUM('social', 'event', 'workshop', 'class');
   ALTER TABLE "events" ALTER COLUMN "type" SET DEFAULT 'event'::"public"."enum_events_type";
   ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE "public"."enum_events_type" USING "type"::"public"."enum_events_type";
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DATA TYPE text;
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DEFAULT 'event'::text;
   DROP TYPE "public"."enum__events_v_version_type";
   CREATE TYPE "public"."enum__events_v_version_type" AS ENUM('social', 'event', 'workshop', 'class');
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DEFAULT 'event'::"public"."enum__events_v_version_type";
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DATA TYPE "public"."enum__events_v_version_type" USING "version_type"::"public"."enum__events_v_version_type";`)
}
