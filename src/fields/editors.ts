import { lexicalEditor } from '@payloadcms/richtext-lexical'

/**
 * Rich text for public copy: paragraphs, lists, links and inline formatting,
 * but no headings and no media uploads.
 *
 * The HTML converter on the frontend still knows how to render existing heading
 * and upload nodes, so older content keeps working — editors just cannot create
 * new ones.
 */
export const simpleRichTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) =>
    defaultFeatures.filter((feature) => feature.key !== 'heading' && feature.key !== 'upload'),
})
