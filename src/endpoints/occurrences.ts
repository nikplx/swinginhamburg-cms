import type { Endpoint, PayloadRequest, Where } from 'payload'
import { expand } from '@/lib/occurrences/expand'
import { getCached, setCached } from '@/lib/occurrences/cache'
import { addLocalDays, daysBetween, isDateString, todayLocal } from '@/lib/occurrences/time'
import {
  EVENT_TYPES,
  type EventType,
  type ExceptionsMap,
  type Occurrence,
  type OccurrencesResponse,
  type PublicEventSummary,
  type PublicLocation,
} from '@/lib/occurrences/types'

/** The frontend calendar asks for 12 months starting on the 1st of a month. */
const MAX_RANGE_DAYS = 400
const LOCALES = ['de', 'en'] as const
type Locale = (typeof LOCALES)[number]

async function resolveRelationId(
  req: PayloadRequest,
  collection: 'dances' | 'organizations',
  value: string,
): Promise<number | string | undefined> {
  if (/^\d+$/.test(value)) return Number(value)
  const result = await req.payload.find({
    collection,
    where: { slug: { equals: value } },
    limit: 1,
    depth: 0,
    req,
  })
  return result.docs[0]?.id
}

/** Whitelist: new fields in the location group are not published by accident. */
function publicLocation(location: any): PublicLocation | null {
  if (!location) return null
  const { name, street, houseNumber, postcode, district, city, address, lat, lng, directionsNote } =
    location
  return { name, street, houseNumber, postcode, district, city, address, lat, lng, directionsNote }
}

export const occurrencesEndpoint: Endpoint = {
  path: '/occurrences',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    const query = req.query ?? {}
    const first = (value: unknown) => (Array.isArray(value) ? value[0] : value)
    const today = todayLocal()

    const fromParam = String(first(query.from) ?? '')
    const toParam = String(first(query.to) ?? '')
    const from = isDateString(fromParam) ? fromParam : today
    const to = isDateString(toParam) ? toParam : addLocalDays(from, 60)
    if (to < from) {
      return Response.json({ error: '"to" must be on or after "from"' }, { status: 400 })
    }
    if (daysBetween(from, to) > MAX_RANGE_DAYS) {
      return Response.json(
        { error: `the range must not exceed ${MAX_RANGE_DAYS} days` },
        { status: 400 },
      )
    }

    const typeParam = first(query.type)
    const type = EVENT_TYPES.includes(typeParam as EventType)
      ? (typeParam as EventType)
      : undefined
    const danceStyleParam = first(query.danceStyle) ?? first(query.danceStyleId)
    const organizationParam = first(query.organization) ?? first(query.organizationId)
    const localeParam = first(query.locale)
    const locale: Locale = LOCALES.includes(localeParam as Locale) ? (localeParam as Locale) : 'de'


    const danceStyleId = danceStyleParam
      ? await resolveRelationId(req, 'dances', String(danceStyleParam))
      : undefined
    const organizationId = organizationParam
      ? await resolveRelationId(req, 'organizations', String(organizationParam))
      : undefined

    // An unknown slug/ID must not silently disable the filter.
    if (
      (danceStyleParam && danceStyleId === undefined) ||
      (organizationParam && organizationId === undefined)
    ) {
      return Response.json({ events: {}, occurrences: [] } satisfies OccurrencesResponse)
    }

    const cacheKey = JSON.stringify({
      from,
      to,
      type: type ?? null,
      danceStyleId: danceStyleId ?? null,
      organizationId: organizationId ?? null,
      locale,
    })
    const cached = getCached<OccurrencesResponse>(cacheKey)
    if (cached) return Response.json(cached)

    // Only events whose derived bounds overlap the range can contribute
    // occurrences. Open-ended rules have no lastDate.
    const and: Where[] = [
      { _status: { equals: 'published' } },
      { firstDate: { less_than_equal: `${to}T23:59:59.999Z` } },
      {
        or: [
          { lastDate: { greater_than_equal: `${from}T00:00:00.000Z` } },
          { lastDate: { exists: false } },
        ],
      },
    ]
    if (type) and.push({ type: { equals: type } })
    if (organizationId !== undefined) {
      and.push({ organizers: { in: [organizationId] } })
    }
    if (danceStyleId !== undefined) {
      // Events without any dance style are still relevant: the frontend groups
      // them as "alle Stile / nicht angegeben".
      and.push({
        or: [
          { danceStyles: { in: [danceStyleId] } },
          { danceStyles: { exists: false } },
        ],
      })
    }

    const { docs } = await req.payload.find({
      collection: 'events',
      where: { and },
      depth: 1,
      pagination: false,
      locale,
      req,
    })

    const events: OccurrencesResponse['events'] = {}
    const occurrences: Occurrence[] = []
    for (const event of docs) {
      const expanded = expand(
        {
          id: event.id,
          schedule: event.schedule as any,
          exceptions: event.exceptions as ExceptionsMap,
        },
        from,
        to,
      )

      const summary: PublicEventSummary = {
        id: event.id,
        title: event.title,
        type: event.type as EventType,
        level: event.level,
        description: event.description,
        organizers: (event.organizers ?? []).map((organizer) =>
          typeof organizer === 'object' && organizer !== null
            ? {
                id: organizer.id,
                name: organizer.name,
                slug: organizer.slug,
              }
            : { id: organizer },
        ),
        danceStyles: (event.danceStyles ?? []).map((style) =>
          typeof style === 'object' && style !== null
            ? {
                id: style.id,
                name: style.name,
                shortName: style.shortName,
                slug: style.slug,
              }
            : { id: style },
        ),
        location: publicLocation(event.location),
        firstDate: event.firstDate,
        lastDate: event.lastDate,
      }

      if (!expanded.length) continue
      events[String(event.id)] = summary
      occurrences.push(...expanded)
    }

    occurrences.sort(
      (a, b) => a.start.localeCompare(b.start) || String(a.eventId).localeCompare(String(b.eventId)),
    )

    const body: OccurrencesResponse = { events, occurrences }
    setCached(cacheKey, body)
    return Response.json(body)
  },
}
