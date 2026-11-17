/**
 * Europe/Berlin timezone helpers.
 *
 * rrule.js produces "floating" dates whose UTC components are the local wall
 * date (e.g. 2026-11-05T00:00:00.000Z means "5 November" in Berlin). We keep
 * that convention for all date-only work and only convert to real UTC instants
 * when attaching the wall time. This is what keeps a 20:00 social at 20:00
 * across DST changes.
 *
 * Implemented with Intl instead of Luxon: the module is bundled into the admin
 * UI as well, and Intl needs no dependency. (Node here does have Temporal, but
 * browsers generally do not yet.)
 */

export const TIME_ZONE = 'Europe/Berlin'

const DATE_PARTS = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const TIME_PARTS = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

const pad = (n: number) => String(n).padStart(2, '0')

export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
export const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/

export function isDateString(value: unknown): value is string {
  if (typeof value !== 'string' || !DATE_RE.test(value)) return false
  const [y, m, d] = value.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d
  )
}

export function isTimeString(value: unknown): value is string {
  return typeof value === 'string' && TIME_RE.test(value)
}

/**
 * Payload `date` fields store full ISO timestamps. Schedules only care about
 * the calendar date, so accept either form and return YYYY-MM-DD.
 */
export function toLocalDateValue(value: unknown): null | string {
  if (typeof value !== 'string' || value.length < 10) return null
  const datePart = value.slice(0, 10)
  return isDateString(datePart) ? datePart : null
}

/** UTC-shaped Date used as a carrier for a local calendar date. */
export function localDateToUtcShape(date: string): Date {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

/** UTC-shaped Date at midnight, the inclusive lower bound of a local day. */
export function startOfLocalDay(date: string): Date {
  return localDateToUtcShape(date)
}

/** UTC-shaped Date at 23:59:59.999, the inclusive upper bound of a local day. */
export function endOfLocalDay(date: string): Date {
  return new Date(localDateToUtcShape(date).getTime() + 86_400_000 - 1)
}

export function utcShapeToLocalDate(date: Date): string {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
    date.getUTCDate(),
  )}`
}

/** Today's date in Berlin, regardless of the server's own timezone. */
export function todayLocal(now: Date = new Date()): string {
  const parts = DATE_PARTS.formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return `${get('year')}-${get('month')}-${get('day')}`
}

export function addLocalDays(date: string, days: number): string {
  return utcShapeToLocalDate(
    new Date(localDateToUtcShape(date).getTime() + days * 86_400_000),
  )
}

/** 0 = Sunday … 6 = Saturday, matching Date#getUTCDay. */
export function localWeekdayIndex(date: string): number {
  return localDateToUtcShape(date).getUTCDay()
}

export function compareLocalDates(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0
}

function offsetMsAt(instant: Date): number {
  const parts = TIME_PARTS.formatToParts(instant)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  const asUtc = Date.UTC(
    get('year'),
    get('month') - 1,
    get('day'),
    get('hour'),
    get('minute'),
    get('second'),
  )
  // Ignore milliseconds: the formatter only has second precision.
  return asUtc - Math.floor(instant.getTime() / 1000) * 1000
}

/**
 * Convert a Berlin wall-clock date + time to a real UTC instant.
 *
 * Two passes are needed: the offset depends on the instant, and the instant
 * depends on the offset. The second pass resolves the days around DST changes.
 */
export function zonedTimeToUtc(date: string, time: string): Date {
  if (!isDateString(date)) throw new Error(`Invalid local date: ${date}`)
  if (!isTimeString(time)) throw new Error(`Invalid local time: ${time}`)

  const [y, m, d] = date.split('-').map(Number)
  const [hh, mm] = time.split(':').map(Number)
  const wallClockAsUtc = Date.UTC(y, m - 1, d, hh, mm, 0, 0)

  let instant = wallClockAsUtc - offsetMsAt(new Date(wallClockAsUtc))
  instant = wallClockAsUtc - offsetMsAt(new Date(instant))
  return new Date(instant)
}

/** Berlin wall-clock time of an instant, as HH:mm. */
export function utcToLocalTime(instant: Date): string {
  const parts = TIME_PARTS.formatToParts(instant)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'
  return `${get('hour')}:${get('minute')}`
}

export function minutesOfTime(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}
