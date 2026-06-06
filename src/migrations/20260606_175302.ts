import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_events_type" AS ENUM('Workshop', 'Social');
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_events_type" NOT NULL,
  	"location_name" varchar,
  	"title" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"start_time" varchar,
  	"end_date" timestamp(3) with time zone,
  	"end_time" varchar,
  	"address" varchar DEFAULT 'Hamburg' NOT NULL,
  	"location" geometry(Point) DEFAULT 'SRID=4326;POINT(9.993682 53.551086)' NOT NULL,
  	"price" numeric,
  	"cancelled" varchar,
  	"background_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_locales" (
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dances_id" integer
  );
  
  ALTER TABLE "swing_dances" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "swing_dances_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "swing_dances" CASCADE;
  DROP TABLE "swing_dances_locales" CASCADE;
  ALTER TABLE "classes_locales" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "classes_rels" ADD COLUMN "dances_id" integer;
  ALTER TABLE "dances" ADD COLUMN "short_name" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "events" ADD CONSTRAINT "events_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_dances_fk" FOREIGN KEY ("dances_id") REFERENCES "public"."dances"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_background_image_idx" ON "events" USING btree ("background_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_dances_id_idx" ON "events_rels" USING btree ("dances_id");
  ALTER TABLE "classes_rels" ADD CONSTRAINT "classes_rels_dances_fk" FOREIGN KEY ("dances_id") REFERENCES "public"."dances"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "classes_rels_dances_id_idx" ON "classes_rels" USING btree ("dances_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "swing_dances" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "swing_dances_locales" (
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  ALTER TABLE "classes_rels" DROP CONSTRAINT "classes_rels_dances_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  DROP INDEX "classes_rels_dances_id_idx";
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  ALTER TABLE "classes_locales" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "swing_dances" ADD CONSTRAINT "swing_dances_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."swing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "swing_dances_locales" ADD CONSTRAINT "swing_dances_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."swing_dances"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "swing_dances_order_idx" ON "swing_dances" USING btree ("_order");
  CREATE INDEX "swing_dances_parent_id_idx" ON "swing_dances" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "swing_dances_locales_locale_parent_id_unique" ON "swing_dances_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "classes_rels" DROP COLUMN "dances_id";
  ALTER TABLE "dances" DROP COLUMN "short_name";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  DROP TYPE "public"."enum_events_type";`)
}
