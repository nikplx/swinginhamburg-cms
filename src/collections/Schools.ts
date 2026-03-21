import type { CollectionConfig } from 'payload'
export const Schools: CollectionConfig = {
  slug: 'schools',
  admin: {
    useAsTitle: 'name',
  },

  access: {
    read: () => true,
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
    },
    {
        name: 'teachers',
        type: 'relationship',
        relationTo: 'teachers',
        hasMany: true,
    }
  ],
}
