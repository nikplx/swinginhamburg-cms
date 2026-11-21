import type { Field, FieldHook, GroupField } from 'payload'
import { formatAddress, hasAddressParts, type AddressParts } from '@/lib/location'

/**
 * Structured location used both by `events.location` and
 * `organizations.defaultLocation`. There is deliberately no venues collection.
 *
 * The address search fills the address parts and the (hidden) coordinates.
 * Parts stay editable so editors can fix e.g. a missing house number; the
 * one-line `address` is always derived from them on the server.
 */

const PART_KEYS = ['street', 'houseNumber', 'postcode', 'district', 'city'] as const

/**
 * Derive `address` from the parts. Rows saved before the parts existed only
 * have Nominatim's long display name in `address`; that is kept until the
 * address is picked again (or backfilled, see scripts/backfill-addresses.ts).
 */
const deriveAddress: FieldHook = ({ siblingData, value }) => {
  const parts = siblingData as AddressParts | undefined
  if (parts && hasAddressParts(parts)) return formatAddress(parts)
  return value
}

const requireCoordinates = (_value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
  const hasAddress =
    Boolean(siblingData?.address) || PART_KEYS.some((key) => Boolean(siblingData?.[key]))
  if (!hasAddress) return true
  return typeof siblingData?.lat === 'number' && typeof siblingData?.lng === 'number'
    ? true
    : 'Bitte die Adresse über die Suche auswählen, damit Koordinaten gesetzt werden. / Please pick the address from the search so coordinates are set.'
}

const partField = (
  name: (typeof PART_KEYS)[number],
  labelDe: string,
  labelEn: string,
  width: string,
): Field => ({
  name,
  type: 'text',
  label: { de: labelDe, en: labelEn },
  admin: { width },
})

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
      name: 'name',
      type: 'text',
      label: { de: 'Name des Ortes', en: 'Venue name' },
    },
    {
      type: 'row',
      fields: [
        partField('street', 'Straße', 'Street', '70%'),
        partField('houseNumber', 'Hausnummer', 'House number', '30%'),
      ],
    },
    {
      type: 'row',
      fields: [
        partField('postcode', 'PLZ', 'Postal code', '25%'),
        partField('city', 'Ort', 'City', '35%'),
        partField('district', 'Stadtteil', 'District', '40%'),
      ],
    },
    {
      name: 'address',
      type: 'text',
      label: { de: 'Adresse', en: 'Address' },
      admin: {
        readOnly: true,
        description: {
          de: 'Wird aus den Feldern oben zusammengesetzt.',
          en: 'Composed from the fields above.',
        },
      },
      hooks: { beforeValidate: [deriveAddress] },
      validate: requireCoordinates,
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
