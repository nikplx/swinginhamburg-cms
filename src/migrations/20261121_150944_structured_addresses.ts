import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ADD COLUMN "location_street" varchar;
  ALTER TABLE "events" ADD COLUMN "location_house_number" varchar;
  ALTER TABLE "events" ADD COLUMN "location_postcode" varchar;
  ALTER TABLE "events" ADD COLUMN "location_city" varchar;
  ALTER TABLE "events" ADD COLUMN "location_district" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_location_street" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_location_house_number" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_location_postcode" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_location_city" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_location_district" varchar;
  ALTER TABLE "organizations" ADD COLUMN "default_location_street" varchar;
  ALTER TABLE "organizations" ADD COLUMN "default_location_house_number" varchar;
  ALTER TABLE "organizations" ADD COLUMN "default_location_postcode" varchar;
  ALTER TABLE "organizations" ADD COLUMN "default_location_city" varchar;
  ALTER TABLE "organizations" ADD COLUMN "default_location_district" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" DROP COLUMN "location_street";
  ALTER TABLE "events" DROP COLUMN "location_house_number";
  ALTER TABLE "events" DROP COLUMN "location_postcode";
  ALTER TABLE "events" DROP COLUMN "location_city";
  ALTER TABLE "events" DROP COLUMN "location_district";
  ALTER TABLE "_events_v" DROP COLUMN "version_location_street";
  ALTER TABLE "_events_v" DROP COLUMN "version_location_house_number";
  ALTER TABLE "_events_v" DROP COLUMN "version_location_postcode";
  ALTER TABLE "_events_v" DROP COLUMN "version_location_city";
  ALTER TABLE "_events_v" DROP COLUMN "version_location_district";
  ALTER TABLE "organizations" DROP COLUMN "default_location_street";
  ALTER TABLE "organizations" DROP COLUMN "default_location_house_number";
  ALTER TABLE "organizations" DROP COLUMN "default_location_postcode";
  ALTER TABLE "organizations" DROP COLUMN "default_location_city";
  ALTER TABLE "organizations" DROP COLUMN "default_location_district";`)
}
