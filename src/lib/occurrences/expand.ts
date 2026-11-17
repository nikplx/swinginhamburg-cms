import { datesBetween, timesForDate } from './schedule'
import type { ScheduleValue } from './types'
import type { ExceptionsMap, Occurrence } from './types'
import { addLocalDays, isTimeString, minutesOfTime, zonedTimeToUtc } from './time'

export interface ExpandableEvent {
  id: number | string
  schedule?: null | ScheduleValue
  exceptions?: null | ExceptionsMap
}

/**
 * Expand an event into concrete occurrences inside [from, to] (local dates).
 *
 * Pure function: the admin preview and the public endpoint both call this, so
 * they can never disagree about what the schedule means.
 */
export function expand(
  event: ExpandableEvent,
  from: string,
  to: string,
): Occurrence[] {
  const dates = datesBetween(event.schedule ?? undefined, from, to)
  const exceptions = event.exceptions ?? {}

  return dates.map((date) => {
    const base = timesForDate(event.schedule ?? undefined, date)
    const exception = exceptions[date] ?? {}

    const startTime = isTimeString(exception.startTime)
      ? exception.startTime
      : base.startTime
    const endTime = isTimeString(exception.endTime) ? exception.endTime : base.endTime

    const start = zonedTimeToUtc(date, startTime)
    // An end time earlier than the start time means the event runs past
    // midnight, so it ends on the following local day.
    const endDate =
      minutesOfTime(endTime) < minutesOfTime(startTime)
        ? addLocalDays(date, 1)
        : date
    const end = zonedTimeToUtc(endDate, endTime)

    const occurrence: Occurrence = {
      eventId: event.id,
      date,
      start: start.toISOString(),
      end: end.toISOString(),
      cancelled: exception.cancelled === true,
    }
    if (exception.note) occurrence.note = exception.note
    return occurrence
  })
}
