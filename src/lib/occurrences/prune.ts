import { buildRuleset, getBlock } from './schedule'
import type { ScheduleValue } from './types'
import type { ExceptionsMap, OccurrenceException } from './types'
import { isDateString, isTimeString, todayLocal } from './time'

const ALLOWED_KEYS = new Set(['cancelled', 'note', 'startTime', 'endTime'])

/**
 * Payload's `json` field performs no structural validation, so both the admin
 * UI and the beforeChange hook use this.
 */
export function validateExceptions(value: unknown): true | string {
  if (value === null || value === undefined) return true
  if (typeof value !== 'object' || Array.isArray(value)) {
    return 'Ausnahmen müssen ein Objekt mit Datumsschlüsseln sein / exceptions must be an object keyed by date'
  }

  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (!isDateString(key)) {
      return `Ungültiger Datumsschlüssel "${key}" (erwartet YYYY-MM-DD)`
    }
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      return `Ungültiger Ausnahmewert für ${key}`
    }
    for (const [field, fieldValue] of Object.entries(entry as Record<string, unknown>)) {
      if (!ALLOWED_KEYS.has(field)) {
        return `Unbekanntes Feld "${field}" für ${key}`
      }
      if (field === 'cancelled' && typeof fieldValue !== 'boolean') {
        return `"cancelled" für ${key} muss true oder false sein`
      }
      if (field === 'note' && typeof fieldValue !== 'string') {
        return `"note" für ${key} muss Text sein`
      }
      if (
        (field === 'startTime' || field === 'endTime') &&
        fieldValue !== '' &&
        fieldValue !== null &&
        !isTimeString(fieldValue)
      ) {
        return `"${field}" für ${key} muss HH:mm sein`
      }
    }
  }

  return true
}

function normalizeException(entry: OccurrenceException): OccurrenceException | null {
  const normalized: OccurrenceException = {}
  if (entry.cancelled === true) normalized.cancelled = true
  if (typeof entry.note === 'string' && entry.note.trim()) {
    normalized.note = entry.note.trim()
  }
  if (isTimeString(entry.startTime)) normalized.startTime = entry.startTime
  if (isTimeString(entry.endTime)) normalized.endTime = entry.endTime

  return Object.keys(normalized).length ? normalized : null
}

/**
 * Drop exceptions that are in the past or that the current rule no longer
 * produces.
 *
 * Each key is checked against the rule itself for exactly its own day. Checking
 * against a preview window would delete valid far-future keys (summer breaks).
 *
 * The function is pure and idempotent: pruning twice yields the same result.
 */
export function pruneExceptions(
  schedule: ScheduleValue | undefined,
  exceptions: ExceptionsMap | null | undefined,
  today: string = todayLocal(),
): ExceptionsMap {
  if (!exceptions || typeof exceptions !== 'object') return {}
  const block = getBlock(schedule)
  if (!block) return {}

  const set = buildRuleset(block)
  const result: ExceptionsMap = {}

  for (const key of Object.keys(exceptions).sort()) {
    if (!isDateString(key) || key < today) continue

    const [y, m, d] = key.split('-').map(Number)
    const dayStart = new Date(Date.UTC(y, m - 1, d))
    const dayEnd = new Date(dayStart.getTime() + 86_400_000 - 1)
    if (!set.between(dayStart, dayEnd, true).length) continue

    const normalized = normalizeException(exceptions[key] ?? {})
    if (normalized) result[key] = normalized
  }

  return result
}

/**
 * Keys that pruning would remove even though they carry a note or a
 * cancellation. The admin shows a warning with these before saving.
 */
export function keysLostByPruning(
  schedule: ScheduleValue | undefined,
  exceptions: ExceptionsMap | null | undefined,
  today: string = todayLocal(),
): string[] {
  if (!exceptions || typeof exceptions !== 'object') return []
  const kept = pruneExceptions(schedule, exceptions, today)
  return Object.keys(exceptions)
    .sort()
    .filter((key) => {
      if (key in kept) return false
      const entry = exceptions[key]
      return Boolean(entry?.note || entry?.cancelled)
    })
}
