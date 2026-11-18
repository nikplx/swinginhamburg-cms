import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * `organizations.description` changed from a plain textarea to rich text, so
 * existing strings are wrapped in a minimal Lexical state (one paragraph) while
 * the column type changes from varchar to jsonb.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "organizations_locales" ADD COLUMN "description_richtext" jsonb;

   UPDATE "organizations_locales"
   SET "description_richtext" = jsonb_build_object(
     'root', jsonb_build_object(
       'type', 'root',
       'format', '',
       'indent', 0,
       'version', 1,
       'direction', 'ltr',
       'children', jsonb_build_array(
         jsonb_build_object(
           'type', 'paragraph',
           'format', '',
           'indent', 0,
           'version', 1,
           'direction', 'ltr',
           'textFormat', 0,
           'textStyle', '',
           'children', jsonb_build_array(
             jsonb_build_object(
               'type', 'text',
               'detail', 0,
               'format', 0,
               'mode', 'normal',
               'style', '',
               'text', "description",
               'version', 1
             )
           )
         )
       )
     )
   )
   WHERE "description" IS NOT NULL AND btrim("description") <> '';

   ALTER TABLE "organizations_locales" DROP COLUMN "description";
   ALTER TABLE "organizations_locales" RENAME COLUMN "description_richtext" TO "description";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "organizations_locales" ADD COLUMN "description_text" varchar;

   UPDATE "organizations_locales" AS o
   SET "description_text" = sub.text
   FROM (
     SELECT locales."id",
            string_agg(node.value->>'text', E'\n') AS text
     FROM "organizations_locales" AS locales
     CROSS JOIN LATERAL jsonb_array_elements(locales."description"->'root'->'children') AS paragraph(value)
     CROSS JOIN LATERAL jsonb_array_elements(paragraph.value->'children') AS node(value)
     WHERE node.value->>'type' = 'text'
     GROUP BY locales."id"
   ) AS sub
   WHERE o."id" = sub."id";

   ALTER TABLE "organizations_locales" DROP COLUMN "description";
   ALTER TABLE "organizations_locales" RENAME COLUMN "description_text" TO "description";`)
}
