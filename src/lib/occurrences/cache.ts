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
 *
 * The cache lives in this process only. That is correct for the single CMS
 * container we run; with several instances, invalidation would have to be
 * shared (e.g. Redis or short TTLs).
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

/**
 * Keys are built from query parameters, so bound the map: without a cap,
 * varying parameters would grow it until the next midnight. A Map iterates in
 * insertion order, so the first key is the oldest entry.
 */
const MAX_ENTRIES = 200

export function setCached<T>(key: string, value: T, now: Date = new Date()): void {
  if (!store.has(key) && store.size >= MAX_ENTRIES) {
    const oldest = store.keys().next().value
    if (oldest !== undefined) store.delete(oldest)
  }
  store.set(key, { expiresAt: nextBerlinMidnight(now), value })
}

export function invalidateOccurrencesCache(): void {
  store.clear()
}
