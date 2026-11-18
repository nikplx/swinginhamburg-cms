import type { GroupField } from 'payload'

/**
 * Structured location used both by `events.location` and
 * `organizations.defaultLocation`. There is deliberately no venues collection.
 *
 * Coordinates are only ever written by the address search below. The address
 * (and the hidden lat/lng) are read-only in the admin so that every address has
 * coordinates and therefore renders on the map.
 */
export const locationGroup = (name: string, labelDe: string, labelEn: string): GroupField => ({
  name,
  type: 'group',
  label: { de: labelDe, en: labelEn },
  fields: [
    {
      // Client-side geocoder helper; writes into the sibling fields below.
      name: 'geocode',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/LocationPicker',
        },
      },
    },
    {
      name: 'address',
      type: 'text',
      label: { de: 'Adresse', en: 'Address' },
      admin: {
        readOnly: true,
        description: {
          de: 'Wird über die Adresssuche gesetzt.',
          en: 'Set via the address search above.',
        },
      },
      validate: (value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
        if (!value) return true
        const lat = siblingData?.lat
        const lng = siblingData?.lng
        return typeof lat === 'number' && typeof lng === 'number'
          ? true
          : 'Bitte die Adresse über die Suche auswählen, damit Koordinaten gesetzt werden.'
      },
    },
    {
      name: 'name',
      type: 'text',
      label: { de: 'Name des Ortes', en: 'Venue name' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'lat',
          type: 'number',
          label: { de: 'Breitengrad', en: 'Latitude' },
          admin: { hidden: true },
        },
        {
          name: 'lng',
          type: 'number',
          label: { de: 'Längengrad', en: 'Longitude' },
          admin: { hidden: true },
        },
      ],
    },
    {
      name: 'directionsNote',
      type: 'textarea',
      label: { de: 'Wegbeschreibung', en: 'Directions' },
    },
  ],
})
