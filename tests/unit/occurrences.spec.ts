import { describe, expect, it } from 'vitest'
import { expand } from '@/lib/occurrences/expand'
import { keysLostByPruning, pruneExceptions } from '@/lib/occurrences/prune'
import { firstAndLast, datesBetween } from '@/lib/occurrences/schedule'
import type {
  CourseBlock,
  ExceptionsMap,
  OnceBlock,
  RecurringBlock,
  ScheduleValue,
} from '@/lib/occurrences/types'

const expandBlock = (block: ScheduleValue[number], exceptions: ExceptionsMap, from: string, to: string) =>
  expand({ id: 'test', schedule: [block], exceptions }, from, to)

const recurring = (overrides: Partial<RecurringBlock>): RecurringBlock => ({
  blockType: 'recurring',
  frequency: 'weekly',
  interval: 1,
  weekdays: ['TH'],
  startDate: '2026-01-01',
  startTime: '20:00',
  endTime: '22:00',
  endMode: 'never',
  ...overrides,
})

describe('expand: timezone', () => {
  it('keeps 20:00 local across both DST changes', () => {
    const block = recurring({ startDate: '2026-03-19' })
    const occurrences = expandBlock(block, {}, '2026-03-19', '2026-11-05')
    const byDate = new Map(occurrences.map((o) => [o.date, o]))

    // Europe/Berlin: CET (UTC+1) before 2026-03-29, CEST (UTC+2) after.
    expect(byDate.get('2026-03-19')?.start).toBe('2026-03-19T19:00:00.000Z')
    expect(byDate.get('2026-03-26')?.start).toBe('2026-03-26T19:00:00.000Z')
    expect(byDate.get('2026-04-02')?.start).toBe('2026-04-02T18:00:00.000Z')

    // October change (2026-10-25): 22 Oct is CEST, 29 Oct is CET again.
    expect(byDate.get('2026-10-22')?.start).toBe('2026-10-22T18:00:00.000Z')
    expect(byDate.get('2026-10-29')?.start).toBe('2026-10-29T19:00:00.000Z')

    // And every occurrence is still 20:00–22:00 Berlin wall time.
    for (const occurrence of occurrences) {
      const format = (value: string) =>
        new Intl.DateTimeFormat('de-DE', {
          timeZone: 'Europe/Berlin',
          hour: '2-digit',
          minute: '2-digit',
          hourCycle: 'h23',
        }).format(new Date(value))
      expect(format(occurrence.start)).toBe('20:00')
      expect(format(occurrence.end)).toBe('22:00')
    }
  })
})

describe('expand: monthly rules', () => {
  it('finds the last Wednesday in months with four and five Wednesdays', () => {
    const block = recurring({
      frequency: 'monthly',
      monthlyMode: 'nthWeekday',
      nthWeekday: -1,
      weekday: 'WE',
      startDate: '2026-01-01',
      weekdays: null,
    })
    const occurrences = expandBlock(block, {}, '2026-01-01', '2026-06-30')
    expect(occurrences.map((o) => o.date)).toEqual([
      '2026-01-28',
      '2026-02-25',
      '2026-03-25', // four Wednesdays
      '2026-04-29', // five Wednesdays
      '2026-05-27',
      '2026-06-24',
    ])
  })

  it('finds the first Wednesday of a month', () => {
    const block = recurring({
      frequency: 'monthly',
      monthlyMode: 'nthWeekday',
      nthWeekday: 1,
      weekday: 'WE',
      startDate: '2026-03-11', // not a Wednesday
      weekdays: null,
    })
    const occurrences = expandBlock(block, {}, '2026-03-01', '2026-05-31')
    expect(occurrences.map((o) => o.date)).toEqual([
      '2026-04-01',
      '2026-05-06',
    ])
  })
})

describe('expand: intervals', () => {
  it('repeats every other Thursday', () => {
    const block = recurring({ interval: 2, startDate: '2026-01-01' })
    const occurrences = expandBlock(block, {}, '2026-01-01', '2026-02-28')
    expect(occurrences.map((o) => o.date)).toEqual([
      '2026-01-01',
      '2026-01-15',
      '2026-01-29',
      '2026-02-12',
      '2026-02-26',
    ])
  })
})

describe('expand: end after midnight', () => {
  it('moves the end to the following day', () => {
    const block: OnceBlock = {
      blockType: 'once',
      date: '2026-06-01',
      startTime: '22:00',
      endTime: '02:00',
    }
    const [occurrence] = expandBlock(block, {}, '2026-06-01', '2026-06-01')
    expect(occurrence.start).toBe('2026-06-01T20:00:00.000Z')
    expect(occurrence.end).toBe('2026-06-02T00:00:00.000Z')
  })
})

describe('expand: course', () => {
  it('keeps the session count when a date is skipped', () => {
    const block: CourseBlock = {
      blockType: 'course',
      startDate: '2026-01-05',
      weekday: 'MO',
      startTime: '19:00',
      endTime: '20:30',
      sessions: 4,
      skipDates: [{ date: '2026-01-12' }],
    }
    const occurrences = expandBlock(block, {}, '2026-01-01', '2026-03-01')
    expect(occurrences.map((o) => o.date)).toEqual([
      '2026-01-05',
      '2026-01-19',
      '2026-01-26',
      '2026-02-02',
    ])
    expect(firstAndLast([block]).lastDate).toBe('2026-02-02')
  })

  it('accepts Payload ISO date values', () => {
    const block: CourseBlock = {
      blockType: 'course',
      startDate: '2026-01-05T00:00:00.000Z',
      weekday: 'MO',
      sessions: 2,
      skipDates: [{ date: '2026-01-12T00:00:00.000Z' }],
    }
    const occurrences = expandBlock(block, {}, '2026-01-01', '2026-03-01')
    expect(occurrences.map((o) => o.date)).toEqual(['2026-01-05', '2026-01-19'])
  })
})

describe('pruning', () => {
  it('drops annotated keys that the new rule no longer produces', () => {
    const monday = recurring({ weekdays: ['MO'], startDate: '2026-01-05' })
    const exceptions: ExceptionsMap = { '2026-01-12': { note: 'Ferien' } }
    expect(pruneExceptions([monday], exceptions, '2026-01-01')).toEqual(exceptions)

    const tuesday = recurring({ weekdays: ['TU'], startDate: '2026-01-06' })
    expect(pruneExceptions([tuesday], exceptions, '2026-01-01')).toEqual({})
    expect(keysLostByPruning([tuesday], exceptions, '2026-01-01')).toEqual(['2026-01-12'])
  })

  it('keeps valid far-future keys beyond any preview window', () => {
    const monday = recurring({ weekdays: ['MO'], startDate: '2026-01-05' })
    // 2027-12-06 is a Monday, far beyond a 60/90 day preview.
    const exceptions: ExceptionsMap = { '2027-12-06': { cancelled: true } }
    expect(pruneExceptions([monday], exceptions, '2026-01-01')).toEqual(exceptions)
  })

  it('drops keys in the past', () => {
    const monday = recurring({ weekdays: ['MO'], startDate: '2026-01-05' })
    expect(
      pruneExceptions([monday], { '2026-01-05': { cancelled: true } }, '2026-02-01'),
    ).toEqual({})
  })
})

describe('determinism', () => {
  it('expansion is deterministic and pruning is idempotent', () => {
    const block = recurring({ startDate: '2026-01-01' })
    const exceptions: ExceptionsMap = {
      '2026-01-08': { note: '  Raumwechsel  ' },
      '2026-12-31': { cancelled: true },
      '2025-01-02': { cancelled: true },
    }
    const a = expandBlock(block, exceptions, '2026-01-01', '2027-01-31')
    const b = expandBlock(block, exceptions, '2026-01-01', '2027-01-31')
    expect(a).toEqual(b)

    const once = pruneExceptions([block], exceptions, '2026-01-01')
    const twice = pruneExceptions([block], once, '2026-01-01')
    expect(twice).toEqual(once)
    expect(once['2026-01-08'].note).toBe('Raumwechsel')
  })

  it('includes cancelled dates and notes instead of hiding them', () => {
    const block = recurring({ startDate: '2026-01-01' })
    const occurrences = expandBlock(
      block,
      { '2026-01-08': { cancelled: true, note: 'fällt aus' } },
      '2026-01-01',
      '2026-01-15',
    )
    const cancelled = occurrences.find((o) => o.date === '2026-01-08')
    expect(cancelled?.cancelled).toBe(true)
    expect(cancelled?.note).toBe('fällt aus')
  })

  it('overrides times from the exceptions map', () => {
    const block = recurring({ startDate: '2026-01-01' })
    const [occurrence] = expandBlock(
      block,
      { '2026-01-01': { startTime: '18:30', endTime: '20:00' } },
      '2026-01-01',
      '2026-01-01',
    )
    expect(occurrence.start).toBe('2026-01-01T17:30:00.000Z')
    expect(occurrence.end).toBe('2026-01-01T19:00:00.000Z')
  })
})

describe('prefilter bounds', () => {
  it('returns no lastDate for open-ended rules and one for bounded rules', () => {
    expect(firstAndLast([recurring({ endMode: 'never' })])).toEqual({
      firstDate: '2026-01-01',
      lastDate: null,
    })
    expect(firstAndLast([recurring({ endMode: 'until', until: '2026-02-28' })])).toEqual({
      firstDate: '2026-01-01',
      lastDate: '2026-02-26',
    })
    expect(firstAndLast([recurring({ endMode: 'count', count: 3 })])).toEqual({
      firstDate: '2026-01-01',
      lastDate: '2026-01-15',
    })
  })

  it('datesBetween is inclusive and sorted', () => {
    const block = recurring({ startDate: '2026-01-01' })
    expect(datesBetween([block], '2026-01-01', '2026-01-15')).toEqual([
      '2026-01-01',
      '2026-01-08',
      '2026-01-15',
    ])
  })
})
