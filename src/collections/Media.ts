import { hiddenForLowerRoles, isAtLeastWriter } from '@/access'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAtLeastWriter,
    delete: isAtLeastWriter,
  },
  admin: {
    hidden: hiddenForLowerRoles,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
