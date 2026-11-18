import { hiddenForLowerRoles, isAtLeastWriter } from '@/access'
import { GlobalConfig } from 'payload'

export const Swing: GlobalConfig = {
  slug: 'swing',
  access: {
    read: () => true,
    update: isAtLeastWriter,
  },
  admin: {
    hidden: hiddenForLowerRoles,
  },
  fields: [
    {
      name: 'whatIsSwing',
      type: 'richText',
      localized: true,
    },
    {
      name: 'howToLearn',
      type: 'richText',
      localized: true,
    },
    {
      name: 'faq',
      type: 'richText',
      localized: true,
    },
  ],
}
