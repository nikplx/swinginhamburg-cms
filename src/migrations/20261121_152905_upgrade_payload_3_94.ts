import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN "reset_password_requested_at" timestamp(3) with time zone;
  CREATE INDEX "dances_locales_parent_id_idx" ON "dances_locales" USING btree ("_parent_id");
  CREATE INDEX "events_locales_parent_id_idx" ON "events_locales" USING btree ("_parent_id");
  CREATE INDEX "_events_v_locales_parent_id_idx" ON "_events_v_locales" USING btree ("_parent_id");
  CREATE INDEX "organizations_locales_parent_id_idx" ON "organizations_locales" USING btree ("_parent_id");
  CREATE INDEX "index_locales_parent_id_idx" ON "index_locales" USING btree ("_parent_id");
  CREATE INDEX "about_locales_parent_id_idx" ON "about_locales" USING btree ("_parent_id");
  CREATE INDEX "swing_locales_parent_id_idx" ON "swing_locales" USING btree ("_parent_id");
  CREATE INDEX "schools_global_locales_parent_id_idx" ON "schools_global_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "dances_locales_parent_id_idx";
  DROP INDEX "events_locales_parent_id_idx";
  DROP INDEX "_events_v_locales_parent_id_idx";
  DROP INDEX "organizations_locales_parent_id_idx";
  DROP INDEX "index_locales_parent_id_idx";
  DROP INDEX "about_locales_parent_id_idx";
  DROP INDEX "swing_locales_parent_id_idx";
  DROP INDEX "schools_global_locales_parent_id_idx";
  ALTER TABLE "users" DROP COLUMN "reset_password_requested_at";`)
}
