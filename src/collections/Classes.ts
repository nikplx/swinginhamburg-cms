import type { CollectionConfig } from 'payload'

export const Classes: CollectionConfig = {
  slug: 'classes',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'weekday',
      type: 'select',
      options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
      localized: true,
    },
    {
      name: 'cancelled',
      type: 'text',
      required: false,
    },
    {
      name: 'school',
      type: 'relationship',
      relationTo: 'schools'
    },
    {
      name: 'teachers',
      type: 'relationship',
      relationTo: 'teachers',
      hasMany: true
    }
    // Email added by default
    // Add more fields as needed
  ],
}
