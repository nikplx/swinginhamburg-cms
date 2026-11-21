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

    const startOverride = isTimeString(exception.startTime)
    const endOverride = isTimeString(exception.endTime)
    const startTime = startOverride ? exception.startTime! : base.startTime
    const start = zonedTimeToUtc(date, startTime)

    let end: Date
    if (startOverride && !endOverride) {
      // Only the start moved: keep the regular duration instead of reading the
      // unchanged end time as "past midnight".
      const durationMinutes =
        (minutesOfTime(base.endTime) - minutesOfTime(base.startTime) + 1440) % 1440
      end = new Date(start.getTime() + durationMinutes * 60_000)
    } else {
      const endTime = endOverride ? exception.endTime! : base.endTime
      // An end time earlier than the start time means the event runs past
      // midnight, so it ends on the following local day.
      const endDate =
        minutesOfTime(endTime) < minutesOfTime(startTime) ? addLocalDays(date, 1) : date
      end = zonedTimeToUtc(endDate, endTime)
    }

    const occurrence: Occurrence = {
      eventId: event.id,
      date,
      start: start.toISOString(),
      end: end.toISOString(),
      cancelled: exception.cancelled === true,
      allDay: !base.hasTime && !startOverride,
    }
    if (exception.note) occurrence.note = exception.note
    return occurrence
  })
}
