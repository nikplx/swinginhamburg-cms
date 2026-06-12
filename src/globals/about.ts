import { isAtLeastWriter } from '@/access'
import { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
    update: isAtLeastWriter,
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
  ],
}
