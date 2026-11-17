import type { CollectionBeforeChangeHook, CollectionBeforeValidateHook } from 'payload'
import { firstAndLast, scheduleProblems } from '@/lib/occurrences/schedule'
import type { ScheduleValue } from '@/lib/occurrences/types'
import { pruneExceptions } from '@/lib/occurrences/prune'
import { todayLocal } from '@/lib/occurrences/time'

const toPayloadDate = (date: null | string) =>
  date ? `${date}T00:00:00.000Z` : null

const hookError = (message: string, req: any, path: string) => {
  req.payload.logger.error(message)
  throw new Error(message)
}

/**
 * Runs before validation so that derived bounds and pruned exceptions are
 * already part of the payload that validation sees.
 */
export const prepareEvent: CollectionBeforeValidateHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  const next = { ...data }

  // Prefill the event location from the first organizer's default location
  // when an organizer has been picked but no address was entered yet.
  if (operation === 'create') {
    const organizers = Array.isArray(next.organizers) ? next.organizers : []
    const firstOrganizer = organizers[0]
    const organizerId =
      typeof firstOrganizer === 'object' && firstOrganizer !== null
        ? firstOrganizer.id
        : firstOrganizer

    if (organizerId) {
      try {
        const organization = await req.payload.findByID({
          collection: 'organizations',
          id: organizerId,
          depth: 0,
          req,
        })
        const defaults = organization?.defaultLocation
        const current = next.location ?? {}
        const hasAddress = Boolean(current.address || current.name)
        if (defaults && !hasAddress) {
          next.location = { ...defaults, ...current }
        }
      } catch {
        // A missing/unreadable organization is a validation concern elsewhere;
        // do not block saving just because the prefill failed.
      }
    }
  }

  return next
}

export const deriveEventFields: CollectionBeforeChangeHook = async ({
  data,
  req,
  originalDoc,
}) => {
  const next = { ...data }
  const schedule = next.schedule as ScheduleValue | undefined

  const problems = scheduleProblems(schedule)
  if (problems.length) {
    hookError(problems.join('; '), req, 'schedule')
  }

  const { firstDate, lastDate } = firstAndLast(schedule)
  next.firstDate = toPayloadDate(firstDate)
  // Empty for open-ended rules; that is what makes the prefilter work.
  next.lastDate = toPayloadDate(lastDate)

  // Exceptions are the single source of truth for cancellations. Pruning here
  // guarantees it holds for REST, Local API and the admin alike.
  next.exceptions = pruneExceptions(
    schedule,
    next.exceptions as any,
    todayLocal(),
  )

  return next
}
