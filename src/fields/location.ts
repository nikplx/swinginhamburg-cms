import type { GroupField } from 'payload'

/**
 * Structured location used both by `events.location` and
 * `organizations.defaultLocation`. There is deliberately no venues collection.
 */
export const locationGroup = (name: string, labelDe: string, labelEn: string): GroupField => ({
  name,
  type: 'group',
  label: { de: labelDe, en: labelEn },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { de: 'Name des Ortes', en: 'Venue name' },
    },
    {
      name: 'address',
      type: 'text',
      label: { de: 'Adresse', en: 'Address' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'lat',
          type: 'number',
          label: { de: 'Breitengrad', en: 'Latitude' },
          admin: { step: 0.000001, width: '50%' },
        },
        {
          name: 'lng',
          type: 'number',
          label: { de: 'Längengrad', en: 'Longitude' },
          admin: { step: 0.000001, width: '50%' },
        },
      ],
    },
    {
      name: 'directionsNote',
      type: 'textarea',
      label: { de: 'Wegbeschreibung', en: 'Directions' },
    },
    {
      // Client-side geocoder helper; writes into the sibling fields above.
      name: 'geocode',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/LocationPicker',
        },
      },
    },
  ],
})
