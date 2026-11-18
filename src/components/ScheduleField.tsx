'use client'

import React, { useMemo, useState } from 'react'
import {
  Banner,
  Button,
  Collapsible,
  DatePicker,
  FieldDescription,
  FieldLabel,
  Pill,
  PillSelector,
  SelectInput,
  TextInput,
  fieldBaseClass,
  useDocumentInfo,
  useField,
  useForm,
  useFormFields,
} from '@payloadcms/ui'
import { reduceFieldsToValues } from 'payload/shared'
import { useAdminLocale, useAdminText } from './useAdminText'
import './ScheduleField.scss'

import { expand } from '@/lib/occurrences/expand'
import { datesBetween } from '@/lib/occurrences/schedule'
import { keysLostByPruning } from '@/lib/occurrences/prune'
import { addLocalDays, todayLocal, toLocalDateValue } from '@/lib/occurrences/time'
import {
  TIME_ZONE,
  type CourseBlock,
  type DatesBlock,
  type ExceptionsMap,
  type Occurrence,
  type OnceBlock,
  type RecurringBlock,
  type ScheduleBlock,
  type WeekdayCode,
} from '@/lib/occurrences'

type Props = {
  path: string
  readOnly?: boolean
}

type DateAppearance = 'dayOnly' | 'monthOnly' | 'timeOnly'

type Bilingual = { de: string; en: string }

type LocalizedOption = { label: Bilingual; value: string }

const localizedOptions = (
  options: LocalizedOption[],
  t: (de: string, en: string) => string,
): { label: string; value: string }[] =>
  options.map((option) => ({ label: t(option.label.de, option.label.en), value: option.value }))

const WEEKDAYS: { code: WeekdayCode; long: Bilingual; short: Bilingual }[] = [
  { code: 'MO', short: { de: 'Mo', en: 'Mon' }, long: { de: 'Montag', en: 'Monday' } },
  { code: 'TU', short: { de: 'Di', en: 'Tue' }, long: { de: 'Dienstag', en: 'Tuesday' } },
  { code: 'WE', short: { de: 'Mi', en: 'Wed' }, long: { de: 'Mittwoch', en: 'Wednesday' } },
  { code: 'TH', short: { de: 'Do', en: 'Thu' }, long: { de: 'Donnerstag', en: 'Thursday' } },
  { code: 'FR', short: { de: 'Fr', en: 'Fri' }, long: { de: 'Freitag', en: 'Friday' } },
  { code: 'SA', short: { de: 'Sa', en: 'Sat' }, long: { de: 'Samstag', en: 'Saturday' } },
  { code: 'SU', short: { de: 'So', en: 'Sun' }, long: { de: 'Sonntag', en: 'Sunday' } },
]

const BLOCK_TYPE_OPTIONS: LocalizedOption[] = [
  { label: { de: 'Einmalig', en: 'Once' }, value: 'once' },
  { label: { de: 'Bestimmte Termine', en: 'Specific dates' }, value: 'dates' },
  { label: { de: 'Regelmäßig', en: 'Recurring' }, value: 'recurring' },
  { label: { de: 'Kurs-Block', en: 'Course block' }, value: 'course' },
]

const FREQUENCY_OPTIONS: LocalizedOption[] = [
  { label: { de: 'Wöchentlich', en: 'Weekly' }, value: 'weekly' },
  { label: { de: 'Monatlich', en: 'Monthly' }, value: 'monthly' },
]

const MONTHLY_MODE_OPTIONS: LocalizedOption[] = [
  { label: { de: 'Tag im Monat', en: 'Day of month' }, value: 'dayOfMonth' },
  { label: { de: 'n-ter Wochentag', en: 'Nth weekday' }, value: 'nthWeekday' },
]

const NTH_WEEKDAY_OPTIONS: LocalizedOption[] = [
  { label: { de: '1.', en: '1st' }, value: '1' },
  { label: { de: '2.', en: '2nd' }, value: '2' },
  { label: { de: '3.', en: '3rd' }, value: '3' },
  { label: { de: '4.', en: '4th' }, value: '4' },
  { label: { de: 'Letzter', en: 'Last' }, value: '-1' },
]

const END_MODE_OPTIONS: LocalizedOption[] = [
  { label: { de: 'Nie', en: 'Never' }, value: 'never' },
  { label: { de: 'Bis zum Datum', en: 'Until date' }, value: 'until' },
  { label: { de: 'Nach Anzahl', en: 'After count' }, value: 'count' },
]

const pad2 = (value: number) => String(value).padStart(2, '0')

const dateToInput = (date: Date): string =>
  `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`

const asDateOnly = (value: unknown): string => toLocalDateValue(value) ?? ''

const timeToDate = (value: null | string | undefined): Date | undefined => {
  if (!value) return undefined
  const [hours, minutes] = value.split(':').map(Number)
  if (Number.isNaN(hours)) return undefined
  return new Date(1970, 0, 1, hours, Number.isNaN(minutes) ? 0 : minutes, 0, 0)
}

const dateToTime = (date: Date): string => `${pad2(date.getHours())}:${pad2(date.getMinutes())}`

const dayToDate = (value: null | string | undefined): Date | undefined => {
  const dateOnly = toLocalDateValue(value)
  if (!dateOnly) return undefined
  const [year, month, day] = dateOnly.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const monthToDate = (value: null | string | undefined): Date | undefined => {
  if (!value) return undefined
  const [year, month] = value.split('-').map(Number)
  if (!year || !month) return undefined
  return new Date(year, month - 1, 1)
}

const dateToMonth = (date: Date): string =>
  `${date.getFullYear()}-${pad2(date.getMonth() + 1)}`

const optionValue = (option: unknown): string => {
  if (option && typeof option === 'object' && 'value' in option) {
    return String((option as { value: unknown }).value)
  }
  return ''
}

const formatOccurrence = (occurrence: Occurrence, locale: string) => {
  const day = new Intl.DateTimeFormat(locale, {
    timeZone: TIME_ZONE,
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(occurrence.start))
  const time = new Intl.DateTimeFormat(locale, {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(occurrence.start))
  const end = new Intl.DateTimeFormat(locale, {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(occurrence.end))
  return { day, time, end }
}

const DISPLAY_FORMATS: Record<DateAppearance, string> = {
  dayOnly: 'dd.MM.yyyy',
  monthOnly: 'MM.yyyy',
  timeOnly: 'HH:mm',
}

function DateControl({
  appearance = 'dayOnly',
  label,
  path,
  readOnly,
  value,
  onChange,
  placeholder,
}: {
  appearance?: DateAppearance
  label: string
  path: string
  readOnly?: boolean
  value: null | string | undefined
  onChange: (value: string) => void
  placeholder?: string
}) {
  const dateValue =
    appearance === 'timeOnly'
      ? timeToDate(value)
      : appearance === 'monthOnly'
        ? monthToDate(value)
        : dayToDate(value)

  return (
    <div className={`${fieldBaseClass} date-time`}>
      <FieldLabel label={label} path={path} />
      <div className={`${fieldBaseClass}__wrap`}>
        <DatePicker
          pickerAppearance={appearance}
          displayFormat={DISPLAY_FORMATS[appearance]}
          placeholder={placeholder}
          readOnly={readOnly}
          timeFormat="HH:mm"
          timeIntervals={15}
          value={dateValue}
          onChange={(date) => {
            if (!date) return
            if (appearance === 'timeOnly') onChange(dateToTime(date))
            else if (appearance === 'monthOnly') onChange(dateToMonth(date))
            else onChange(dateToInput(date))
          }}
        />
      </div>
    </div>
  )
}

function NumberControl({
  label,
  max,
  min = 1,
  path,
  readOnly,
  value,
  onChange,
}: {
  label: string
  max?: number
  min?: number
  path: string
  readOnly?: boolean
  value: null | number | undefined
  onChange: (value: number) => void
}) {
  return (
    <TextInput
      label={label}
      path={path}
      readOnly={readOnly}
      value={value === null || value === undefined ? '' : String(value)}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const next = Number(event.target.value)
        if (!Number.isFinite(next)) return
        onChange(Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min, next)))
      }}
    />
  )
}

function SelectControl({
  label,
  options,
  path,
  readOnly,
  value,
  onChange,
}: {
  label: string
  options: { label: string; value: string }[]
  path: string
  readOnly?: boolean
  value: string
  onChange: (value: string) => void
}) {
  return (
    <SelectInput
      isClearable={false}
      isSortable={false}
      label={label}
      name={path}
      options={options}
      path={path}
      readOnly={readOnly}
      value={value}
      onChange={(option) => {
        const next = optionValue(Array.isArray(option) ? option[0] : option)
        if (next) onChange(next)
      }}
    />
  )
}

export const ScheduleField: React.FC<Props> = ({ path, readOnly }) => {
  const t = useAdminText()
  const locale = useAdminLocale()
  const weekdayOptions = WEEKDAYS.map((day) => ({
    label: t(day.long.de, day.long.en),
    value: day.code,
  }))
  const { value: exceptionValue, setValue: setExceptions } = useField<ExceptionsMap>({
    path: 'exceptions',
  })
  const { dispatchFields } = useForm()
  const formFields = useFormFields(([fields]) => fields)
  const { data: documentData } = useDocumentInfo()

  // A blocks field stores its rows in flattened form state: the parent holds a
  // row count (`disableFormData`), while the real data lives at `path.0.*`.
  // Reading or writing the parent value directly would be overwritten by the
  // next form-state merge, so this editor works on the row's leaf fields.
  const rowPath = `${path}.0`
  const rowExists = ((formFields?.[path]?.rows as unknown[] | undefined) ?? []).length > 0

  const savedBlock = useMemo<ScheduleBlock | undefined>(() => {
    const stored = (documentData as Record<string, unknown> | undefined)?.[path]
    const first = Array.isArray(stored) ? stored[0] : stored
    return first && typeof first === 'object' ? (first as ScheduleBlock) : undefined
  }, [documentData, path])

  const editedBlock = useMemo<ScheduleBlock | undefined>(() => {
    const reduced = reduceFieldsToValues(formFields, true) as Record<string, unknown> | undefined
    const stored = reduced?.[path]
    const first = Array.isArray(stored) ? stored[0] : stored
    if (!first || typeof first !== 'object') return undefined
    return typeof (first as { blockType?: unknown }).blockType === 'string'
      ? (first as ScheduleBlock)
      : undefined
  }, [formFields, path])

  const fallbackBlock = useMemo<ScheduleBlock>(
    () => ({
      blockType: 'once',
      date: todayLocal(),
      startTime: '20:00',
      endTime: '22:00',
    }),
    [],
  )

  const block: ScheduleBlock = editedBlock ?? savedBlock ?? fallbackBlock
  const exceptions: ExceptionsMap =
    exceptionValue && typeof exceptionValue === 'object' ? exceptionValue : {}

  const [limit, setLimit] = useState(8)
  const [monthJump, setMonthJump] = useState('')
  const [editNote, setEditNote] = useState<null | string>(null)
  const [editTime, setEditTime] = useState<null | string>(null)
  const [draftNote, setDraftNote] = useState('')
  const [draftStart, setDraftStart] = useState('')
  const [draftEnd, setDraftEnd] = useState('')
  const [pauseFrom, setPauseFrom] = useState('')
  const [pauseTo, setPauseTo] = useState('')

  const today = todayLocal()
  const lostKeys = useMemo(
    () => keysLostByPruning([block], exceptions, today),
    [block, exceptions, today],
  )

  const previewFrom = monthJump ? `${monthJump}-01` : today
  const previewTo = addLocalDays(previewFrom, 366)

  const occurrences = useMemo(() => {
    try {
      return expand({ id: 'preview', schedule: [block], exceptions }, previewFrom, previewTo)
    } catch {
      return []
    }
  }, [block, exceptions, previewFrom, previewTo])

  const visible = occurrences.slice(0, limit)

  const write = (next: ScheduleBlock) => {
    if (readOnly) return
    const { id: _rowID, ...values } = next as ScheduleBlock & { id?: string }

    // Make sure the row itself exists (minRows: 1 on a fresh document).
    if (!rowExists) {
      dispatchFields({
        type: 'ADD_ROW',
        blockType: next.blockType,
        path,
        rowIndex: 0,
      })
    }

    // Drop leaves that belonged to a previously selected block type so a
    // switched block does not submit stale fields.
    for (const key of Object.keys(block)) {
      if (key === 'id' || key === 'blockType' || key in values) continue
      dispatchFields({ type: 'REMOVE', path: `${rowPath}.${key}` })
    }

    for (const [key, value] of Object.entries(values)) {
      dispatchFields({ type: 'UPDATE', path: `${rowPath}.${key}`, value })
    }
  }

  const patch = (changes: Partial<ScheduleBlock>) =>
    write({ ...(block as any), ...changes } as ScheduleBlock)

  const writeException = (date: string, changes: Partial<ExceptionsMap[string]>) => {
    const next: ExceptionsMap = { ...exceptions }
    const merged = { ...(next[date] ?? {}), ...changes }
    const cleaned: ExceptionsMap[string] = {}
    if (merged.cancelled) cleaned.cancelled = true
    if (merged.note?.trim()) cleaned.note = merged.note.trim()
    if (merged.startTime) cleaned.startTime = merged.startTime
    if (merged.endTime) cleaned.endTime = merged.endTime
    if (Object.keys(cleaned).length) next[date] = cleaned
    else delete next[date]
    setExceptions(next)
  }

  const switchType = (type: ScheduleBlock['blockType']) => {
    if (type === block.blockType) return
    const shared = {
      startTime: (block as OnceBlock).startTime ?? '20:00',
      endTime: (block as OnceBlock).endTime ?? '22:00',
    }
    if (type === 'once') {
      write({
        blockType: 'once',
        date: asDateOnly((block as any).date) || today,
        ...shared,
      } as OnceBlock)
    } else if (type === 'dates') {
      write({ blockType: 'dates', dates: [{ date: today, ...shared }] } as DatesBlock)
    } else if (type === 'recurring') {
      write({
        blockType: 'recurring',
        frequency: 'weekly',
        interval: 1,
        weekdays: ['MO'],
        monthlyMode: 'dayOfMonth',
        dayOfMonth: 1,
        startDate: today,
        endMode: 'never',
        ...shared,
      } as RecurringBlock)
    } else {
      write({
        blockType: 'course',
        startDate: today,
        weekday: 'MO',
        sessions: 6,
        ...shared,
      } as CourseBlock)
    }
  }

  const applyPause = () => {
    if (!pauseFrom || !pauseTo || pauseTo < pauseFrom) return
    const dates = datesBetween([block], pauseFrom, pauseTo)
    const next: ExceptionsMap = { ...exceptions }
    for (const date of dates) {
      next[date] = { ...(next[date] ?? {}), cancelled: true }
    }
    setExceptions(next)
  }

  const toggleWeekday = (code: WeekdayCode) => {
    const current = (block as RecurringBlock).weekdays ?? []
    patch({
      weekdays: current.includes(code)
        ? current.filter((entry) => entry !== code)
        : [...current, code],
    } as any)
  }

  const timeRow = (
    startTime: null | string | undefined,
    endTime: null | string | undefined,
    onStart: (value: string) => void,
    onEnd: (value: string) => void,
    keyPrefix: string,
  ) => (
    <div className="schedule-field__row">
      <DateControl
        appearance="timeOnly"
        label={t('Beginn', 'Start')}
        path={`${path}.${keyPrefix}.startTime`}
        readOnly={readOnly}
        value={startTime}
        onChange={onStart}
      />
      <DateControl
        appearance="timeOnly"
        label={t('Ende', 'End')}
        path={`${path}.${keyPrefix}.endTime`}
        readOnly={readOnly}
        value={endTime}
        onChange={onEnd}
      />
    </div>
  )

  const renderFields = () => {
    if (block.blockType === 'once') {
      return (
        <div className="schedule-field__row">
          <DateControl
            label={t('Datum', 'Date')}
            path={`${path}.once.date`}
            readOnly={readOnly}
            value={block.date}
            onChange={(date) => patch({ date } as any)}
          />
          {timeRow(
            block.startTime,
            block.endTime,
            (startTime) => patch({ startTime } as any),
            (endTime) => patch({ endTime } as any),
            'once',
          )}
        </div>
      )
    }

    if (block.blockType === 'dates') {
      const dates = block.dates ?? []
      return (
        <div className="schedule-field__dates">
          {dates.map((entry, index) => (
            <div className="schedule-field__date-row" key={index}>
              <DateControl
                label={t('Datum', 'Date')}
                path={`${path}.dates.${index}.date`}
                readOnly={readOnly}
                value={entry.date}
                onChange={(date) => {
                  const next = [...dates]
                  next[index] = { ...entry, date }
                  patch({ dates: next } as any)
                }}
              />
              <DateControl
                appearance="timeOnly"
                label={t('Beginn', 'Start')}
                path={`${path}.dates.${index}.startTime`}
                readOnly={readOnly}
                value={entry.startTime}
                onChange={(startTime) => {
                  const next = [...dates]
                  next[index] = { ...entry, startTime }
                  patch({ dates: next } as any)
                }}
              />
              <DateControl
                appearance="timeOnly"
                label={t('Ende', 'End')}
                path={`${path}.dates.${index}.endTime`}
                readOnly={readOnly}
                value={entry.endTime}
                onChange={(endTime) => {
                  const next = [...dates]
                  next[index] = { ...entry, endTime }
                  patch({ dates: next } as any)
                }}
              />
              <Button
                buttonStyle="subtle"
                disabled={readOnly}
                size="small"
                onClick={() => patch({ dates: dates.filter((_, i) => i !== index) } as any)}
              >
                {t('Entfernen', 'Remove')}
              </Button>
            </div>
          ))}
          <div>
            <Button
              buttonStyle="secondary"
              disabled={readOnly}
              icon="plus"
              size="small"
              onClick={() =>
                patch({
                  dates: [...dates, { date: today, startTime: '20:00', endTime: '22:00' }],
                } as any)
              }
            >
              {t('Termin', 'Add date')}
            </Button>
          </div>
        </div>
      )
    }

    if (block.blockType === 'course') {
      return (
        <>
          <div className="schedule-field__row">
            <DateControl
              label={t('Startdatum', 'Start date')}
              path={`${path}.course.startDate`}
              readOnly={readOnly}
              value={block.startDate}
              onChange={(startDate) => patch({ startDate } as any)}
            />
            <SelectControl
              label={t('Wochentag', 'Weekday')}
              options={weekdayOptions}
              path={`${path}.course.weekday`}
              readOnly={readOnly}
              value={block.weekday}
              onChange={(weekday) => patch({ weekday: weekday as WeekdayCode } as any)}
            />
            <DateControl
              appearance="timeOnly"
              label={t('Beginn', 'Start')}
              path={`${path}.course.startTime`}
              readOnly={readOnly}
              value={block.startTime}
              onChange={(startTime) => patch({ startTime } as any)}
            />
            <DateControl
              appearance="timeOnly"
              label={t('Ende', 'End')}
              path={`${path}.course.endTime`}
              readOnly={readOnly}
              value={block.endTime}
              onChange={(endTime) => patch({ endTime } as any)}
            />
            <NumberControl
              label={t('Einheiten', 'Sessions')}
              path={`${path}.course.sessions`}
              readOnly={readOnly}
              value={block.sessions}
              onChange={(sessions) => patch({ sessions } as any)}
            />
          </div>
          <div className="schedule-field__subsection">
            <FieldLabel label={t('Ausfalltermine', 'Skip dates')} path={`${path}.course.skipDates`} />
            <div className="schedule-field__dates">
              {(block.skipDates ?? []).map((entry, index) => (
                <div className="schedule-field__date-row" key={index}>
                  <DateControl
                    label={t('Datum', 'Date')}
                    path={`${path}.course.skipDates.${index}.date`}
                    readOnly={readOnly}
                    value={entry.date}
                    onChange={(date) => {
                      const next = [...(block.skipDates ?? [])]
                      next[index] = { date }
                      patch({ skipDates: next } as any)
                    }}
                  />
                  <Button
                    buttonStyle="subtle"
                    disabled={readOnly}
                    size="small"
                    onClick={() =>
                      patch({
                        skipDates: (block.skipDates ?? []).filter((_, i) => i !== index),
                      } as any)
                    }
                  >
                    {t('Entfernen', 'Remove')}
                  </Button>
                </div>
              ))}
              <div>
                <Button
                  buttonStyle="secondary"
                  disabled={readOnly}
                  icon="plus"
                  size="small"
                  onClick={() =>
                    patch({ skipDates: [...(block.skipDates ?? []), { date: today }] } as any)
                  }
                >
                  {t('Ausfalltermin', 'Add skip date')}
                </Button>
              </div>
            </div>
          </div>
        </>
      )
    }

    const recurring = block as RecurringBlock
    return (
      <>
        <div className="schedule-field__row">
          <SelectControl
            label={t('Wiederholung', 'Repeat')}
            options={localizedOptions(FREQUENCY_OPTIONS, t)}
            path={`${path}.recurring.frequency`}
            readOnly={readOnly}
            value={recurring.frequency}
            onChange={(frequency) =>
              patch({ frequency: frequency as RecurringBlock['frequency'] } as any)
            }
          />
          <NumberControl
            label={t('Intervall', 'Interval')}
            path={`${path}.recurring.interval`}
            readOnly={readOnly}
            value={recurring.interval ?? 1}
            onChange={(interval) => patch({ interval } as any)}
          />
          <DateControl
            label={t('Startdatum', 'Start date')}
            path={`${path}.recurring.startDate`}
            readOnly={readOnly}
            value={recurring.startDate}
            onChange={(startDate) => patch({ startDate } as any)}
          />
          <DateControl
            appearance="timeOnly"
            label={t('Beginn', 'Start')}
            path={`${path}.recurring.startTime`}
            readOnly={readOnly}
            value={recurring.startTime}
            onChange={(startTime) => patch({ startTime } as any)}
          />
          <DateControl
            appearance="timeOnly"
            label={t('Ende', 'End')}
            path={`${path}.recurring.endTime`}
            readOnly={readOnly}
            value={recurring.endTime}
            onChange={(endTime) => patch({ endTime } as any)}
          />
        </div>

        {recurring.frequency === 'weekly' ? (
          <div className="schedule-field__subsection">
            <FieldLabel
              label={t('Wochentage', 'Weekdays')}
              path={`${path}.recurring.weekdays`}
            />
            <div
              className="schedule-field__weekdays"
              style={readOnly ? { opacity: 0.6, pointerEvents: 'none' } : undefined}
            >
              <PillSelector
                onClick={({ pill }) => toggleWeekday(pill.name as WeekdayCode)}
                pills={WEEKDAYS.map((day) => ({
                  Label: t(day.short.de, day.short.en),
                  name: day.code,
                  selected: (recurring.weekdays ?? []).includes(day.code),
                }))}
              />
            </div>
          </div>
        ) : (
          <div className="schedule-field__row">
            <SelectControl
              label={t('Monatsregel', 'Monthly rule')}
              options={localizedOptions(MONTHLY_MODE_OPTIONS, t)}
              path={`${path}.recurring.monthlyMode`}
              readOnly={readOnly}
              value={recurring.monthlyMode ?? 'dayOfMonth'}
              onChange={(monthlyMode) => patch({ monthlyMode } as any)}
            />
            {(recurring.monthlyMode ?? 'dayOfMonth') === 'dayOfMonth' ? (
              <NumberControl
                label={t('Tag', 'Day')}
                max={31}
                path={`${path}.recurring.dayOfMonth`}
                readOnly={readOnly}
                value={recurring.dayOfMonth ?? 1}
                onChange={(dayOfMonth) => patch({ dayOfMonth } as any)}
              />
            ) : (
              <>
                <SelectControl
                  label={t('Welcher', 'Which')}
                  options={localizedOptions(NTH_WEEKDAY_OPTIONS, t)}
                  path={`${path}.recurring.nthWeekday`}
                  readOnly={readOnly}
                  value={String(recurring.nthWeekday ?? 1)}
                  onChange={(nthWeekday) =>
                    patch({ nthWeekday: Number(nthWeekday) as any } as any)
                  }
                />
                <SelectControl
                  label={t('Wochentag', 'Weekday')}
                  options={weekdayOptions}
                  path={`${path}.recurring.weekday`}
                  readOnly={readOnly}
                  value={recurring.weekday ?? 'MO'}
                  onChange={(weekday) => patch({ weekday: weekday as WeekdayCode } as any)}
                />
              </>
            )}
          </div>
        )}

        <div className="schedule-field__row">
          <SelectControl
            label={t('Ende', 'End')}
            options={localizedOptions(END_MODE_OPTIONS, t)}
            path={`${path}.recurring.endMode`}
            readOnly={readOnly}
            value={recurring.endMode}
            onChange={(endMode) =>
              patch({ endMode: endMode as RecurringBlock['endMode'] } as any)
            }
          />
          {recurring.endMode === 'until' && (
            <DateControl
              label={t('Bis', 'Until')}
              path={`${path}.recurring.until`}
              readOnly={readOnly}
              value={recurring.until}
              onChange={(until) => patch({ until } as any)}
            />
          )}
          {recurring.endMode === 'count' && (
            <NumberControl
              label={t('Anzahl', 'Count')}
              path={`${path}.recurring.count`}
              readOnly={readOnly}
              value={recurring.count ?? 1}
              onChange={(count) => patch({ count } as any)}
            />
          )}
        </div>
      </>
    )
  }

  return (
    <div className="schedule-field">
      {lostKeys.length > 0 && (
        <Banner type="info">
          {t(
            `${lostKeys.length} ${
              lostKeys.length === 1 ? 'Hinweis passt' : 'Hinweise passen'
            } nicht mehr zum neuen Zeitplan und ${
              lostKeys.length === 1 ? 'wird' : 'werden'
            } beim Speichern entfernt: ${lostKeys.join(', ')}`,
            `${lostKeys.length} ${
              lostKeys.length === 1 ? 'note does' : 'notes do'
            } not match the new schedule and will be removed on save: ${lostKeys.join(', ')}`,
          )}
        </Banner>
      )}

      <div className="schedule-field__block">
        <SelectControl
          label={t('Zeitplan-Art', 'Schedule type')}
          options={localizedOptions(BLOCK_TYPE_OPTIONS, t)}
          path={`${path}.blockType`}
          readOnly={readOnly}
          value={block.blockType}
          onChange={(type) => switchType(type as ScheduleBlock['blockType'])}
        />

        {renderFields()}
      </div>

      <Collapsible
        className="schedule-field__preview"
        header={<strong>{t('Vorschau', 'Preview')}</strong>}
        initCollapsed={false}
      >
        <div className="schedule-field__toolbar">
          <DateControl
            appearance="monthOnly"
            label={t('Zu Monat springen', 'Jump to month')}
            path={`${path}.preview.month`}
            value={monthJump}
            onChange={(month) => {
              setMonthJump(month)
              setLimit(8)
            }}
          />
          {monthJump && (
            <Button
              buttonStyle="secondary"
              size="small"
              onClick={() => {
                setMonthJump('')
                setLimit(8)
              }}
            >
              {t('Ab heute', 'From today')}
            </Button>
          )}
        </div>

        {visible.length === 0 && (
          <FieldDescription
            description={t(
              'Noch keine Termine – bitte den Zeitplan vervollständigen.',
              'No dates yet – please complete the schedule.',
            )}
            path={`${path}.preview.empty`}
          />
        )}

        {visible.length > 0 && (
          <div className="schedule-preview__list">
            {visible.map((occurrence) => {
              const { day, time, end } = formatOccurrence(occurrence, locale)
              const isEditingTime = editTime === occurrence.date
              return (
                <div
                  key={occurrence.date}
                  className={`schedule-preview__item${occurrence.cancelled ? ' is-cancelled' : ''}`}
                >
                  <span className="schedule-preview__date">{day}</span>
                  <div className="schedule-preview__details">
                    {isEditingTime ? (
                      <div className="schedule-preview__editor">
                        <DateControl
                          appearance="timeOnly"
                          label={t('Beginn', 'Start')}
                          path={`${path}.exceptions.${occurrence.date}.startTime`}
                          value={draftStart}
                          onChange={setDraftStart}
                        />
                        <DateControl
                          appearance="timeOnly"
                          label={t('Ende', 'End')}
                          path={`${path}.exceptions.${occurrence.date}.endTime`}
                          value={draftEnd}
                          onChange={setDraftEnd}
                        />
                        <Button
                          buttonStyle="primary"
                          size="small"
                          onClick={() => {
                            writeException(occurrence.date, {
                              startTime: draftStart,
                              endTime: draftEnd,
                            })
                            setEditTime(null)
                          }}
                        >
                          {t('OK', 'OK')}
                        </Button>
                        <Button
                          buttonStyle="secondary"
                          size="small"
                          onClick={() => setEditTime(null)}
                        >
                          {t('Abbrechen', 'Cancel')}
                        </Button>
                      </div>
                    ) : (
                      <div className="schedule-preview__summary">
                        <span>
                          {time}–{end}
                        </span>
                        {occurrence.cancelled && (
                          <Pill pillStyle="warning" size="small">
                            {t('Fällt aus', 'Cancelled')}
                          </Pill>
                        )}
                        {occurrence.note && (
                          <span className="schedule-preview__note">{occurrence.note}</span>
                        )}
                      </div>
                    )}

                    {editNote === occurrence.date && (
                      <div className="schedule-preview__editor">
                        <TextInput
                          label={t('Notiz', 'Note')}
                          path={`${path}.exceptions.${occurrence.date}.note`}
                          placeholder={t('Notiz', 'Note')}
                          value={draftNote}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setDraftNote(event.target.value)
                          }
                        />
                        <Button
                          buttonStyle="primary"
                          size="small"
                          onClick={() => {
                            writeException(occurrence.date, { note: draftNote })
                            setEditNote(null)
                          }}
                        >
                          {t('OK', 'OK')}
                        </Button>
                        <Button
                          buttonStyle="secondary"
                          size="small"
                          onClick={() => setEditNote(null)}
                        >
                          {t('Abbrechen', 'Cancel')}
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="schedule-preview__actions">
                    <Button
                      buttonStyle="subtle"
                      disabled={readOnly}
                      size="small"
                      onClick={() =>
                        writeException(occurrence.date, {
                          cancelled: !occurrence.cancelled,
                        })
                      }
                    >
                      {occurrence.cancelled
                        ? t('Absage aufheben', 'Undo cancellation')
                        : t('Absagen', 'Cancel')}
                    </Button>
                    <Button
                      buttonStyle="subtle"
                      disabled={readOnly}
                      size="small"
                      onClick={() => {
                        setEditNote(occurrence.date)
                        setDraftNote(exceptions[occurrence.date]?.note ?? '')
                        setEditTime(null)
                      }}
                    >
                      {t('Notiz', 'Note')}
                    </Button>
                    <Button
                      buttonStyle="subtle"
                      disabled={readOnly}
                      size="small"
                      onClick={() => {
                        setEditTime(occurrence.date)
                        setDraftStart(exceptions[occurrence.date]?.startTime ?? time)
                        setDraftEnd(exceptions[occurrence.date]?.endTime ?? end)
                        setEditNote(null)
                      }}
                    >
                      {t('Zeit', 'Time')}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {occurrences.length > limit && (
          <div>
            <Button buttonStyle="secondary" size="small" onClick={() => setLimit(limit + 8)}>
              {t('Mehr anzeigen', 'Show more')}
            </Button>
          </div>
        )}

        <div className="schedule-field__toolbar schedule-field__pause">
          <DateControl
            label={t('Pause von', 'Pause from')}
            path={`${path}.preview.pauseFrom`}
            readOnly={readOnly}
            value={pauseFrom}
            onChange={setPauseFrom}
          />
          <DateControl
            label={t('Pause bis', 'Pause to')}
            path={`${path}.preview.pauseTo`}
            readOnly={readOnly}
            value={pauseTo}
            onChange={setPauseTo}
          />
          <Button
            buttonStyle="secondary"
            disabled={readOnly || !pauseFrom || !pauseTo || pauseTo < pauseFrom}
            size="small"
            onClick={applyPause}
          >
            {t('Termine pausieren', 'Pause occurrences')}
          </Button>
        </div>
      </Collapsible>
    </div>
  )
}

export default ScheduleField
