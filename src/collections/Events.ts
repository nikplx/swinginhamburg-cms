import { canManageClass, isAtLeastWriter, isAtLeastWriterField } from '@/access'
import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: isAtLeastWriter,
    update: isAtLeastWriter,
    delete: isAtLeastWriter,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: ['Workshop', 'Social'],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
      localized: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true, // The day is always required
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
            width: '50%',
            description: 'The day the class/party begins.',
          },
        },
        {
          name: 'startTime',
          type: 'text',
          required: false, // Time can be omitted for workshops
          admin: {
            width: '50%',
            description: 'Optional. Enter local time (e.g., 20:30).',
          },
          validate: (val: string | null | undefined) => {
            if (!val) return true // Pass validation if omitted
            const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
            if (!timeRegex.test(val)) return 'Please enter a valid time in 24h format (HH:mm)'
            return true
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'endDate',
          type: 'date',
          required: false,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
            width: '50%',
            description: 'Optional. Only needed if it ends on a different day.',
          },
        },
        {
          name: 'endTime',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
            description: 'Optional. Enter local time (e.g., 03:00).',
          },
          validate: (val: string | null | undefined) => {
            if (!val) return true
            const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
            if (!timeRegex.test(val)) return 'Please enter a valid time in 24h format (HH:mm)'
            return true
          },
        },
      ],
    },
    {
      name: 'dances',
      type: 'relationship',
      relationTo: 'dances',
      hasMany: true,
    },
    {
      name: 'price',
      type: 'number',
      required: false,
      min: 0,
      admin: {
        step: 0.01, // Allows entering decimal values like 15.50 in the UI
        description: 'Enter the price in Euros (e.g., 15.50).',
      },
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (typeof value === 'number') {
              // Convert Euros to Cents before saving
              return Math.round(value * 100)
            }
            return value
          },
        ],
        afterRead: [
          ({ value }) => {
            if (typeof value === 'number') {
              // Convert Cents to Euros when reading
              return value / 100
            }
            return value
          },
        ],
      },
    },
    {
      name: 'cancelled',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'url',
      type: 'text',
      required: false,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'locationName',
      type: 'text',
      required: false,
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
