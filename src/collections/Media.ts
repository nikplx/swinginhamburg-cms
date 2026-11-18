import { hiddenForLowerRoles, isAtLeastWriter } from '@/access'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { de: 'Medium', en: 'Media item' },
    plural: { de: 'Medien', en: 'Media' },
  },
  access: {
    read: () => true,
    create: isAtLeastWriter,
    delete: isAtLeastWriter,
  },
  admin: {
    hidden: hiddenForLowerRoles,
    group: { de: 'Inhalte', en: 'Content' },
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: { de: 'Alternativtext', en: 'Alt text' },
      admin: {
        description: {
          de: 'Kurze Bildbeschreibung für Screenreader und Suchmaschinen.',
          en: 'Short image description for screen readers and search engines.',
        },
      },
    },
  ],
  upload: true,
}
