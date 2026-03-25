import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'writer', 'school', 'guest');
  CREATE TYPE "public"."enum_schools_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__schools_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__schools_v_published_locale" AS ENUM('en', 'de');
  CREATE TABLE "_schools_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_website" varchar,
  	"version_owner_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__schools_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__schools_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_schools_v_locales" (
  	"version_description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_schools_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"teachers_id" integer
  );
  
  ALTER TABLE "classes" ALTER COLUMN "school_id" SET NOT NULL;
  ALTER TABLE "schools" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'guest' NOT NULL;
  ALTER TABLE "schools" ADD COLUMN "owner_id" integer;
  ALTER TABLE "schools" ADD COLUMN "_status" "enum_schools_status" DEFAULT 'draft';
  ALTER TABLE "_schools_v" ADD CONSTRAINT "_schools_v_parent_id_schools_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."schools"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_schools_v" ADD CONSTRAINT "_schools_v_version_owner_id_users_id_fk" FOREIGN KEY ("version_owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_schools_v_locales" ADD CONSTRAINT "_schools_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_schools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_schools_v_rels" ADD CONSTRAINT "_schools_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_schools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_schools_v_rels" ADD CONSTRAINT "_schools_v_rels_teachers_fk" FOREIGN KEY ("teachers_id") REFERENCES "public"."teachers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_schools_v_parent_idx" ON "_schools_v" USING btree ("parent_id");
  CREATE INDEX "_schools_v_version_version_owner_idx" ON "_schools_v" USING btree ("version_owner_id");
  CREATE INDEX "_schools_v_version_version_updated_at_idx" ON "_schools_v" USING btree ("version_updated_at");
  CREATE INDEX "_schools_v_version_version_created_at_idx" ON "_schools_v" USING btree ("version_created_at");
  CREATE INDEX "_schools_v_version_version__status_idx" ON "_schools_v" USING btree ("version__status");
  CREATE INDEX "_schools_v_created_at_idx" ON "_schools_v" USING btree ("created_at");
  CREATE INDEX "_schools_v_updated_at_idx" ON "_schools_v" USING btree ("updated_at");
  CREATE INDEX "_schools_v_snapshot_idx" ON "_schools_v" USING btree ("snapshot");
  CREATE INDEX "_schools_v_published_locale_idx" ON "_schools_v" USING btree ("published_locale");
  CREATE INDEX "_schools_v_latest_idx" ON "_schools_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_schools_v_locales_locale_parent_id_unique" ON "_schools_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_schools_v_rels_order_idx" ON "_schools_v_rels" USING btree ("order");
  CREATE INDEX "_schools_v_rels_parent_idx" ON "_schools_v_rels" USING btree ("parent_id");
  CREATE INDEX "_schools_v_rels_path_idx" ON "_schools_v_rels" USING btree ("path");
  CREATE INDEX "_schools_v_rels_teachers_id_idx" ON "_schools_v_rels" USING btree ("teachers_id");
  ALTER TABLE "schools" ADD CONSTRAINT "schools_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "schools_owner_idx" ON "schools" USING btree ("owner_id");
  CREATE INDEX "schools__status_idx" ON "schools" USING btree ("_status");
  ALTER TABLE "users" DROP COLUMN "roles";
  DROP TYPE "public"."enum_users_roles";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'writer', 'school', 'guest');
  ALTER TABLE "_schools_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_schools_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_schools_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_schools_v" CASCADE;
  DROP TABLE "_schools_v_locales" CASCADE;
  DROP TABLE "_schools_v_rels" CASCADE;
  ALTER TABLE "schools" DROP CONSTRAINT "schools_owner_id_users_id_fk";
  
  DROP INDEX "schools_owner_idx";
  DROP INDEX "schools__status_idx";
  ALTER TABLE "classes" ALTER COLUMN "school_id" DROP NOT NULL;
  ALTER TABLE "schools" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "users" ADD COLUMN "roles" "enum_users_roles" DEFAULT 'guest' NOT NULL;
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "schools" DROP COLUMN "owner_id";
  ALTER TABLE "schools" DROP COLUMN "_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_schools_status";
  DROP TYPE "public"."enum__schools_v_version_status";
  DROP TYPE "public"."enum__schools_v_published_locale";`)
}
