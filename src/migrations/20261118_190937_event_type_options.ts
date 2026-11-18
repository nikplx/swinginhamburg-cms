import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Event types are reduced to social/event/workshop/class, with `event` as the
 * new default. Existing rows with a removed type (talk, walk, festival, other)
 * are mapped to `event` before the enum is recreated. Postgres cannot drop enum
 * values, hence the text -> new type dance.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE text;
   UPDATE "events" SET "type" = 'event' WHERE "type" NOT IN ('social', 'event', 'workshop', 'class');
   ALTER TABLE "events" ALTER COLUMN "type" SET DEFAULT 'event'::text;
   DROP TYPE "public"."enum_events_type";
   CREATE TYPE "public"."enum_events_type" AS ENUM('social', 'event', 'workshop', 'class');
   ALTER TABLE "events" ALTER COLUMN "type" SET DEFAULT 'event'::"public"."enum_events_type";
   ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE "public"."enum_events_type" USING "type"::"public"."enum_events_type";
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DATA TYPE text;
   UPDATE "_events_v" SET "version_type" = 'event' WHERE "version_type" NOT IN ('social', 'event', 'workshop', 'class');
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DEFAULT 'event'::text;
   DROP TYPE "public"."enum__events_v_version_type";
   CREATE TYPE "public"."enum__events_v_version_type" AS ENUM('social', 'event', 'workshop', 'class');
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DEFAULT 'event'::"public"."enum__events_v_version_type";
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DATA TYPE "public"."enum__events_v_version_type" USING "version_type"::"public"."enum__events_v_version_type";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE text;
   UPDATE "events" SET "type" = 'other' WHERE "type" = 'event';
   DROP TYPE "public"."enum_events_type";
   CREATE TYPE "public"."enum_events_type" AS ENUM('class', 'social', 'workshop', 'talk', 'walk', 'festival', 'other');
   ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE "public"."enum_events_type" USING "type"::"public"."enum_events_type";
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DATA TYPE text;
   UPDATE "_events_v" SET "version_type" = 'other' WHERE "version_type" = 'event';
   DROP TYPE "public"."enum__events_v_version_type";
   CREATE TYPE "public"."enum__events_v_version_type" AS ENUM('class', 'social', 'workshop', 'talk', 'walk', 'festival', 'other');
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" SET DATA TYPE "public"."enum__events_v_version_type" USING "version_type"::"public"."enum__events_v_version_type";
   ALTER TABLE "events" ALTER COLUMN "type" DROP DEFAULT;
   ALTER TABLE "_events_v" ALTER COLUMN "version_type" DROP DEFAULT;`)
}
