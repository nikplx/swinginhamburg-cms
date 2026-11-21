import { hiddenForLowerRoles, isAtLeastWriter } from '@/access'
import { GlobalConfig } from 'payload'
import { richTextHtml } from '@/fields/richTextHtml'

export const About: GlobalConfig = {
  slug: 'about',
  label: { de: 'Über uns', en: 'About' },
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
      name: 'content',
      type: 'richText',
      localized: true,
      label: { de: 'Inhalt', en: 'Content' },
    },
    richTextHtml('content'),
  ],
}
