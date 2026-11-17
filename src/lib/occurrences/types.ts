/**
 * Pure, Payload-free types for event schedules and occurrences.
 *
 * This module is imported by the admin UI, the server and the unit tests.
 * It must never import from `payload`, `@payloadcms/*` or React.
 */

export const EVENT_TYPES = [
  'class',
  'social',
  'workshop',
  'talk',
  'walk',
  'festival',
  'other',
] as const
export type EventType = (typeof EVENT_TYPES)[number]

/** Types where a dance style is mandatory and a level is shown. */
export const CLASS_LIKE_TYPES: readonly EventType[] = ['class', 'workshop']

export const WEEKDAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'] as const
export type WeekdayCode = (typeof WEEKDAYS)[number]

export type Frequency = 'weekly' | 'monthly'
export type MonthlyMode = 'dayOfMonth' | 'nthWeekday'
export type NthWeekday = 1 | 2 | 3 | 4 | -1
export type RecurrenceEndMode = 'never' | 'until' | 'count'

/** HH:mm, 24h, Europe/Berlin wall time. */
export type TimeString = string

export interface TimedDate {
  date: string // YYYY-MM-DD (local, Europe/Berlin)
  startTime?: null | TimeString
  endTime?: null | TimeString
}

export interface OnceBlock extends TimedDate {
  blockType: 'once'
}

export interface DatesBlock {
  blockType: 'dates'
  dates?: null | TimedDate[]
}

export interface RecurringBlock {
  blockType: 'recurring'
  frequency: Frequency
  /** Defaults to 1 when empty. */
  interval?: null | number
  /** Weekly only. */
  weekdays?: null | WeekdayCode[]
  /** Monthly only. */
  monthlyMode?: null | MonthlyMode
  /** Monthly, `monthlyMode: 'dayOfMonth'`. */
  dayOfMonth?: null | number
  /** Monthly, `monthlyMode: 'nthWeekday'`. 1-4 or -1 for "last". */
  nthWeekday?: null | NthWeekday
  /** Monthly, `monthlyMode: 'nthWeekday'`. */
  weekday?: null | WeekdayCode
  startDate: string
  startTime?: null | TimeString
  endTime?: null | TimeString
  endMode: RecurrenceEndMode
  until?: null | string
  count?: null | number
}

export interface CourseBlock {
  blockType: 'course'
  startDate: string
  weekday: WeekdayCode
  startTime?: null | TimeString
  endTime?: null | TimeString
  sessions: number
  skipDates?: null | { date: string }[]
}

export type ScheduleBlock = OnceBlock | DatesBlock | RecurringBlock | CourseBlock

/** Payload's blocks field always stores an array, even with maxRows: 1. */
export type ScheduleValue = ScheduleBlock[]

export interface OccurrenceException {
  cancelled?: boolean
  note?: string
  startTime?: TimeString
  endTime?: TimeString
}

/** Keyed by ISO local date in Europe/Berlin, e.g. "2026-12-24". */
export type ExceptionsMap = Record<string, OccurrenceException>

export interface Occurrence {
  eventId: number | string
  /** Local date, YYYY-MM-DD. */
  date: string
  /** UTC instant, ISO 8601. */
  start: string
  /** UTC instant, ISO 8601. */
  end: string
  cancelled: boolean
  note?: string
}
