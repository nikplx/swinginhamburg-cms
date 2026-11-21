import { hiddenForLowerRoles, isAtLeastWriter } from '@/access'
import { GlobalConfig } from 'payload'
import { richTextHtml } from '@/fields/richTextHtml'

export const Swing: GlobalConfig = {
  slug: 'swing',
  label: { de: 'Swing', en: 'Swing' },
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
      name: 'whatIsSwing',
      type: 'richText',
      localized: true,
      label: { de: 'Was ist Swing?', en: 'What is Swing?' },
    },
    richTextHtml('whatIsSwing'),
    {
      name: 'howToLearn',
      type: 'richText',
      localized: true,
      label: { de: 'Wie lernt man Swing?', en: 'How to learn Swing' },
    },
    richTextHtml('howToLearn'),
    {
      name: 'faq',
      type: 'richText',
      localized: true,
      label: { de: 'Häufige Fragen (FAQ)', en: 'FAQ' },
    },
    richTextHtml('faq'),
  ],
}
