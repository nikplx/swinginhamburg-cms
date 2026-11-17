import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  CREATE TYPE "public"."enum__events_v_version_type" AS ENUM('class', 'social', 'workshop', 'talk', 'walk', 'festival', 'other');
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
  	"version_type" "enum__events_v_version_type",
  	"version_level" "enum__events_v_version_level",
  	"version_location_name" varchar,
  	"version_location_address" varchar,
  	"version_location_lat" numeric,
  	"version_location_lng" numeric,
  	"version_location_directions_note" varchar,
  	"version_exceptions" jsonb,
  	"version_first_date" timestamp(3) with time zone,
  	"version_last_date" timestamp(3) with time zone,
  	"version_last_confirmed" timestamp(3) with time zone,
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
  	"default_location_address" varchar,
  	"default_location_lat" numeric,
  	"default_location_lng" numeric,
  	"default_location_directions_note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "organizations_locales" (
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "classes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "classes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "classes_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schools" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schools_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schools_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "classes" CASCADE;
  DROP TABLE "classes_locales" CASCADE;
  DROP TABLE "classes_rels" CASCADE;
  DROP TABLE "schools" CASCADE;
  DROP TABLE "schools_locales" CASCADE;
  DROP TABLE "schools_rels" CASCADE;
  ALTER TABLE "events" DROP CONSTRAINT "events_background_image_id_media_id_fk";
  
  -- Dropping the classes/schools tables with CASCADE below already removes
  -- these foreign keys, so only drop them when they still exist.
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_classes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_schools_fk";
  
  -- Old events belonged to the previous workshop/social model and cannot be
  -- mapped onto the new type enum. Data loss is explicitly acceptable here.
  DELETE FROM "events";
  DELETE FROM "_events_v";
  ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_events_type";
  CREATE TYPE "public"."enum_events_type" AS ENUM('class', 'social', 'workshop', 'talk', 'walk', 'festival', 'other');
  ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE "public"."enum_events_type" USING "type"::"public"."enum_events_type";
  DROP INDEX "events_background_image_idx";
  DROP INDEX "payload_locked_documents_rels_classes_id_idx";
  DROP INDEX "payload_locked_documents_rels_schools_id_idx";
  ALTER TABLE "events" ALTER COLUMN "type" DROP NOT NULL;
  ALTER TABLE "events" ALTER COLUMN "title" DROP NOT NULL;
  -- Existing dance styles have no slug yet; backfill a stable, unique one
  -- before enforcing NOT NULL and the unique index below.
  ALTER TABLE "dances" ADD COLUMN "slug" varchar;
  UPDATE "dances" SET "slug" = 'dance-' || "id" WHERE "slug" IS NULL;
  ALTER TABLE "dances" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "events" ADD COLUMN "level" "enum_events_level";
  ALTER TABLE "events" ADD COLUMN "location_address" varchar;
  ALTER TABLE "events" ADD COLUMN "location_lat" numeric;
  ALTER TABLE "events" ADD COLUMN "location_lng" numeric;
  ALTER TABLE "events" ADD COLUMN "location_directions_note" varchar;
  ALTER TABLE "events" ADD COLUMN "exceptions" jsonb;
  ALTER TABLE "events" ADD COLUMN "first_date" timestamp(3) with time zone;
  ALTER TABLE "events" ADD COLUMN "last_date" timestamp(3) with time zone;
  ALTER TABLE "events" ADD COLUMN "last_confirmed" timestamp(3) with time zone;
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
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "dances_slug_idx" ON "dances" USING btree ("slug");
  CREATE INDEX "events_type_idx" ON "events" USING btree ("type");
  CREATE INDEX "events_first_date_idx" ON "events" USING btree ("first_date");
  CREATE INDEX "events_last_date_idx" ON "events" USING btree ("last_date");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "events_rels_organizations_id_idx" ON "events_rels" USING btree ("organizations_id");
  CREATE INDEX "payload_locked_documents_rels_organizations_id_idx" ON "payload_locked_documents_rels" USING btree ("organizations_id");
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
  DROP TYPE "public"."enum_classes_weekday";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_classes_weekday" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
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
  -- Dropping organizations with CASCADE above already removes these foreign
  -- keys, so only drop them when they still exist.
  ALTER TABLE "events_rels" DROP CONSTRAINT IF EXISTS "events_rels_organizations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_organizations_fk";
  
  -- Old events belonged to the previous workshop/social model and cannot be
  -- mapped onto the new type enum. Data loss is explicitly acceptable here.
  -- The versions table was already dropped above, so only clear events here.
  DELETE FROM "events";
  ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_events_type";
  CREATE TYPE "public"."enum_events_type" AS ENUM('Workshop', 'Social');
  ALTER TABLE "events" ALTER COLUMN "type" SET DATA TYPE "public"."enum_events_type" USING "type"::"public"."enum_events_type";
  DROP INDEX "dances_slug_idx";
  DROP INDEX "events_type_idx";
  DROP INDEX "events_first_date_idx";
  DROP INDEX "events_last_date_idx";
  DROP INDEX "events__status_idx";
  DROP INDEX "events_rels_organizations_id_idx";
  DROP INDEX "payload_locked_documents_rels_organizations_id_idx";
  ALTER TABLE "events" ALTER COLUMN "title" SET NOT NULL;
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
  ALTER TABLE "events" ADD CONSTRAINT "events_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_schools_fk" FOREIGN KEY ("schools_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_background_image_idx" ON "events" USING btree ("background_image_id");
  CREATE INDEX "payload_locked_documents_rels_classes_id_idx" ON "payload_locked_documents_rels" USING btree ("classes_id");
  CREATE INDEX "payload_locked_documents_rels_schools_id_idx" ON "payload_locked_documents_rels" USING btree ("schools_id");
  ALTER TABLE "dances" DROP COLUMN "slug";
  ALTER TABLE "events" DROP COLUMN "level";
  ALTER TABLE "events" DROP COLUMN "location_address";
  ALTER TABLE "events" DROP COLUMN "location_lat";
  ALTER TABLE "events" DROP COLUMN "location_lng";
  ALTER TABLE "events" DROP COLUMN "location_directions_note";
  ALTER TABLE "events" DROP COLUMN "exceptions";
  ALTER TABLE "events" DROP COLUMN "first_date";
  ALTER TABLE "events" DROP COLUMN "last_date";
  ALTER TABLE "events" DROP COLUMN "last_confirmed";
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
