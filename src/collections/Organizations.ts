import type { CollectionConfig } from 'payload'
import {
  isAtLeastWriter,
  isAtLeastWriterField,
  publicRead,
  organizationUpdate,
} from '@/access'
import { locationGroup } from '@/fields/location'
import { simpleRichTextEditor } from '@/fields/editors'
import { invalidateOccurrencesCache } from '@/lib/occurrences/cache'
import { richTextHtml } from '@/fields/richTextHtml'

/**
 * Organizers of events: dance schools, associations/collectives, solo DJs.
 *
 * Replaces the old `schools` collection. `kind` is descriptive only; it has no
 * effect on permissions or filtering.
 *
 * Linked users (`members`) may edit the description; everything else is
 * reserved for writers and admins.
 */
export const Organizations: CollectionConfig = {
  slug: 'organizations',
  labels: {
    singular: { de: 'Organisation', en: 'Organization' },
    plural: { de: 'Organisationen', en: 'Organizations' },
  },
  admin: {
    useAsTitle: 'name',
    group: { de: 'Veranstaltungen', en: 'Events' },
    defaultColumns: ['name', 'kind', 'slug'],
  },
  access: {
    read: publicRead,
    create: isAtLeastWriter,
    update: organizationUpdate,
    delete: isAtLeastWriter,
  },
  hooks: {
    // A renamed organization appears in cached occurrences, so clear on change.
    afterChange: [() => invalidateOccurrencesCache()],
    afterDelete: [() => invalidateOccurrencesCache()],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { de: 'Name', en: 'Name' },
      access: { update: isAtLeastWriterField },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: { de: 'Slug', en: 'Slug' },
      access: { update: isAtLeastWriterField },
      admin: {
        description: {
          de: 'Kurzname für Links, z. B. "swing-in-hamburg".',
          en: 'Short name used in links, e.g. "swing-in-hamburg".',
        },
      },
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'school',
      label: { de: 'Art', en: 'Kind' },
      access: { update: isAtLeastWriterField },
      options: [
        { value: 'school', label: { de: 'Tanzschule', en: 'Dance school' } },
        {
          value: 'association',
          label: { de: 'Verein / Kollektiv', en: 'Association / collective' },
        },
        { value: 'individual', label: { de: 'Einzelperson', en: 'Individual' } },
        { value: 'other', label: { de: 'Sonstiges', en: 'Other' } },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: { de: 'Beschreibung', en: 'Description' },
      editor: simpleRichTextEditor,
      // No field-level restriction: the only users who can reach an update are
      // writers/admin and linked members (see `organizationUpdate`), and the
      // description is intentionally the one field members may change.
    },
    richTextHtml('description'),
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      label: { de: 'Zugeordnete Benutzer', en: 'Linked users' },
      access: {
        // Not public: these are user documents.
        read: isAtLeastWriterField,
        update: isAtLeastWriterField,
      },
      admin: {
        description: {
          de: 'Diese Benutzer dürfen die Beschreibung der Organisation bearbeiten. Die Zuordnung ist optional und wird von Redakteuren gepflegt.',
          en: 'These users may edit the organization description. Linking is optional and managed by writers.',
        },
      },
    },
    {
      name: 'links',
      type: 'array',
      label: { de: 'Links', en: 'Links' },
      access: { update: isAtLeastWriterField },
      labels: {
        singular: { de: 'Link', en: 'Link' },
        plural: { de: 'Links', en: 'Links' },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: { de: 'Bezeichnung', en: 'Label' },
              admin: { width: '40%' },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: { de: 'URL', en: 'URL' },
              admin: { width: '60%' },
            },
          ],
        },
      ],
    },
    {
      ...locationGroup('defaultLocation', 'Standard-Ort', 'Default location'),
      access: { update: isAtLeastWriterField },
    },
  ],
}
