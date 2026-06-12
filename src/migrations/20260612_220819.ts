import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "schools_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "schools_global_locales" (
  	"how_to_learn" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "classes" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "dances" ALTER COLUMN "short_name" SET DEFAULT '';
  ALTER TABLE "dances" ALTER COLUMN "short_name" SET NOT NULL;
  ALTER TABLE "classes" ADD COLUMN "weekday" "enum_classes_weekday" DEFAULT 'Monday' NOT NULL;
  ALTER TABLE "classes" ADD COLUMN "location_name" varchar;
  ALTER TABLE "classes_locales" ADD COLUMN "cancelled" varchar;
  ALTER TABLE "events" ADD COLUMN "url" varchar;
  ALTER TABLE "events_locales" ADD COLUMN "cancelled" varchar;
  ALTER TABLE "swing_locales" ADD COLUMN "faq" jsonb;
  ALTER TABLE "schools_global_locales" ADD CONSTRAINT "schools_global_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schools_global"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "schools_global_locales_locale_parent_id_unique" ON "schools_global_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "classes" DROP COLUMN "cancelled";
  ALTER TABLE "classes_locales" DROP COLUMN "weekday";
  ALTER TABLE "events" DROP COLUMN "cancelled";
  ALTER TABLE "about_locales" DROP COLUMN "title";
  ALTER TABLE "swing_locales" DROP COLUMN "title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "schools_global" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schools_global_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "schools_global" CASCADE;
  DROP TABLE "schools_global_locales" CASCADE;
  ALTER TABLE "classes" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "dances" ALTER COLUMN "short_name" DROP DEFAULT;
  ALTER TABLE "dances" ALTER COLUMN "short_name" DROP NOT NULL;
  ALTER TABLE "classes" ADD COLUMN "cancelled" varchar;
  ALTER TABLE "classes_locales" ADD COLUMN "weekday" "enum_classes_weekday" NOT NULL;
  ALTER TABLE "events" ADD COLUMN "cancelled" varchar;
  ALTER TABLE "about_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "swing_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "classes" DROP COLUMN "weekday";
  ALTER TABLE "classes" DROP COLUMN "location_name";
  ALTER TABLE "classes_locales" DROP COLUMN "cancelled";
  ALTER TABLE "events" DROP COLUMN "url";
  ALTER TABLE "events_locales" DROP COLUMN "cancelled";
  ALTER TABLE "swing_locales" DROP COLUMN "faq";`)
}
