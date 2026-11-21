/**
 * Structured addresses for `events.location` and
 * `organizations.defaultLocation`.
 *
 * Payload-free: used by the admin address picker, the field hooks, the
 * backfill script and (as types) the frontend.
 */

export interface AddressParts {
  street?: null | string
  houseNumber?: null | string
  postcode?: null | string
  /** Hamburg Stadtteil, e.g. "Sternschanze". */
  district?: null | string
  city?: null | string
}

/** The subset of a Nominatim result (`addressdetails=1`) we rely on. */
export interface NominatimResult {
  display_name: string
  lat: string
  lon: string
  /** Name of the matched feature (venue, building), if any. */
  name?: string
  address?: Record<string, string | undefined>
}

const first = (...values: (string | undefined)[]) => values.find((value) => value?.trim())?.trim()

/**
 * Maps Nominatim's address details to our parts. Nominatim's keys vary by
 * place type (a park has no house number, a village no city), hence the
 * fallbacks. For Hamburg, `suburb` is the Stadtteil and `city_district` the
 * Bezirk; the Stadtteil is the more useful label.
 */
export function partsFromNominatim(result: NominatimResult): AddressParts {
  const a = result.address ?? {}
  return {
    street: first(a.road, a.pedestrian, a.footway, a.path, a.square, a.place) ?? null,
    houseNumber: first(a.house_number) ?? null,
    postcode: first(a.postcode) ?? null,
    district: first(a.suburb, a.quarter, a.neighbourhood, a.city_district, a.borough) ?? null,
    city: first(a.city, a.town, a.village, a.municipality, a.state) ?? null,
  }
}

/**
 * Venue name suggested by a Nominatim result: the feature's own name, unless
 * it is just the street (Nominatim names plain addresses after the road).
 */
export function venueNameFromNominatim(result: NominatimResult): null | string {
  const name = result.name?.trim()
  if (!name) return null
  return name === partsFromNominatim(result).street ? null : name
}

/** "Schulterblatt 73" */
export function streetLine(parts: AddressParts): string {
  return [parts.street, parts.houseNumber].filter(Boolean).join(' ')
}

/** "Schulterblatt 73, 20357 Hamburg" — empty when no part is set. */
export function formatAddress(parts: AddressParts): string {
  const place = [parts.postcode, parts.city].filter(Boolean).join(' ')
  return [streetLine(parts), place].filter(Boolean).join(', ')
}

export const hasAddressParts = (parts: AddressParts): boolean =>
  Boolean(parts.street || parts.houseNumber || parts.postcode || parts.district || parts.city)
