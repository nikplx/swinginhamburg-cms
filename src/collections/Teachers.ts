import { isAdmin, isAtLeastWriter } from '@/access'
import type { CollectionConfig } from 'payload'
export const Teachers: CollectionConfig = {
  slug: 'teachers',
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
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
    },
    {
      name: 'email',
      type: 'email',
      required: false,
    },
  ],
}
