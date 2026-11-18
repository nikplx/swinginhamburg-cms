import { hiddenForLowerRoles, isAtLeastWriter } from '@/access'
import { GlobalConfig } from 'payload'

export const Index: GlobalConfig = {
  slug: 'index',
  label: { de: 'Startseite', en: 'Homepage' },
  access: {
    read: () => true,
    update: isAtLeastWriter,
  },
  admin: {
    hidden: hiddenForLowerRoles,
    group: { de: 'Seiteninhalte', en: 'Page content' },
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      label: { de: 'Untertitel', en: 'Subtitle' },
    },
    {
      name: 'intro',
      type: 'richText',
      localized: true,
      label: { de: 'Einleitung', en: 'Intro' },
      admin: {
        description: {
          de: 'Begrüßungstext in der Seitenleiste.',
          en: 'Greeting text in the sidebar.',
        },
      },
    },
    {
      name: 'donation',
      type: 'richText',
      localized: true,
      label: { de: 'Spendentext', en: 'Donation text' },
    },
    {
      name: 'donationBox',
      type: 'richText',
      localized: true,
      label: { de: 'Umfrage-Box', en: 'Poll box' },
      admin: {
        description: {
          de: 'Hinweisbox auf der Startseite. Der erste Satz wird als Überschrift verwendet.',
          en: 'Notice box on the homepage. The first sentence is used as the headline.',
        },
      },
    },
    {
      name: 'disclaimer',
      type: 'richText',
      localized: true,
      label: { de: 'Haftungshinweis', en: 'Disclaimer' },
    },
    {
      name: 'learnHeader',
      type: 'text',
      localized: true,
      label: { de: 'Überschrift „Lernen“', en: '“Learn” heading' },
    },
    {
      name: 'learnDescription',
      type: 'text',
      localized: true,
      label: { de: 'Beschreibung „Lernen“', en: '“Learn” description' },
    },
  ],
}
