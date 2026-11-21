import type { CollectionConfig } from 'payload'
import { hiddenForLowerRoles, isAtLeastWriter, publicRead } from '@/access'
import { invalidateOccurrencesCache } from '@/lib/occurrences/cache'

/**
 * Dance styles ("dance-styles" in the spec). The repo has always called this
 * collection `dances`, so the slug is kept; events reference it through the
 * `danceStyles` field.
 *
 * `name` is localized, which is how the German display name is maintained.
 * `shortName` stays as the compact filter/anchor key used by the frontend.
 */
export const Dances: CollectionConfig = {
  slug: 'dances',
  access: {
    read: publicRead,
    create: isAtLeastWriter,
    update: isAtLeastWriter,
    delete: isAtLeastWriter,
  },
  admin: {
    hidden: hiddenForLowerRoles,
    useAsTitle: 'name',
    group: { de: 'Veranstaltungen', en: 'Events' },
    defaultColumns: ['name', 'shortName', 'slug'],
  },
  labels: {
    singular: { de: 'Tanzstil', en: 'Dance style' },
    plural: { de: 'Tanzstile', en: 'Dance styles' },
  },
  hooks: {
    afterChange: [() => invalidateOccurrencesCache()],
    afterDelete: [() => invalidateOccurrencesCache()],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: { de: 'Name', en: 'Name' },
    },
    {
      name: 'shortName',
      type: 'text',
      required: true,
      localized: false,
      defaultValue: '',
      label: { de: 'Kurzname', en: 'Short name' },
      admin: {
        description: {
          de: 'Für Filter und Sprungmarken, z. B. "Lindy Hop".',
          en: 'Used for filters and anchors, e.g. "Lindy Hop".',
        },
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: { de: 'Slug', en: 'Slug' },
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
      localized: true,
      label: { de: 'Beschreibung', en: 'Description' },
    },
  ],
}
