import type { CollectionConfig } from 'payload'
export const Teachers: CollectionConfig = {
  slug: 'teachers',
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
