import { lexicalHTMLField } from '@payloadcms/richtext-lexical'
import type { CodeField, Field } from 'payload'

/**
 * Read-only `<name>Html` sibling of a rich-text field: the Lexical state
 * rendered to HTML on every read, in the requested locale.
 *
 * - Virtual: no database column, so existing content works immediately and
 *   the HTML always comes from the installed converter version (a Payload
 *   upgrade with a sanitization fix applies to all content at once).
 * - The converter escapes text and replaces unsafe link schemes (see
 *   tests/unit/richTextHtml.spec.ts), so API consumers may insert the HTML
 *   as is.
 * - Hidden in the admin.
 */
export const richTextHtml = (lexicalFieldName: string): Field => ({
  ...(lexicalHTMLField({
    lexicalFieldName,
    htmlFieldName: `${lexicalFieldName}Html`,
  }) as CodeField),
  virtual: true,
})
