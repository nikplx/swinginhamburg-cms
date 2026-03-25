import { canCreateClass, canManageClass, isAtLeastWriter, isAtLeastWriterField } from '@/access'
import type { CollectionConfig } from 'payload'

export const Classes: CollectionConfig = {
  slug: 'classes',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: canCreateClass,
    update: canManageClass,
    delete: canManageClass,
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
      localized: true,
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
      relationTo: 'schools',
      required: true,
      access: {
        update: isAtLeastWriterField,
      },
    },
    {
      name: 'teachers',
      type: 'relationship',
      relationTo: 'teachers',
      hasMany: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      defaultValue: 'Hamburg',
      // Optional: Set to true if you want to hide this field and only let the custom component manage it
      // admin: { hidden: true }
    },
    {
      name: 'location',
      type: 'point',
      required: true,
      // Corrected to [Longitude, Latitude] for Hamburg
      defaultValue: [9.993682, 53.551086],
      admin: {
        components: {
          Field: '@/components/LocationSearchField',
        },
      },
    },
  ],
}
