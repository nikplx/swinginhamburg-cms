import { isAdmin, isAtLeastWriter } from '@/access'
import type { CollectionConfig } from 'payload'
export const Dances: CollectionConfig = {
  slug: 'dances',
  access: {
    read: () => true,
    create: isAtLeastWriter,
    update: isAtLeastWriter,
    delete: isAtLeastWriter,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
      localized: true,
    },
  ],
}
