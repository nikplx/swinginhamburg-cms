import { isAtLeastWriter } from '@/access'
import { GlobalConfig } from 'payload'

export const Swing: GlobalConfig = {
  slug: 'swing',
  access: {
    read: () => true,
    update: isAtLeastWriter,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
  ],
}
