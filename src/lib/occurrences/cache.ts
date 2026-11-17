import { addLocalDays, todayLocal, zonedTimeToUtc } from './time'

interface CacheEntry<T> {
  expiresAt: number
  value: T
}

/**
 * Tiny in-process cache for the public occurrences endpoint. No Redis.
 *
 * Entries expire at the next midnight in Europe/Berlin, and every event change
 * clears the whole cache (the dataset is small enough that this is cheaper than
 * tracking dependencies).
 */
const store = new Map<string, CacheEntry<unknown>>()

function nextBerlinMidnight(now: Date): number {
  return zonedTimeToUtc(addLocalDays(todayLocal(now), 1), '00:00').getTime()
}

export function getCached<T>(key: string, now: Date = new Date()): T | undefined {
  const entry = store.get(key)
  if (!entry) return undefined
  if (entry.expiresAt <= now.getTime()) {
    store.delete(key)
    return undefined
  }
  return entry.value as T
}

export function setCached<T>(key: string, value: T, now: Date = new Date()): void {
  store.set(key, { expiresAt: nextBerlinMidnight(now), value })
}

export function invalidateOccurrencesCache(): void {
  store.clear()
}

export function occurrencesCacheSize(): number {
  return store.size
}
