import type { Endpoint, PayloadRequest, Where } from 'payload'
import { expand } from '@/lib/occurrences/expand'
import { getCached, setCached } from '@/lib/occurrences/cache'
import { addLocalDays, isDateString, todayLocal } from '@/lib/occurrences/time'
import type { ExceptionsMap, Occurrence } from '@/lib/occurrences/types'
import { EVENT_TYPES, type EventType } from '@/lib/occurrences/types'

export interface PublicEventSummary {
  id: number | string
  title: string
  type: EventType
  level?: null | string
  description?: unknown
  organizers: { id: number | string; name?: string; slug?: string }[]
  danceStyles: {
    id: number | string
    name?: string
    shortName?: string
    slug?: string
  }[]
  location?: {
    name?: null | string
    address?: null | string
    lat?: null | number
    lng?: null | number
    directionsNote?: null | string
  } | null
  firstDate?: null | string
  lastDate?: null | string
}

export interface PublicOccurrence extends Occurrence {
  event: PublicEventSummary
}

const asId = (value: unknown): number | string | undefined =>
  typeof value === 'object' && value !== null
    ? ((value as any).id as number | string)
    : (value as number | string | undefined)

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

    const typeParam = first(query.type)
    const type = EVENT_TYPES.includes(typeParam as EventType)
      ? (typeParam as EventType)
      : undefined
    const danceStyleParam = first(query.danceStyle) ?? first(query.danceStyleId)
    const organizationParam = first(query.organization) ?? first(query.organizationId)
    const locale = String(first(query.locale) ?? 'de')

    const danceStyleId = danceStyleParam
      ? await resolveRelationId(req, 'dances', String(danceStyleParam))
      : undefined
    const organizationId = organizationParam
      ? await resolveRelationId(req, 'organizations', String(organizationParam))
      : undefined

    const cacheKey = JSON.stringify({
      from,
      to,
      type: type ?? null,
      danceStyleId: danceStyleId ?? null,
      organizationId: organizationId ?? null,
      locale,
    })
    const cached = getCached<{ occurrences: PublicOccurrence[] }>(cacheKey)
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
      locale: locale as any,
      req,
    })

    const occurrences: PublicOccurrence[] = []
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
        location: event.location ?? null,
        firstDate: event.firstDate,
        lastDate: event.lastDate,
      }

      for (const occurrence of expanded) {
        occurrences.push({ ...occurrence, event: summary })
      }
    }

    occurrences.sort(
      (a, b) => a.start.localeCompare(b.start) || String(a.eventId).localeCompare(String(b.eventId)),
    )

    const payload = { occurrences }
    setCached(cacheKey, payload)
    return Response.json(payload)
  },
}
