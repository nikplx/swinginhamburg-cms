import type { CollectionConfig } from 'payload'
import { authenticated, publicRead } from '@/access'
import { locationGroup } from '@/fields/location'
import { invalidateOccurrencesCache } from '@/lib/occurrences/cache'

/**
 * Organizers of events: dance schools, associations/collectives, solo DJs.
 *
 * Replaces the old `schools` collection. `kind` is descriptive only; it has no
 * effect on permissions or filtering.
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
    create: authenticated,
    update: authenticated,
    delete: authenticated,
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
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: { de: 'Slug', en: 'Slug' },
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
      type: 'textarea',
      localized: true,
      label: { de: 'Beschreibung', en: 'Description' },
    },
    {
      name: 'links',
      type: 'array',
      label: { de: 'Links', en: 'Links' },
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
    locationGroup('defaultLocation', 'Standard-Ort', 'Default location'),
  ],
}
