import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'writer', 'school', 'guest');
  CREATE TABLE "classes_locales" (
  	"description" varchar NOT NULL,
  	"weekday" "enum_classes_weekday" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "schools_locales" (
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "index" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "index_locales" (
  	"subtitle" varchar,
  	"intro" jsonb,
  	"donation" jsonb,
  	"donation_box" jsonb,
  	"disclaimer" jsonb,
  	"learn_header" varchar,
  	"learn_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users" ADD COLUMN "roles" "enum_users_roles" DEFAULT 'guest' NOT NULL;
  ALTER TABLE "classes" ADD COLUMN "address" varchar DEFAULT 'Hamburg' NOT NULL;
  ALTER TABLE "classes" ADD COLUMN "location" geometry(Point) DEFAULT 'SRID=4326;POINT(9.993682 53.551086)' NOT NULL;
  ALTER TABLE "schools" ADD COLUMN "website" varchar;
  ALTER TABLE "classes_locales" ADD CONSTRAINT "classes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schools_locales" ADD CONSTRAINT "schools_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "index_locales" ADD CONSTRAINT "index_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."index"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "classes_locales_locale_parent_id_unique" ON "classes_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "schools_locales_locale_parent_id_unique" ON "schools_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "index_locales_locale_parent_id_unique" ON "index_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "classes" DROP COLUMN "description";
  ALTER TABLE "classes" DROP COLUMN "weekday";
  ALTER TABLE "schools" DROP COLUMN "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "classes_locales" CASCADE;
  DROP TABLE "schools_locales" CASCADE;
  DROP TABLE "index" CASCADE;
  DROP TABLE "index_locales" CASCADE;
  ALTER TABLE "classes" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "classes" ADD COLUMN "weekday" "enum_classes_weekday" NOT NULL;
  ALTER TABLE "schools" ADD COLUMN "description" jsonb;
  ALTER TABLE "users" DROP COLUMN "roles";
  ALTER TABLE "classes" DROP COLUMN "address";
  ALTER TABLE "classes" DROP COLUMN "location";
  ALTER TABLE "schools" DROP COLUMN "website";
  DROP TYPE "public"."enum_users_roles";`)
}
