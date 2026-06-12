
import { isAtLeastWriter } from '@/access'
import { GlobalConfig } from 'payload'

export const SchoolsGlobal: GlobalConfig = {
  slug: 'schools-global',
  access: {
    read: () => true,
    update: isAtLeastWriter,
  },
  fields: [
    {
      name: 'howToLearn',
      type: 'richText',
      localized: true,
    },
  ],
}
