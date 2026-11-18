import type { CollectionConfig, Field } from 'payload'
import {
  eventCreate,
  eventDelete,
  eventRead,
  eventUpdate,
  isAtLeastWriterField,
} from '@/access'
import { locationGroup } from '@/fields/location'
import { deriveEventFields, enforceEventOrganizerScope, prepareEvent } from '@/hooks/events/prepare'
import { invalidateOccurrencesCache } from '@/lib/occurrences/cache'
import { scheduleProblems } from '@/lib/occurrences/schedule'
import { validateExceptions } from '@/lib/occurrences/prune'
import { isTimeString } from '@/lib/occurrences/time'
import { CLASS_LIKE_TYPES, type EventType } from '@/lib/occurrences/types'

const timeField = (name: string, labelDe: string, labelEn: string): Field => ({
  name,
  type: 'text',
  label: { de: labelDe, en: labelEn },
  admin: { width: '50%' },
  validate: (value: unknown) => {
    if (value === null || value === undefined || value === '') return true
    return isTimeString(value) ? true : 'Bitte HH:mm angeben / use HH:mm'
  },
})

const timeRow = (): Field => ({
  type: 'row',
  fields: [timeField('startTime', 'Beginn', 'Start time'), timeField('endTime', 'Ende', 'End time')],
})

const dateOnly = (name: string, labelDe: string, labelEn: string): Field => ({
  name,
  type: 'date',
  required: true,
  label: { de: labelDe, en: labelEn },
  admin: { date: { pickerAppearance: 'dayOnly' } },
})

const weekdayOptions = [
  { value: 'MO', label: { de: 'Montag', en: 'Monday' } },
  { value: 'TU', label: { de: 'Dienstag', en: 'Tuesday' } },
  { value: 'WE', label: { de: 'Mittwoch', en: 'Wednesday' } },
  { value: 'TH', label: { de: 'Donnerstag', en: 'Thursday' } },
  { value: 'FR', label: { de: 'Freitag', en: 'Friday' } },
  { value: 'SA', label: { de: 'Samstag', en: 'Saturday' } },
  { value: 'SU', label: { de: 'Sonntag', en: 'Sunday' } },
]

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: { de: 'Veranstaltung', en: 'Event' },
    plural: { de: 'Veranstaltungen', en: 'Events' },
  },
  admin: {
    useAsTitle: 'title',
    group: { de: 'Veranstaltungen', en: 'Events' },
    defaultColumns: ['title', 'type', 'firstDate', '_status'],
  },
  access: {
    read: eventRead,
    create: eventCreate,
    update: eventUpdate,
    delete: eventDelete,
  },
  // Drafts are required so unpublished edits can be staged. Deleting a draft
  // and keeping the published version works out of the box.
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [prepareEvent, enforceEventOrganizerScope],
    beforeChange: [deriveEventFields],
    afterChange: [() => invalidateOccurrencesCache()],
    afterDelete: [() => invalidateOccurrencesCache()],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { de: 'Titel', en: 'Title' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      index: true,
      label: { de: 'Art', en: 'Type' },
      options: [
        { value: 'class', label: { de: 'Kurs', en: 'Class' } },
        { value: 'social', label: { de: 'Social', en: 'Social' } },
        { value: 'workshop', label: { de: 'Workshop', en: 'Workshop' } },
        { value: 'talk', label: { de: 'Vortrag', en: 'Talk' } },
        { value: 'walk', label: { de: 'Spaziergang', en: 'Walk' } },
        { value: 'festival', label: { de: 'Festival', en: 'Festival' } },
        { value: 'other', label: { de: 'Sonstiges', en: 'Other' } },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: { de: 'Beschreibung', en: 'Description' },
    },
    {
      name: 'organizers',
      type: 'relationship',
      relationTo: 'organizations',
      hasMany: true,
      required: true,
      access: {
        // Members keep the organizers of their events as they are.
        update: isAtLeastWriterField,
      },
      label: { de: 'Veranstalter:innen', en: 'Organizers' },
      admin: {
        description: {
          de: 'Mehrfachauswahl für gemeinsam ausgerichtete Veranstaltungen.',
          en: 'Select more than one for co-hosted events.',
        },
      },
    },
    {
      // Dynamic question label, shown above the dance-style relationship.
      name: 'danceStylesQuestion',
      type: 'ui',
      admin: {
        components: { Field: '@/components/DanceStylesLabel' },
      },
    },
    {
      name: 'danceStyles',
      type: 'relationship',
      relationTo: 'dances',
      hasMany: true,
      label: { de: 'Tanzstil', en: 'Dance style' },
      // The required-ness depends on the sibling `type`. Payload's `required`
      // cannot express that reliably with conditional fields, so validate here.
      validate: (value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
        const type = siblingData?.type as EventType | undefined
        const chosen = Array.isArray(value) ? value : []
        if (type && CLASS_LIKE_TYPES.includes(type) && chosen.length === 0) {
          return 'Für Kurse und Workshops wird mindestens ein Tanzstil benötigt.'
        }
        return true
      },
    },
    {
      name: 'level',
      type: 'select',
      label: { de: 'Niveau', en: 'Level' },
      admin: {
        condition: (data) =>
          CLASS_LIKE_TYPES.includes(data?.type as EventType),
      },
      options: [
        { value: 'all', label: { de: 'Alle Niveaus', en: 'All levels' } },
        { value: 'beginner', label: { de: 'Anfänger', en: 'Beginner' } },
        { value: 'intermediate', label: { de: 'Mittelstufe', en: 'Intermediate' } },
        { value: 'advanced', label: { de: 'Fortgeschritten', en: 'Advanced' } },
        { value: 'open', label: { de: 'Offen', en: 'Open' } },
      ],
    },
    locationGroup('location', 'Ort', 'Location'),
    {
      name: 'schedule',
      type: 'blocks',
      minRows: 1,
      maxRows: 1,
      required: true,
      label: { de: 'Zeitplan', en: 'Schedule' },
      admin: {
        // Replaces the default blocks UI with the calendar-style editor plus
        // live preview. The field itself is still a normal blocks field.
        components: {
          Field: '@/components/ScheduleField',
        },
      },
      validate: (value: unknown) => {
        const problems = scheduleProblems(value as any)
        return problems.length ? problems.join('; ') : true
      },
      blocks: [
        {
          slug: 'once',
          labels: {
            singular: { de: 'Einmalig', en: 'Once' },
            plural: { de: 'Einmalig', en: 'Once' },
          },
          fields: [
            dateOnly('date', 'Datum', 'Date'),
            timeRow(),
          ],
        },
        {
          slug: 'dates',
          labels: {
            singular: { de: 'Bestimmte Termine', en: 'Specific dates' },
            plural: { de: 'Bestimmte Termine', en: 'Specific dates' },
          },
          fields: [
            {
              name: 'dates',
              type: 'array',
              minRows: 1,
              required: true,
              label: { de: 'Termine', en: 'Dates' },
              fields: [dateOnly('date', 'Datum', 'Date'), timeRow()],
            },
          ],
        },
        {
          slug: 'recurring',
          labels: {
            singular: { de: 'Regelmäßig', en: 'Recurring' },
            plural: { de: 'Regelmäßig', en: 'Recurring' },
          },
          fields: [
            {
              name: 'frequency',
              type: 'select',
              required: true,
              defaultValue: 'weekly',
              label: { de: 'Wiederholung', en: 'Repeat' },
              options: [
                { value: 'weekly', label: { de: 'Wöchentlich', en: 'Weekly' } },
                { value: 'monthly', label: { de: 'Monatlich', en: 'Monthly' } },
              ],
            },
            {
              name: 'interval',
              type: 'number',
              min: 1,
              defaultValue: 1,
              label: { de: 'Intervall', en: 'Interval' },
              admin: {
                description: {
                  de: 'Alle N Wochen bzw. Monate (1 = jede Woche / jeder Monat).',
                  en: 'Every N weeks or months (1 = every week / month).',
                },
              },
            },
            {
              name: 'weekdays',
              type: 'select',
              hasMany: true,
              label: { de: 'Wochentage', en: 'Weekdays' },
              options: weekdayOptions,
              admin: { condition: (data) => data?.frequency !== 'monthly' },
            },
            {
              name: 'monthlyMode',
              type: 'select',
              defaultValue: 'dayOfMonth',
              label: { de: 'Monatsregel', en: 'Monthly rule' },
              options: [
                { value: 'dayOfMonth', label: { de: 'Tag im Monat', en: 'Day of month' } },
                {
                  value: 'nthWeekday',
                  label: { de: 'n-ter Wochentag', en: 'Nth weekday' },
                },
              ],
              admin: { condition: (data) => data?.frequency === 'monthly' },
            },
            {
              name: 'dayOfMonth',
              type: 'number',
              min: 1,
              max: 31,
              label: { de: 'Tag', en: 'Day' },
              admin: {
                condition: (data) =>
                  data?.frequency === 'monthly' && data?.monthlyMode !== 'nthWeekday',
              },
            },
            {
              name: 'nthWeekday',
              type: 'select',
              label: { de: 'Welcher', en: 'Which' },
              options: [
                { value: '1', label: { de: '1.', en: '1st' } },
                { value: '2', label: { de: '2.', en: '2nd' } },
                { value: '3', label: { de: '3.', en: '3rd' } },
                { value: '4', label: { de: '4.', en: '4th' } },
                { value: '-1', label: { de: 'Letzter', en: 'Last' } },
              ],
              admin: {
                condition: (data) =>
                  data?.frequency === 'monthly' && data?.monthlyMode === 'nthWeekday',
              },
            },
            {
              name: 'weekday',
              type: 'select',
              label: { de: 'Wochentag', en: 'Weekday' },
              options: weekdayOptions,
              admin: {
                condition: (data) =>
                  data?.frequency === 'monthly' && data?.monthlyMode === 'nthWeekday',
              },
            },
            dateOnly('startDate', 'Startdatum', 'Start date'),
            timeRow(),
            {
              name: 'endMode',
              type: 'select',
              required: true,
              defaultValue: 'never',
              label: { de: 'Ende', en: 'End' },
              options: [
                { value: 'never', label: { de: 'Nie', en: 'Never' } },
                { value: 'until', label: { de: 'Bis zum Datum', en: 'Until date' } },
                { value: 'count', label: { de: 'Nach Anzahl', en: 'After count' } },
              ],
            },
            {
              name: 'until',
              type: 'date',
              label: { de: 'Bis', en: 'Until' },
              admin: {
                date: { pickerAppearance: 'dayOnly' },
                condition: (data) => data?.endMode === 'until',
              },
            },
            {
              name: 'count',
              type: 'number',
              min: 1,
              label: { de: 'Anzahl Termine', en: 'Number of occurrences' },
              admin: { condition: (data) => data?.endMode === 'count' },
            },
          ],
        },
        {
          slug: 'course',
          labels: {
            singular: { de: 'Kurs-Block', en: 'Course block' },
            plural: { de: 'Kurs-Blöcke', en: 'Course blocks' },
          },
          fields: [
            dateOnly('startDate', 'Startdatum', 'Start date'),
            {
              name: 'weekday',
              type: 'select',
              required: true,
              label: { de: 'Wochentag', en: 'Weekday' },
              options: weekdayOptions,
            },
            timeRow(),
            {
              name: 'sessions',
              type: 'number',
              required: true,
              min: 1,
              defaultValue: 6,
              label: { de: 'Anzahl Einheiten', en: 'Number of sessions' },
            },
            {
              name: 'skipDates',
              type: 'array',
              label: { de: 'Ausfalltermine', en: 'Skip dates' },
              labels: {
                singular: { de: 'Ausfalltermin', en: 'Skip date' },
                plural: { de: 'Ausfalltermine', en: 'Skip dates' },
              },
              admin: {
                description: {
                  de: 'Diese Termine zählen nicht mit; die Anzahl der Einheiten bleibt erhalten.',
                  en: 'Skipped dates do not reduce the session count.',
                },
              },
              fields: [dateOnly('date', 'Datum', 'Date')],
            },
          ],
        },
      ],
    },
    {
      name: 'exceptions',
      type: 'json',
      label: { de: 'Ausnahmen', en: 'Exceptions' },
      admin: {
        // Edited through the exception table in the schedule preview. Keep the
        // field stored, but do not expose the raw JSON to editors.
        hidden: true,
        description: {
          de: 'Wird von der Vorschau gepflegt: Schlüssel ist das lokale Datum (YYYY-MM-DD).',
          en: 'Maintained by the preview: keyed by local date (YYYY-MM-DD).',
        },
      },
      validate: (value: unknown) => validateExceptions(value),
    },
    {
      name: 'firstDate',
      type: 'date',
      index: true,
      label: { de: 'Erster Termin', en: 'First date' },
      admin: {
        readOnly: true,
        date: { pickerAppearance: 'dayOnly' },
        description: {
          de: 'Berechnet, nicht bearbeiten.',
          en: 'Derived, do not edit.',
        },
      },
    },
    {
      name: 'lastDate',
      type: 'date',
      index: true,
      label: { de: 'Letzter Termin', en: 'Last date' },
      admin: {
        readOnly: true,
        date: { pickerAppearance: 'dayOnly' },
        description: {
          de: 'Leer bei offenen Serien.',
          en: 'Empty for open-ended series.',
        },
      },
    },
    {
      name: 'lastConfirmed',
      type: 'date',
      label: { de: 'Zuletzt bestätigt', en: 'Last confirmed' },
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: {
          de: 'Für offene Serien: wann der Veranstalter den Zeitplan zuletzt geprüft hat.',
          en: 'For open-ended series: when the organizer last checked the schedule.',
        },
      },
    },
  ],
}
