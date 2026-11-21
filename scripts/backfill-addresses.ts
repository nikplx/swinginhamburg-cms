/**
 * Fills the structured address parts for locations saved before they existed
 * (those only have Nominatim's long display name in `address`).
 *
 *   npm run backfill:addresses -- --dry-run   # show what would change
 *   npm run backfill:addresses
 *
 * The stored display name came from Nominatim, so searching it again returns
 * the same place, now with `addressdetails`; a match within 150 m of the
 * stored coordinates is accepted. Otherwise (long roads, whose search point
 * is far from the picked one) a reverse lookup at the stored coordinates is
 * used if its street appears in the stored text. Anything else is reported
 * and skipped. Coordinates are never changed.
 *
 * Nominatim's usage policy allows at most one request per second.
 */
import { getPayload } from 'payload'
import config from '../src/payload.config'
import {
  formatAddress,
  hasAddressParts,
  partsFromNominatim,
  type NominatimResult,
} from '../src/lib/location'

const DRY_RUN = process.argv.includes('--dry-run')
const MAX_DISTANCE_M = 150
const USER_AGENT = 'swinginhamburg-cms address backfill'

interface StoredLocation {
  address?: null | string
  lat?: null | number
  lng?: null | number
  street?: null | string
  city?: null | string
  [key: string]: unknown
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function distanceM(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const rad = Math.PI / 180
  const dLat = (lat2 - lat1) * rad
  const dLng = (lng2 - lng1) * rad
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2
  return 6_371_000 * 2 * Math.asin(Math.sqrt(a))
}

const lookups = new Map<string, NominatimResult | null>()
let lastRequest = 0
let requests = 0

async function nominatim<T>(path: 'search' | 'reverse', params: Record<string, string>): Promise<T> {
  await sleep(Math.max(0, lastRequest + 1100 - Date.now()))
  lastRequest = Date.now()
  requests += 1
  const url = new URL(`https://nominatim.openstreetmap.org/${path}`)
  url.search = new URLSearchParams({
    format: 'json',
    addressdetails: '1',
    'accept-language': 'de',
    ...params,
  }).toString()
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
  if (!response.ok) throw new Error(`Nominatim ${response.status} for ${url}`)
  return (await response.json()) as T
}

async function lookup(location: StoredLocation): Promise<NominatimResult | null> {
  const key = `${location.address}|${location.lat}|${location.lng}`
  if (lookups.has(key)) return lookups.get(key)!

  const results = await nominatim<NominatimResult[]>('search', { limit: '5', q: location.address! })
  const nearest = results
    .map((result) => ({
      result,
      distance: distanceM(location.lat!, location.lng!, Number(result.lat), Number(result.lon)),
    }))
    .sort((a, b) => a.distance - b.distance)[0]

  let match = nearest && nearest.distance <= MAX_DISTANCE_M ? nearest.result : null

  if (!match) {
    const reverse = await nominatim<NominatimResult & { error?: string }>('reverse', {
      lat: String(location.lat),
      lon: String(location.lng),
      zoom: '18',
    })
    const street = reverse.error ? null : partsFromNominatim(reverse).street
    if (street && location.address!.includes(street)) match = reverse
  }

  lookups.set(key, match)
  return match
}

const needsBackfill = (location?: StoredLocation | null): location is StoredLocation =>
  Boolean(
    location?.address &&
      typeof location.lat === 'number' &&
      typeof location.lng === 'number' &&
      !hasAddressParts(location),
  )

const payload = await getPayload({ config })
const report = { updated: 0, unmatched: [] as string[] }

async function backfill(
  collection: 'events' | 'organizations',
  field: 'location' | 'defaultLocation',
) {
  const { docs } = await payload.find({
    collection,
    depth: 0,
    pagination: false,
    overrideAccess: true,
    ...(collection === 'events' && { draft: true }),
  })

  for (const doc of docs as any[]) {
    const location: StoredLocation | undefined = doc[field]
    if (!needsBackfill(location)) continue

    const label = `${collection} ${doc.id} (${doc.title ?? doc.name})`
    const match = await lookup(location)
    if (!match) {
      report.unmatched.push(`${label}: "${location.address}"`)
      continue
    }

    const parts = partsFromNominatim(match)
    // A reverse lookup on a road returns the nearest building; keep only house
    // numbers the editor actually picked.
    const pickedTokens = location.address!.split(',').map((token) => token.trim())
    if (parts.houseNumber && !pickedTokens.includes(parts.houseNumber)) parts.houseNumber = null
    console.log(`${DRY_RUN ? '[dry-run] ' : ''}${label}\n  ${location.address}\n  → ${formatAddress(parts)} (${parts.district ?? 'no district'})`)
    if (DRY_RUN) continue

    await payload.update({
      collection,
      id: doc.id,
      overrideAccess: true,
      // Keep drafts as drafts; published documents stay published.
      ...(collection === 'events' && doc._status === 'draft' && { draft: true }),
      data: { [field]: { ...location, ...parts } },
    })
    report.updated += 1
  }
}

await backfill('events', 'location')
await backfill('organizations', 'defaultLocation')

console.log(
  DRY_RUN
    ? `\nDry run: ${requests} Nominatim requests, nothing written.`
    : `\nUpdated: ${report.updated} (${requests} Nominatim requests)`,
)
if (report.unmatched.length) {
  console.log(`No match within ${MAX_DISTANCE_M} m (pick the address again in the admin):`)
  for (const line of report.unmatched) console.log(`  - ${line}`)
}
process.exit(0)
