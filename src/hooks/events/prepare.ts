import type {
  CollectionBeforeChangeHook,
  CollectionBeforeDeleteHook,
  CollectionBeforeValidateHook,
} from 'payload'
import { APIError, ValidationError } from 'payload'
import { isAtLeastWriterUser, memberOrganizationIDs } from '@/access'
import { firstAndLast, scheduleProblems } from '@/lib/occurrences/schedule'
import { CLASS_LIKE_TYPES, type EventType, type ScheduleValue } from '@/lib/occurrences/types'
import { pruneExceptions } from '@/lib/occurrences/prune'
import { todayLocal } from '@/lib/occurrences/time'

const toPayloadDate = (date: null | string) =>
  date ? `${date}T00:00:00.000Z` : null

const relationIDs = (value: unknown): (number | string)[] =>
  (Array.isArray(value) ? value : []).map((entry: any) =>
    entry && typeof entry === 'object' ? entry.id : entry,
  )

const isFilled = (value: unknown) => value !== null && value !== undefined && value !== ''

/**
 * Prefill the event location from the first organizer's default location when
 * an organizer has been picked but no address was entered yet.
 */
export const prepareEvent: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  const next = { ...data }
  if (operation !== 'create') return next

  const [organizerId] = relationIDs(next.organizers)
  if (!organizerId) return next

  try {
    const organization = await req.payload.findByID({
      collection: 'organizations',
      id: organizerId,
      depth: 0,
      req,
    })
    const defaults = organization?.defaultLocation
    // The admin form submits every location key, mostly as null. Only keep
    // what the editor actually entered, so nulls do not mask the defaults.
    const current = Object.fromEntries(
      Object.entries(next.location ?? {}).filter(([, value]) => isFilled(value)),
    )
    if (defaults && !current.address && !current.name) {
      next.location = { ...defaults, ...current }
    }
  } catch {
    // A missing/unreadable organization is a validation concern elsewhere;
    // do not block saving just because the prefill failed.
  }

  return next
}

/**
 * Preventing lower-role users from filing events under someone else's
 * organization cannot be expressed as create access: the admin create view
 * checks access before any organizer has been picked, so a data-dependent rule
 * would hide the form entirely. Enforce it here instead.
 *
 * Runs for drafts too (drafts skip field validation), so an empty organizer
 * list is rejected here: it would create an event the author cannot see.
 */
export const enforceEventOrganizerScope: CollectionBeforeValidateHook = async ({
  collection,
  data,
  operation,
  req,
}) => {
  if (operation !== 'create') return data

  const user = req.user as any
  if (!user || isAtLeastWriterUser(user)) return data

  const organizers = relationIDs(data?.organizers)
  if (!organizers.length) {
    throw new ValidationError({
      collection: collection.slug,
      errors: [
        {
          path: 'organizers',
          message: 'Mindestens eine Organisation angeben. / Select at least one organizer.',
        },
      ],
      req,
    })
  }

  const organizationIDs = await memberOrganizationIDs(req)
  const foreign = organizers.filter((id) => !organizationIDs.includes(id))

  if (foreign.length) {
    throw new APIError(
      'Du kannst nur Veranstaltungen für Organisationen anlegen, denen du zugeordnet bist. / You can only create events for organizations you are linked to.',
      403,
    )
  }

  return data
}

/**
 * Derives the prefilter bounds and prunes exceptions.
 *
 * Collection beforeChange hooks see only the submitted fields on a partial
 * update, so every input falls back to the stored document.
 */
export const deriveEventFields: CollectionBeforeChangeHook = ({
  collection,
  data,
  originalDoc,
  req,
}) => {
  const next = { ...data }
  const schedule = (next.schedule ?? originalDoc?.schedule) as ScheduleValue | undefined
  const exceptions = next.exceptions === undefined ? originalDoc?.exceptions : next.exceptions
  const type = (next.type ?? originalDoc?.type) as EventType | undefined

  // `level` only applies to class-like types; clear it when the type changes.
  if (type && !CLASS_LIKE_TYPES.includes(type)) next.level = null

  const problems = scheduleProblems(schedule)
  if (problems.length) {
    // Drafts skip field validation and may be incomplete. They are never
    // public, so empty bounds are fine until the schedule is complete.
    if (next._status === 'draft') {
      next.firstDate = null
      next.lastDate = null
      return next
    }
    throw new ValidationError({
      collection: collection.slug,
      errors: [{ path: 'schedule', message: problems.join('; ') }],
      req,
    })
  }

  const { firstDate, lastDate } = firstAndLast(schedule)
  next.firstDate = toPayloadDate(firstDate)
  // Empty for open-ended rules; that is what makes the prefilter work.
  next.lastDate = toPayloadDate(lastDate)

  // Exceptions are the single source of truth for cancellations. Pruning here
  // guarantees it holds for REST, Local API and the admin alike.
  next.exceptions = pruneExceptions(schedule, exceptions, todayLocal())

  return next
}

/**
 * Delete access lets linked users reach events of their organizations. A
 * co-hosted event additionally belongs to other organizations, so lower roles
 * may only delete it when they are linked to every organizer.
 */
export const restrictEventDelete: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const user = req.user as any
  if (!user || isAtLeastWriterUser(user)) return

  const event = await req.payload.findByID({
    collection: 'events',
    id,
    depth: 0,
    draft: true,
    overrideAccess: true,
    req,
  })
  const organizationIDs = await memberOrganizationIDs(req)
  const foreign = relationIDs(event.organizers).filter((orgId) => !organizationIDs.includes(orgId))

  if (foreign.length) {
    throw new APIError(
      'Gemeinsame Veranstaltungen können nur von der Redaktion gelöscht werden. / Co-hosted events can only be deleted by writers.',
      403,
    )
  }
}
