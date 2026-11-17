// rrule is CommonJS. Native Node ESM (used by the Payload CLI) only exposes it
// as the default export, while webpack can expose the names directly. Resolve
// both shapes without pulling in a bundler-specific helper. The default key is
// read dynamically so webpack does not warn about a missing named default.
import * as rrulePkg from 'rrule'
import type { RRule as RRuleClass, RRuleSet as RRuleSetClass, Weekday } from 'rrule'

const defaultExportKey = 'default'
const rruleDefault = (rrulePkg as any)[defaultExportKey]
const rruleModule: any = (rrulePkg as any).RRule ? rrulePkg : (rruleDefault ?? rrulePkg)

const RRule: typeof RRuleClass = rruleModule.RRule
const RRuleSet: typeof RRuleSetClass = rruleModule.RRuleSet
import {
  addLocalDays,
  endOfLocalDay,
  isDateString,
  isTimeString,
  localDateToUtcShape,
  localWeekdayIndex,
  startOfLocalDay,
  toLocalDateValue,
  utcShapeToLocalDate,
} from './time'
import type {
  CourseBlock,
  DatesBlock,
  OnceBlock,
  RecurringBlock,
  ScheduleBlock,
  ScheduleValue,
  TimeString,
  WeekdayCode,
} from './types'

export const RRULE_WEEKDAYS: Record<WeekdayCode, Weekday> = {
  MO: RRule.MO,
  TU: RRule.TU,
  WE: RRule.WE,
  TH: RRule.TH,
  FR: RRule.FR,
  SA: RRule.SA,
  SU: RRule.SU,
}

const WEEKDAY_BY_INDEX: WeekdayCode[] = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

export function weekdayCodeForDate(date: string): WeekdayCode {
  return WEEKDAY_BY_INDEX[localWeekdayIndex(date)]
}

export interface OccurrenceTimes {
  startTime: TimeString
  endTime: TimeString
}

export const DEFAULT_START_TIME = '00:00'

const daysInMonth = (year: number, monthIndex: number) =>
  new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate()

function matchesNthWeekday(date: string, nth: number, weekday: WeekdayCode): boolean {
  if (weekdayCodeForDate(date) !== weekday) return false
  const [year, month, day] = date.split('-').map(Number)
  if (nth === -1) return day + 7 > daysInMonth(year, month - 1)
  return Math.ceil(day / 7) === nth
}

/**
 * The DTSTART of a recurrence must itself be produced by the rule. Rather than
 * trusting the organizer's chosen start date, walk forward to the first date
 * the configured rule really matches.
 */
function firstMatchingDate(block: RecurringBlock): string {
  let cursor = toLocalDateValue(block.startDate) ?? block.startDate
  // A malformed block should not spin forever; 5 years is far beyond any
  // realistic schedule and keeps bad data visible as a validation error.
  for (let i = 0; i < 366 * 5; i += 1) {
    if (block.frequency === 'weekly') {
      const weekdays = (block.weekdays ?? []) as WeekdayCode[]
      if (weekdays.length && weekdays.includes(weekdayCodeForDate(cursor))) return cursor
    } else if (block.monthlyMode === 'nthWeekday') {
      const nth = block.nthWeekday ?? 1
      const weekday = block.weekday
      if (weekday && matchesNthWeekday(cursor, Number(nth), weekday)) return cursor
    } else if (block.dayOfMonth) {
      if (Number(cursor.slice(8)) === Number(block.dayOfMonth)) return cursor
    }
    cursor = addLocalDays(cursor, 1)
  }
  return toLocalDateValue(block.startDate) ?? block.startDate
}

/** Sessions of a course, with skipped dates omitted but the count preserved. */
export function courseDates(block: CourseBlock): string[] {
  const sessions = Math.max(0, Math.floor(Number(block.sessions) || 0))
  const startDate = toLocalDateValue(block.startDate)
  if (!sessions || !startDate) return []

  let cursor = startDate
  // The start date is a "from" date; if it is not on the course weekday, the
  // first session is the next matching weekday.
  for (let i = 0; i < 7 && weekdayCodeForDate(cursor) !== block.weekday; i += 1) {
    cursor = addLocalDays(cursor, 1)
  }

  const skipped = new Set(
    (block.skipDates ?? [])
      .map((entry) => entry?.date)
      .map((date) => toLocalDateValue(date))
      .filter((date): date is string => Boolean(date)),
  )

  const dates: string[] = []
  // Guard against pathological data (e.g. every date skipped).
  for (let i = 0; dates.length < sessions && i < sessions * 4 + 260; i += 1) {
    if (!skipped.has(cursor)) dates.push(cursor)
    cursor = addLocalDays(cursor, 7)
  }
  return dates
}

/**
 * Build the RRuleSet for a schedule.
 *
 * - once/dates/course are explicit RDATEs.
 * - recurring is one RRULE.
 * - Cancellations are never EXDATEs; they live in the exceptions map only.
 */
export function buildRuleset(block: ScheduleBlock): RRuleSetClass {
  const set = new RRuleSet()

  if (block.blockType === 'once') {
    const date = toLocalDateValue(block.date)
    if (date) set.rdate(localDateToUtcShape(date))
    return set
  }

  if (block.blockType === 'dates') {
    for (const entry of block.dates ?? []) {
      const date = toLocalDateValue(entry?.date)
      if (date) set.rdate(localDateToUtcShape(date))
    }
    return set
  }

  if (block.blockType === 'course') {
    for (const date of courseDates(block)) {
      set.rdate(localDateToUtcShape(date))
    }
    return set
  }

  const dtstart = firstMatchingDate(block)
  if (!isDateString(dtstart)) return set

  const options: ConstructorParameters<typeof RRule>[0] = {
    dtstart: localDateToUtcShape(dtstart),
    interval: Math.max(1, Math.floor(Number(block.interval) || 1)),
  }

  if (block.frequency === 'weekly') {
    options.freq = RRule.WEEKLY
    const weekdays = (block.weekdays ?? []) as WeekdayCode[]
    options.byweekday = weekdays.map((code) => RRULE_WEEKDAYS[code]).filter(Boolean)
  } else {
    options.freq = RRule.MONTHLY
    if (block.monthlyMode === 'nthWeekday') {
      options.byweekday = block.weekday ? [RRULE_WEEKDAYS[block.weekday]] : []
      options.bysetpos = [Number(block.nthWeekday ?? 1)]
    } else {
      options.bymonthday = [Number(block.dayOfMonth ?? 1)]
    }
  }

  const until = toLocalDateValue(block.until)
  if (block.endMode === 'until' && until) {
    options.until = endOfLocalDay(until)
  } else if (block.endMode === 'count' && Number(block.count) > 0) {
    options.count = Math.floor(Number(block.count))
  }

  set.rrule(new RRule(options))
  return set
}

/** All local dates the schedule produces inside [from, to] (inclusive). */
export function datesBetween(
  schedule: ScheduleValue | undefined,
  from: string,
  to: string,
): string[] {
  const block = getBlock(schedule)
  if (!block) return []
  const set = buildRuleset(block)
  const dates = set
    .between(startOfLocalDay(from), endOfLocalDay(to), true)
    .map(utcShapeToLocalDate)
  return [...new Set(dates)].sort()
}

export function getBlock(schedule: ScheduleValue | undefined): ScheduleBlock | undefined {
  if (!Array.isArray(schedule) || schedule.length === 0) return undefined
  return schedule[0]
}

export function timesForDate(
  schedule: ScheduleValue | undefined,
  date: string,
): OccurrenceTimes {
  const block = getBlock(schedule)
  if (!block) return { startTime: DEFAULT_START_TIME, endTime: DEFAULT_START_TIME }

  let startTime: null | string | undefined
  let endTime: null | string | undefined

  if (block.blockType === 'once') {
    if (toLocalDateValue(block.date) === date) {
      startTime = block.startTime
      endTime = block.endTime
    }
  } else if (block.blockType === 'dates') {
    const entry = (block.dates ?? []).find(
      (item) => toLocalDateValue(item?.date) === date,
    )
    startTime = entry?.startTime
    endTime = entry?.endTime
  } else {
    startTime = block.startTime
    endTime = block.endTime
  }

  const safeStart = isTimeString(startTime) ? startTime : DEFAULT_START_TIME
  const safeEnd = isTimeString(endTime) ? endTime : safeStart
  return { startTime: safeStart, endTime: safeEnd }
}

export interface FirstLast {
  firstDate: null | string
  lastDate: null | string
}

/**
 * Derived bounds used to prefilter events in the database. `lastDate` stays
 * empty for open-ended recurrences.
 */
export function firstAndLast(schedule: ScheduleValue | undefined): FirstLast {
  const block = getBlock(schedule)
  if (!block) return { firstDate: null, lastDate: null }

  if (block.blockType === 'once') {
    const date = toLocalDateValue(block.date)
    return date ? { firstDate: date, lastDate: date } : { firstDate: null, lastDate: null }
  }

  if (block.blockType === 'dates') {
    const dates = (block.dates ?? [])
      .map((entry) => toLocalDateValue(entry?.date))
      .filter((date): date is string => Boolean(date))
      .sort()
    if (!dates.length) return { firstDate: null, lastDate: null }
    return { firstDate: dates[0], lastDate: dates[dates.length - 1] }
  }

  if (block.blockType === 'course') {
    const dates = courseDates(block)
    if (!dates.length) return { firstDate: null, lastDate: null }
    return { firstDate: dates[0], lastDate: dates[dates.length - 1] }
  }

  const set = buildRuleset(block)
  const epoch = new Date(Date.UTC(1970, 0, 1))
  const first = set.after(epoch, true)
  if (!first) return { firstDate: null, lastDate: null }

  if (block.endMode === 'never') {
    return { firstDate: utcShapeToLocalDate(first), lastDate: null }
  }

  if (block.endMode === 'until') {
    const until = toLocalDateValue(block.until)
    const last = until ? set.before(endOfLocalDay(until), true) : null
    return {
      firstDate: utcShapeToLocalDate(first),
      lastDate: last ? utcShapeToLocalDate(last) : null,
    }
  }

  const all = set.all()
  return {
    firstDate: utcShapeToLocalDate(first),
    lastDate: all.length ? utcShapeToLocalDate(all[all.length - 1]) : null,
  }
}

/** Structural checks used by both the admin component and the server. */
export function scheduleProblems(schedule: ScheduleValue | undefined): string[] {
  const problems: string[] = []
  if (!Array.isArray(schedule) || schedule.length !== 1) {
    return ['Genau ein Zeitplan-Block wird benötigt / Exactly one schedule block is required']
  }
  const block = schedule[0]

  if (block.blockType === 'once') {
    if (!toLocalDateValue(block.date)) problems.push('Datum fehlt / date is missing')
  } else if (block.blockType === 'dates') {
    if (!block.dates?.length) problems.push('Mindestens ein Termin / at least one date')
  } else if (block.blockType === 'course') {
    if (!toLocalDateValue(block.startDate)) problems.push('Startdatum fehlt / start date missing')
    if (!(Number(block.sessions) > 0)) problems.push('Anzahl Termine / number of sessions')
  } else {
    if (!toLocalDateValue(block.startDate)) problems.push('Startdatum fehlt / start date missing')
    if (block.frequency === 'weekly' && !block.weekdays?.length) {
      problems.push('Wochentag fehlt / weekday missing')
    }
    if (block.frequency === 'monthly') {
      if (block.monthlyMode === 'nthWeekday' && (!block.weekday || !block.nthWeekday)) {
        problems.push('Monatsregel unvollständig / monthly rule incomplete')
      }
      if (block.monthlyMode !== 'nthWeekday' && !block.dayOfMonth) {
        problems.push('Tag im Monat fehlt / day of month missing')
      }
    }
    if (block.endMode === 'until' && !toLocalDateValue(block.until)) {
      problems.push('Enddatum fehlt / end date missing')
    }
    if (block.endMode === 'count' && !(Number(block.count) > 0)) {
      problems.push('Anzahl fehlt / count missing')
    }
  }

  const timeProblem = (time: unknown) =>
    time !== null && time !== undefined && time !== '' && !isTimeString(time)

  if (timeProblem((block as OnceBlock).startTime) || timeProblem((block as OnceBlock).endTime)) {
    problems.push('Ungültige Uhrzeit / invalid time')
  }

  return problems
}

