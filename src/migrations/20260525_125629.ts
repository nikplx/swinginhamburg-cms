import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "dances" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dances_locales" (
  	"name" varchar NOT NULL,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "dances_id" integer;
  ALTER TABLE "dances_locales" ADD CONSTRAINT "dances_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dances"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "dances_updated_at_idx" ON "dances" USING btree ("updated_at");
  CREATE INDEX "dances_created_at_idx" ON "dances" USING btree ("created_at");
  CREATE UNIQUE INDEX "dances_locales_locale_parent_id_unique" ON "dances_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dances_fk" FOREIGN KEY ("dances_id") REFERENCES "public"."dances"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_dances_id_idx" ON "payload_locked_documents_rels" USING btree ("dances_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "dances" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dances_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "dances" CASCADE;
  DROP TABLE "dances_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_dances_fk";
  
  DROP INDEX "payload_locked_documents_rels_dances_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "dances_id";`)
}
