import { isAtLeastWriter } from '@/access'
import { GlobalConfig } from 'payload'

export const Index: GlobalConfig = {
  slug: 'index',
  access: {
    read: () => true,
    update: isAtLeastWriter,
  },
  fields: [
    {
      name: 'subtitle',
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
