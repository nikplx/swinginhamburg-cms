import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * From the production schema on `main` (classes / schools / teachers,
 * Workshop/Social events) to the unified events model.
 *
 * Kept: users (the `system` role becomes `guest`), all globals, media, dance
 * styles (a slug is added), and every event: title, type, descriptions,
 * dances and venue stay; the old start/end become a schedule; all events get
 * the placeholder organizer "Noch nicht zugeordnet". Schools become
 * organizations (same ids; the owner becomes a linked member, the website a
 * link).
 *
 * Dropped: classes, teachers, and the event fields price, url, background
 * image and the "cancelled" text.
 *
 * Steps: (1) copy what the schema change destroys into _mig_* tables,
 * (2) Payload's generated schema change with three data fixes inline,
 * (3) rebuild schools/events from the copies, (4) re-save every event through
 * Payload so its hooks derive firstDate/lastDate and create the first version.
 *
 * `down` only restores the old schema, not the converted data: roll back by
 * restoring the pre-deploy backup.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // (1) Copies of what the schema change below destroys.
  await db.execute(sql`
  CREATE TABLE "_mig_schools" AS SELECT "id", "name", "website", "owner_id" FROM "schools";
  CREATE TABLE "_mig_schools_locales" AS SELECT "_parent_id", "_locale", "description" FROM "schools_locales";
  CREATE TABLE "_mig_events" AS
    SELECT "id",
           ("start_date" AT TIME ZONE 'Europe/Berlin')::date AS "start_day",
           ("end_date" AT TIME ZONE 'Europe/Berlin')::date AS "end_day",
           NULLIF(btrim("start_time"), '') AS "start_time",
           NULLIF(btrim("end_time"), '') AS "end_time",
           NULLIF(btrim("address"), '') AS "address",
           ST_Y("location"::geometry) AS "lat",
           ST_X("location"::geometry) AS "lng"
    FROM "events";`)

  // (2) Generated schema change (data fixes marked "migration:").
  await db.execute(sql`
   CREATE TYPE "public"."enum_events_blocks_recurring_weekdays" AS ENUM('MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU');
  CREATE TYPE "public"."enum_events_blocks_recurring_frequency" AS ENUM('weekly', 'monthly');
  CREATE TYPE "public"."enum_events_blocks_recurring_monthly_mode" AS ENUM('dayOfMonth', 'nthWeekday');
  CREATE TYPE "public"."enum_events_blocks_recurring_nth_weekday" AS ENUM('1', '2', '3', '4', '-1');
  CREATE TYPE "public"."enum_events_blocks_recurring_weekday" AS ENUM('MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU');
  CREATE TYPE "public"."enum_events_blocks_recurring_end_mode" AS ENUM('never', 'until', 'count');
  CREATE TYPE "public"."enum_events_blocks_course_weekday" AS ENUM('MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU');
  CREATE TYPE "public"."enum_events_level" AS ENUM('all', 'beginner', 'intermediate', 'advanced', 'open');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_blocks_recurring_weekdays" AS ENUM('MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU');
  CREATE TYPE "public"."enum__events_v_blocks_recurring_frequency" AS ENUM('weekly', 'monthly');
  CREATE TYPE "public"."enum__events_v_blocks_recurring_monthly_mode" AS ENUM('dayOfMonth', 'nthWeekday');
  CREATE TYPE "public"."enum__events_v_blocks_recurring_nth_weekday" AS ENUM('1', '2', '3', '4', '-1');
  CREATE TYPE "public"."enum__events_v_blocks_recurring_weekday" AS ENUM('MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU');
  CREATE TYPE "public"."enum__events_v_blocks_recurring_end_mode" AS ENUM('never', 'until', 'count');
  CREATE TYPE "public"."enum__events_v_blocks_course_weekday" AS ENUM('MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU');
  CREATE TYPE "public"."enum__events_v_version_type" AS ENUM('social', 'event', 'class');
  CREATE TYPE "public"."enum__events_v_version_level" AS ENUM('all', 'beginner', 'intermediate', 'advanced', 'open');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_published_locale" AS ENUM('en', 'de');
  CREATE TYPE "public"."enum_organizations_kind" AS ENUM('school', 'association', 'individual', 'other');
  CREATE TABLE "events_blocks_once" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"start_time" varchar,
  	"end_time" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_dates_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"start_time" varchar,
  	"end_time" varchar
  );
  
  CREATE TABLE "events_blocks_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_recurring_weekdays" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_events_blocks_recurring_weekdays",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "events_blocks_recurring" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"frequency" "enum_events_blocks_recurring_frequency" DEFAULT 'weekly',
  	"interval" numeric DEFAULT 1,
  	"monthly_mode" "enum_events_blocks_recurring_monthly_mode" DEFAULT 'dayOfMonth',
  	"day_of_month" numeric,
  	"nth_weekday" "enum_events_blocks_recurring_nth_weekday",
  	"weekday" "enum_events_blocks_recurring_weekday",
  	"start_date" timestamp(3) with time zone,
  	"start_time" varchar,
  	"end_time" varchar,
  	"end_mode" "enum_events_blocks_recurring_end_mode" DEFAULT 'never',
  	"until" timestamp(3) with time zone,
  	"count" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_course_skip_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone
  );
  
  CREATE TABLE "events_blocks_course" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"start_date" timestamp(3) with time zone,
  	"weekday" "enum_events_blocks_course_weekday",
  	"start_time" varchar,
  	"end_time" varchar,
  	"sessions" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_once" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"start_time" varchar,
  	"end_time" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_dates_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"start_time" varchar,
  	"end_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_blocks_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_recurring_weekdays" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__events_v_blocks_recurring_weekdays",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_events_v_blocks_recurring" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"frequency" "enum__events_v_blocks_recurring_frequency" DEFAULT 'weekly',
  	"interval" numeric DEFAULT 1,
  	"monthly_mode" "enum__events_v_blocks_recurring_monthly_mode" DEFAULT 'dayOfMonth',
  	"day_of_month" numeric,
  	"nth_weekday" "enum__events_v_blocks_recurring_nth_weekday",
  	"weekday" "enum__events_v_blocks_recurring_weekday",
  	"start_date" timestamp(3) with time zone,
  	"start_time" varchar,
  	"end_time" varchar,
  	"end_mode" "enum__events_v_blocks_recurring_end_mode" DEFAULT 'never',
  	"until" timestamp(3) with time zone,
  	"count" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_course_skip_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_blocks_course" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"start_date" timestamp(3) with time zone,
  	"weekday" "enum__events_v_blocks_course_weekday",
  	"start_time" varchar,
  	"end_time" varchar,
  	"sessions" numeric DEFAULT 6,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_type" "enum__events_v_version_type" DEFAULT 'event',
  	"version_level" "enum__events_v_version_level",
  	"version_location_name" varchar,
  	"version_location_street" varchar,
  	"version_location_house_number" varchar,
  	"version_location_postcode" varchar,
  	"version_location_city" varchar,
  	"version_location_district" varchar,
  	"version_location_address" varchar,
  	"version_location_lat" numeric,
  	"version_location_lng" numeric,
  	"version_location_directions_note" varchar,
  	"version_exceptions" jsonb,
  	"version_first_date" timestamp(3) with time zone,
  	"version_last_date" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__events_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_events_v_locales" (
  	"version_description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_events_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"organizations_id" integer,
  	"dances_id" integer
  );
  
  CREATE TABLE "organizations_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "organizations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kind" "enum_organizations_kind" DEFAULT 'school' NOT NULL,
  	"default_location_name" varchar,
  	"default_location_street" varchar,
  	"default_location_house_number" varchar,
  	"default_location_postcode" varchar,
  	"default_location_city" varchar,
  	"default_location_district" varchar,
  	"default_location_address" varchar,
  	"default_location_lat" numeric,
  	"default_location_lng" numeric,
  	"default_location_directions_note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "organizations_locales" (
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "organizations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  ALTER TABLE "classes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "classes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "classes_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schools" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schools_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schools_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "teachers" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "classes" CASCADE;
  DROP TABLE "classes_locales" CASCADE;
  DROP TABLE "classes_rels" CASCADE;
  DROP TABLE "schools" CASCADE;
  DROP TABLE "schools_locales" CASCADE;
  DROP TABLE "schools_rels" CASCADE;
  DROP TABLE "teachers" CASCADE;
  ALTER TABLE "events" DROP CONSTRAINT "events_background_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_classes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_schools_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_teachers_fk";
  
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE text;
  -- migration: the system role no longer exists.
  UPDATE "users" SET "role" = 'guest' WHERE "role" = 'system';
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'guest'::text;
  DROP TYPE "public"."enum_users_role";
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'writer', 'school', 'guest');
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'guest'::"public"."enum_users_role";
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."enum_users_role" USING "role"::"public"."enum_users_role";
  ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE text;
  -- migration: Workshop -> event, Social -> social.
  UPDATE "events" SET "type" = CASE "type" WHEN 'Social' THEN 'social' ELSE 'event' END;
  ALTER TABLE "events" ALTER COLUMN "type" SET DEFAULT 'event'::text;
  DROP TYPE "public"."enum_events_type";
  CREATE TYPE "public"."enum_events_type" AS ENUM('social', 'event', 'class');
  ALTER TABLE "events" ALTER COLUMN "type" SET DEFAULT 'event'::"public"."enum_events_type";
  ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE "public"."enum_events_type" USING "type"::"public"."enum_events_type";
  DROP INDEX "events_background_image_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_classes_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_schools_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_teachers_id_idx";
  ALTER TABLE "events" ALTER COLUMN "type" DROP NOT NULL;
  ALTER TABLE "events" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "users" ADD COLUMN "reset_password_requested_at" timestamp(3) with time zone;
  -- migration: derive slugs from the short name ("Solo" -> "solo") before NOT NULL.
  ALTER TABLE "dances" ADD COLUMN "slug" varchar;
  UPDATE "dances" d SET "slug" = s."slug" FROM (
    SELECT "id", CASE WHEN row_number() OVER (PARTITION BY base ORDER BY "id") > 1 THEN base || '-' || "id" ELSE base END AS "slug"
    FROM (SELECT "id", COALESCE(NULLIF(btrim(regexp_replace(lower(
                 replace(replace(replace(replace(replace(replace(replace("short_name",
                   'Ä', 'ae'), 'Ö', 'oe'), 'Ü', 'ue'), 'ä', 'ae'), 'ö', 'oe'), 'ü', 'ue'), 'ß', 'ss')),
                 '[^a-z0-9]+', '-', 'g'), '-'), ''), 'dance-' || "id") AS base FROM "dances") b
  ) s WHERE d."id" = s."id";
  ALTER TABLE "dances" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "events" ADD COLUMN "level" "enum_events_level";
  ALTER TABLE "events" ADD COLUMN "location_street" varchar;
  ALTER TABLE "events" ADD COLUMN "location_house_number" varchar;
  ALTER TABLE "events" ADD COLUMN "location_postcode" varchar;
  ALTER TABLE "events" ADD COLUMN "location_city" varchar;
  ALTER TABLE "events" ADD COLUMN "location_district" varchar;
  ALTER TABLE "events" ADD COLUMN "location_address" varchar;
  ALTER TABLE "events" ADD COLUMN "location_lat" numeric;
  ALTER TABLE "events" ADD COLUMN "location_lng" numeric;
  ALTER TABLE "events" ADD COLUMN "location_directions_note" varchar;
  ALTER TABLE "events" ADD COLUMN "exceptions" jsonb;
  ALTER TABLE "events" ADD COLUMN "first_date" timestamp(3) with time zone;
  ALTER TABLE "events" ADD COLUMN "last_date" timestamp(3) with time zone;
  ALTER TABLE "events" ADD COLUMN "_status" "enum_events_status" DEFAULT 'draft';
  ALTER TABLE "events_rels" ADD COLUMN "organizations_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "organizations_id" integer;
  ALTER TABLE "events_blocks_once" ADD CONSTRAINT "events_blocks_once_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_dates_dates" ADD CONSTRAINT "events_blocks_dates_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_blocks_dates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_dates" ADD CONSTRAINT "events_blocks_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_recurring_weekdays" ADD CONSTRAINT "events_blocks_recurring_weekdays_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events_blocks_recurring"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_recurring" ADD CONSTRAINT "events_blocks_recurring_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_course_skip_dates" ADD CONSTRAINT "events_blocks_course_skip_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_blocks_course"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_course" ADD CONSTRAINT "events_blocks_course_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_once" ADD CONSTRAINT "_events_v_blocks_once_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_dates_dates" ADD CONSTRAINT "_events_v_blocks_dates_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_blocks_dates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_dates" ADD CONSTRAINT "_events_v_blocks_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_recurring_weekdays" ADD CONSTRAINT "_events_v_blocks_recurring_weekdays_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v_blocks_recurring"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_recurring" ADD CONSTRAINT "_events_v_blocks_recurring_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_course_skip_dates" ADD CONSTRAINT "_events_v_blocks_course_skip_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_blocks_course"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_course" ADD CONSTRAINT "_events_v_blocks_course_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_locales" ADD CONSTRAINT "_events_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_dances_fk" FOREIGN KEY ("dances_id") REFERENCES "public"."dances"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_links" ADD CONSTRAINT "organizations_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_locales" ADD CONSTRAINT "organizations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_blocks_once_order_idx" ON "events_blocks_once" USING btree ("_order");
  CREATE INDEX "events_blocks_once_parent_id_idx" ON "events_blocks_once" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_once_path_idx" ON "events_blocks_once" USING btree ("_path");
  CREATE INDEX "events_blocks_dates_dates_order_idx" ON "events_blocks_dates_dates" USING btree ("_order");
  CREATE INDEX "events_blocks_dates_dates_parent_id_idx" ON "events_blocks_dates_dates" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_dates_order_idx" ON "events_blocks_dates" USING btree ("_order");
  CREATE INDEX "events_blocks_dates_parent_id_idx" ON "events_blocks_dates" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_dates_path_idx" ON "events_blocks_dates" USING btree ("_path");
  CREATE INDEX "events_blocks_recurring_weekdays_order_idx" ON "events_blocks_recurring_weekdays" USING btree ("order");
  CREATE INDEX "events_blocks_recurring_weekdays_parent_idx" ON "events_blocks_recurring_weekdays" USING btree ("parent_id");
  CREATE INDEX "events_blocks_recurring_order_idx" ON "events_blocks_recurring" USING btree ("_order");
  CREATE INDEX "events_blocks_recurring_parent_id_idx" ON "events_blocks_recurring" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_recurring_path_idx" ON "events_blocks_recurring" USING btree ("_path");
  CREATE INDEX "events_blocks_course_skip_dates_order_idx" ON "events_blocks_course_skip_dates" USING btree ("_order");
  CREATE INDEX "events_blocks_course_skip_dates_parent_id_idx" ON "events_blocks_course_skip_dates" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_course_order_idx" ON "events_blocks_course" USING btree ("_order");
  CREATE INDEX "events_blocks_course_parent_id_idx" ON "events_blocks_course" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_course_path_idx" ON "events_blocks_course" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_once_order_idx" ON "_events_v_blocks_once" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_once_parent_id_idx" ON "_events_v_blocks_once" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_once_path_idx" ON "_events_v_blocks_once" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_dates_dates_order_idx" ON "_events_v_blocks_dates_dates" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_dates_dates_parent_id_idx" ON "_events_v_blocks_dates_dates" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_dates_order_idx" ON "_events_v_blocks_dates" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_dates_parent_id_idx" ON "_events_v_blocks_dates" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_dates_path_idx" ON "_events_v_blocks_dates" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_recurring_weekdays_order_idx" ON "_events_v_blocks_recurring_weekdays" USING btree ("order");
  CREATE INDEX "_events_v_blocks_recurring_weekdays_parent_idx" ON "_events_v_blocks_recurring_weekdays" USING btree ("parent_id");
  CREATE INDEX "_events_v_blocks_recurring_order_idx" ON "_events_v_blocks_recurring" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_recurring_parent_id_idx" ON "_events_v_blocks_recurring" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_recurring_path_idx" ON "_events_v_blocks_recurring" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_course_skip_dates_order_idx" ON "_events_v_blocks_course_skip_dates" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_course_skip_dates_parent_id_idx" ON "_events_v_blocks_course_skip_dates" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_course_order_idx" ON "_events_v_blocks_course" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_course_parent_id_idx" ON "_events_v_blocks_course" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_course_path_idx" ON "_events_v_blocks_course" USING btree ("_path");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_type_idx" ON "_events_v" USING btree ("version_type");
  CREATE INDEX "_events_v_version_version_first_date_idx" ON "_events_v" USING btree ("version_first_date");
  CREATE INDEX "_events_v_version_version_last_date_idx" ON "_events_v" USING btree ("version_last_date");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_snapshot_idx" ON "_events_v" USING btree ("snapshot");
  CREATE INDEX "_events_v_published_locale_idx" ON "_events_v" USING btree ("published_locale");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_events_v_locales_locale_parent_id_unique" ON "_events_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_locales_parent_id_idx" ON "_events_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_events_v_rels_order_idx" ON "_events_v_rels" USING btree ("order");
  CREATE INDEX "_events_v_rels_parent_idx" ON "_events_v_rels" USING btree ("parent_id");
  CREATE INDEX "_events_v_rels_path_idx" ON "_events_v_rels" USING btree ("path");
  CREATE INDEX "_events_v_rels_organizations_id_idx" ON "_events_v_rels" USING btree ("organizations_id");
  CREATE INDEX "_events_v_rels_dances_id_idx" ON "_events_v_rels" USING btree ("dances_id");
  CREATE INDEX "organizations_links_order_idx" ON "organizations_links" USING btree ("_order");
  CREATE INDEX "organizations_links_parent_id_idx" ON "organizations_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "organizations_slug_idx" ON "organizations" USING btree ("slug");
  CREATE INDEX "organizations_updated_at_idx" ON "organizations" USING btree ("updated_at");
  CREATE INDEX "organizations_created_at_idx" ON "organizations" USING btree ("created_at");
  CREATE UNIQUE INDEX "organizations_locales_locale_parent_id_unique" ON "organizations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "organizations_locales_parent_id_idx" ON "organizations_locales" USING btree ("_parent_id");
  CREATE INDEX "organizations_rels_order_idx" ON "organizations_rels" USING btree ("order");
  CREATE INDEX "organizations_rels_parent_idx" ON "organizations_rels" USING btree ("parent_id");
  CREATE INDEX "organizations_rels_path_idx" ON "organizations_rels" USING btree ("path");
  CREATE INDEX "organizations_rels_users_id_idx" ON "organizations_rels" USING btree ("users_id");
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "dances_slug_idx" ON "dances" USING btree ("slug");
  CREATE INDEX "dances_locales_parent_id_idx" ON "dances_locales" USING btree ("_parent_id");
  CREATE INDEX "events_type_idx" ON "events" USING btree ("type");
  CREATE INDEX "events_first_date_idx" ON "events" USING btree ("first_date");
  CREATE INDEX "events_last_date_idx" ON "events" USING btree ("last_date");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "events_locales_parent_id_idx" ON "events_locales" USING btree ("_parent_id");
  CREATE INDEX "events_rels_organizations_id_idx" ON "events_rels" USING btree ("organizations_id");
  CREATE INDEX "payload_locked_documents_rels_organizations_id_idx" ON "payload_locked_documents_rels" USING btree ("organizations_id");
  CREATE INDEX "index_locales_parent_id_idx" ON "index_locales" USING btree ("_parent_id");
  CREATE INDEX "about_locales_parent_id_idx" ON "about_locales" USING btree ("_parent_id");
  CREATE INDEX "swing_locales_parent_id_idx" ON "swing_locales" USING btree ("_parent_id");
  CREATE INDEX "schools_global_locales_parent_id_idx" ON "schools_global_locales" USING btree ("_parent_id");
  ALTER TABLE "events" DROP COLUMN "start_date";
  ALTER TABLE "events" DROP COLUMN "start_time";
  ALTER TABLE "events" DROP COLUMN "end_date";
  ALTER TABLE "events" DROP COLUMN "end_time";
  ALTER TABLE "events" DROP COLUMN "price";
  ALTER TABLE "events" DROP COLUMN "url";
  ALTER TABLE "events" DROP COLUMN "background_image_id";
  ALTER TABLE "events" DROP COLUMN "address";
  ALTER TABLE "events" DROP COLUMN "location";
  ALTER TABLE "events_locales" DROP COLUMN "cancelled";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "classes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "schools_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "teachers_id";
  DROP TYPE "public"."enum_classes_weekday";`)

  // (3a) Schools -> organizations (same ids), plus the placeholder organizer.
  await db.execute(sql`
  INSERT INTO "organizations" ("id", "name", "slug", "kind", "updated_at", "created_at")
  SELECT "id", "name",
         CASE WHEN row_number() OVER (PARTITION BY base ORDER BY "id") > 1 THEN base || '-' || "id" ELSE base END,
         'school', now(), now()
  FROM (SELECT "id", "name", COALESCE(NULLIF(btrim(regexp_replace(lower(
               replace(replace(replace(replace(replace(replace(replace("name",
                 'Ä', 'ae'), 'Ö', 'oe'), 'Ü', 'ue'), 'ä', 'ae'), 'ö', 'oe'), 'ü', 'ue'), 'ß', 'ss')),
               '[^a-z0-9]+', '-', 'g'), '-'), ''), 'organisation-' || "id") AS base FROM "_mig_schools") s;

  INSERT INTO "organizations_locales" ("description", "_locale", "_parent_id")
  SELECT "description", "_locale", "_parent_id" FROM "_mig_schools_locales" WHERE "description" IS NOT NULL;

  INSERT INTO "organizations_links" ("_order", "_parent_id", "id", "label", "url")
  -- Websites were free text; "example.com" would become a relative link.
  SELECT 1, "id", substr(md5('link' || "id"), 1, 24), 'Website',
         CASE WHEN btrim("website") ~* '^[a-z][a-z0-9+.-]*://' THEN btrim("website") ELSE 'https://' || btrim("website") END
  FROM "_mig_schools" WHERE NULLIF(btrim("website"), '') IS NOT NULL;

  INSERT INTO "organizations_rels" ("order", "parent_id", "path", "users_id")
  SELECT 1, s."id", 'members', s."owner_id" FROM "_mig_schools" s JOIN "users" u ON u."id" = s."owner_id";

  SELECT setval(pg_get_serial_sequence('organizations', 'id'), GREATEST((SELECT COALESCE(max("id"), 0) FROM "organizations"), 1));

  INSERT INTO "organizations" ("name", "slug", "kind", "updated_at", "created_at")
  VALUES ('Noch nicht zugeordnet', 'nicht-zugeordnet', 'other', now(), now());`)

  // (3b) Events: venue, organizer, dances, schedule; all published.
  await db.execute(sql`
  UPDATE "events" e SET
    "location_address" = m."address",
    "location_lat" = m."lat",
    "location_lng" = m."lng",
    "_status" = 'published'
  FROM "_mig_events" m WHERE e."id" = m."id";

  UPDATE "events_rels" SET "path" = 'danceStyles' WHERE "path" = 'dances';

  INSERT INTO "events_rels" ("order", "parent_id", "path", "organizations_id")
  SELECT 1, e."id", 'organizers', o."id"
  FROM "events" e CROSS JOIN (SELECT "id" FROM "organizations" WHERE "slug" = 'nicht-zugeordnet') o;

  -- One day, or an overnight event (ends the next day before it started): a single date.
  INSERT INTO "events_blocks_once" ("_order", "_parent_id", "_path", "id", "date", "start_time", "end_time")
  SELECT 1, "id", 'schedule', substr(md5('once' || "id"), 1, 24),
         "start_day"::timestamp AT TIME ZONE 'UTC', "start_time", "end_time"
  FROM "_mig_events"
  WHERE "start_day" IS NOT NULL AND (
    "end_day" IS NULL OR "end_day" <= "start_day"
    OR ("end_day" = "start_day" + 1 AND ("end_time" IS NULL OR "start_time" IS NULL OR "end_time" <= "start_time")));

  -- Several days (e.g. a weekend workshop): one date per day with the same times.
  INSERT INTO "events_blocks_dates" ("_order", "_parent_id", "_path", "id")
  SELECT 1, m."id", 'schedule', substr(md5('dates' || m."id"), 1, 24)
  FROM "_mig_events" m
  WHERE m."start_day" IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM "events_blocks_once" o WHERE o."_parent_id" = m."id");

  INSERT INTO "events_blocks_dates_dates" ("_order", "_parent_id", "id", "date", "start_time", "end_time")
  SELECT d.n + 1, b."id", substr(md5('day' || m."id" || '-' || d.n), 1, 24),
         (m."start_day" + d.n)::timestamp AT TIME ZONE 'UTC', m."start_time", m."end_time"
  FROM "_mig_events" m
  JOIN "events_blocks_dates" b ON b."_parent_id" = m."id"
  CROSS JOIN LATERAL generate_series(0, m."end_day" - m."start_day") AS d(n);

  DROP TABLE "_mig_schools";
  DROP TABLE "_mig_schools_locales";
  DROP TABLE "_mig_events";`)

  // (4) Re-save through Payload: hooks derive firstDate/lastDate, and the
  // first version entry for drafts is created.
  const { docs } = await payload.find({
    collection: 'events',
    depth: 0,
    pagination: false,
    overrideAccess: true,
    req,
  })
  for (const event of docs) {
    await payload.update({
      collection: 'events',
      id: event.id,
      data: { _status: 'published' },
      overrideAccess: true,
      req,
    })
  }
  payload.logger.info(`[new_events_model] converted ${docs.length} events`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_classes_weekday" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
  ALTER TYPE "public"."enum_users_role" ADD VALUE 'system' BEFORE 'admin';
  CREATE TABLE "classes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"weekday" "enum_classes_weekday" DEFAULT 'Monday' NOT NULL,
  	"school_id" integer NOT NULL,
  	"location_name" varchar,
  	"address" varchar DEFAULT 'Hamburg' NOT NULL,
  	"location" geometry(Point) DEFAULT 'SRID=4326;POINT(9.993682 53.551086)' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "classes_locales" (
  	"description" varchar,
  	"cancelled" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "classes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"teachers_id" integer,
  	"dances_id" integer
  );
  
  CREATE TABLE "schools" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"website" varchar,
  	"owner_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "schools_locales" (
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "schools_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"teachers_id" integer
  );
  
  CREATE TABLE "teachers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" jsonb,
  	"email" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "events_blocks_once" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_dates_dates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_dates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_recurring_weekdays" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_recurring" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_course_skip_dates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_course" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_once" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_dates_dates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_dates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_recurring_weekdays" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_recurring" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_course_skip_dates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_course" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "organizations_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "organizations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "organizations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "organizations_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "events_blocks_once" CASCADE;
  DROP TABLE "events_blocks_dates_dates" CASCADE;
  DROP TABLE "events_blocks_dates" CASCADE;
  DROP TABLE "events_blocks_recurring_weekdays" CASCADE;
  DROP TABLE "events_blocks_recurring" CASCADE;
  DROP TABLE "events_blocks_course_skip_dates" CASCADE;
  DROP TABLE "events_blocks_course" CASCADE;
  DROP TABLE "_events_v_blocks_once" CASCADE;
  DROP TABLE "_events_v_blocks_dates_dates" CASCADE;
  DROP TABLE "_events_v_blocks_dates" CASCADE;
  DROP TABLE "_events_v_blocks_recurring_weekdays" CASCADE;
  DROP TABLE "_events_v_blocks_recurring" CASCADE;
  DROP TABLE "_events_v_blocks_course_skip_dates" CASCADE;
  DROP TABLE "_events_v_blocks_course" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_locales" CASCADE;
  DROP TABLE "_events_v_rels" CASCADE;
  DROP TABLE "organizations_links" CASCADE;
  DROP TABLE "organizations" CASCADE;
  DROP TABLE "organizations_locales" CASCADE;
  DROP TABLE "organizations_rels" CASCADE;
  ALTER TABLE "events_rels" DROP CONSTRAINT "events_rels_organizations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_organizations_fk";
  
  ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_events_type";
  CREATE TYPE "public"."enum_events_type" AS ENUM('Workshop', 'Social');
  ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE "public"."enum_events_type" USING "type"::"public"."enum_events_type";
  DROP INDEX "dances_slug_idx";
  DROP INDEX "dances_locales_parent_id_idx";
  DROP INDEX "events_type_idx";
  DROP INDEX "events_first_date_idx";
  DROP INDEX "events_last_date_idx";
  DROP INDEX "events__status_idx";
  DROP INDEX "events_locales_parent_id_idx";
  DROP INDEX "events_rels_organizations_id_idx";
  DROP INDEX "payload_locked_documents_rels_organizations_id_idx";
  DROP INDEX "index_locales_parent_id_idx";
  DROP INDEX "about_locales_parent_id_idx";
  DROP INDEX "swing_locales_parent_id_idx";
  DROP INDEX "schools_global_locales_parent_id_idx";
  ALTER TABLE "events" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "events" ALTER COLUMN "type" DROP DEFAULT;
  ALTER TABLE "events" ALTER COLUMN "type" SET NOT NULL;
  ALTER TABLE "events" ADD COLUMN "start_date" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "events" ADD COLUMN "start_time" varchar;
  ALTER TABLE "events" ADD COLUMN "end_date" timestamp(3) with time zone;
  ALTER TABLE "events" ADD COLUMN "end_time" varchar;
  ALTER TABLE "events" ADD COLUMN "price" numeric;
  ALTER TABLE "events" ADD COLUMN "url" varchar;
  ALTER TABLE "events" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "events" ADD COLUMN "address" varchar DEFAULT 'Hamburg' NOT NULL;
  ALTER TABLE "events" ADD COLUMN "location" geometry(Point) DEFAULT 'SRID=4326;POINT(9.993682 53.551086)' NOT NULL;
  ALTER TABLE "events_locales" ADD COLUMN "cancelled" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "classes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "schools_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "teachers_id" integer;
  ALTER TABLE "classes" ADD CONSTRAINT "classes_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "classes_locales" ADD CONSTRAINT "classes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classes_rels" ADD CONSTRAINT "classes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classes_rels" ADD CONSTRAINT "classes_rels_teachers_fk" FOREIGN KEY ("teachers_id") REFERENCES "public"."teachers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classes_rels" ADD CONSTRAINT "classes_rels_dances_fk" FOREIGN KEY ("dances_id") REFERENCES "public"."dances"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schools" ADD CONSTRAINT "schools_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "schools_locales" ADD CONSTRAINT "schools_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schools_rels" ADD CONSTRAINT "schools_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schools_rels" ADD CONSTRAINT "schools_rels_teachers_fk" FOREIGN KEY ("teachers_id") REFERENCES "public"."teachers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "classes_school_idx" ON "classes" USING btree ("school_id");
  CREATE INDEX "classes_updated_at_idx" ON "classes" USING btree ("updated_at");
  CREATE INDEX "classes_created_at_idx" ON "classes" USING btree ("created_at");
  CREATE UNIQUE INDEX "classes_locales_locale_parent_id_unique" ON "classes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "classes_rels_order_idx" ON "classes_rels" USING btree ("order");
  CREATE INDEX "classes_rels_parent_idx" ON "classes_rels" USING btree ("parent_id");
  CREATE INDEX "classes_rels_path_idx" ON "classes_rels" USING btree ("path");
  CREATE INDEX "classes_rels_teachers_id_idx" ON "classes_rels" USING btree ("teachers_id");
  CREATE INDEX "classes_rels_dances_id_idx" ON "classes_rels" USING btree ("dances_id");
  CREATE INDEX "schools_owner_idx" ON "schools" USING btree ("owner_id");
  CREATE INDEX "schools_updated_at_idx" ON "schools" USING btree ("updated_at");
  CREATE INDEX "schools_created_at_idx" ON "schools" USING btree ("created_at");
  CREATE UNIQUE INDEX "schools_locales_locale_parent_id_unique" ON "schools_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "schools_rels_order_idx" ON "schools_rels" USING btree ("order");
  CREATE INDEX "schools_rels_parent_idx" ON "schools_rels" USING btree ("parent_id");
  CREATE INDEX "schools_rels_path_idx" ON "schools_rels" USING btree ("path");
  CREATE INDEX "schools_rels_teachers_id_idx" ON "schools_rels" USING btree ("teachers_id");
  CREATE INDEX "teachers_updated_at_idx" ON "teachers" USING btree ("updated_at");
  CREATE INDEX "teachers_created_at_idx" ON "teachers" USING btree ("created_at");
  ALTER TABLE "events" ADD CONSTRAINT "events_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_schools_fk" FOREIGN KEY ("schools_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_teachers_fk" FOREIGN KEY ("teachers_id") REFERENCES "public"."teachers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_background_image_idx" ON "events" USING btree ("background_image_id");
  CREATE INDEX "payload_locked_documents_rels_classes_id_idx" ON "payload_locked_documents_rels" USING btree ("classes_id");
  CREATE INDEX "payload_locked_documents_rels_schools_id_idx" ON "payload_locked_documents_rels" USING btree ("schools_id");
  CREATE INDEX "payload_locked_documents_rels_teachers_id_idx" ON "payload_locked_documents_rels" USING btree ("teachers_id");
  ALTER TABLE "users" DROP COLUMN "reset_password_requested_at";
  ALTER TABLE "dances" DROP COLUMN "slug";
  ALTER TABLE "events" DROP COLUMN "level";
  ALTER TABLE "events" DROP COLUMN "location_street";
  ALTER TABLE "events" DROP COLUMN "location_house_number";
  ALTER TABLE "events" DROP COLUMN "location_postcode";
  ALTER TABLE "events" DROP COLUMN "location_city";
  ALTER TABLE "events" DROP COLUMN "location_district";
  ALTER TABLE "events" DROP COLUMN "location_address";
  ALTER TABLE "events" DROP COLUMN "location_lat";
  ALTER TABLE "events" DROP COLUMN "location_lng";
  ALTER TABLE "events" DROP COLUMN "location_directions_note";
  ALTER TABLE "events" DROP COLUMN "exceptions";
  ALTER TABLE "events" DROP COLUMN "first_date";
  ALTER TABLE "events" DROP COLUMN "last_date";
  ALTER TABLE "events" DROP COLUMN "_status";
  ALTER TABLE "events_rels" DROP COLUMN "organizations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "organizations_id";
  DROP TYPE "public"."enum_events_blocks_recurring_weekdays";
  DROP TYPE "public"."enum_events_blocks_recurring_frequency";
  DROP TYPE "public"."enum_events_blocks_recurring_monthly_mode";
  DROP TYPE "public"."enum_events_blocks_recurring_nth_weekday";
  DROP TYPE "public"."enum_events_blocks_recurring_weekday";
  DROP TYPE "public"."enum_events_blocks_recurring_end_mode";
  DROP TYPE "public"."enum_events_blocks_course_weekday";
  DROP TYPE "public"."enum_events_level";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_blocks_recurring_weekdays";
  DROP TYPE "public"."enum__events_v_blocks_recurring_frequency";
  DROP TYPE "public"."enum__events_v_blocks_recurring_monthly_mode";
  DROP TYPE "public"."enum__events_v_blocks_recurring_nth_weekday";
  DROP TYPE "public"."enum__events_v_blocks_recurring_weekday";
  DROP TYPE "public"."enum__events_v_blocks_recurring_end_mode";
  DROP TYPE "public"."enum__events_v_blocks_course_weekday";
  DROP TYPE "public"."enum__events_v_version_type";
  DROP TYPE "public"."enum__events_v_version_level";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum__events_v_published_locale";
  DROP TYPE "public"."enum_organizations_kind";`)
}
