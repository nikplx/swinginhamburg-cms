
import { hiddenForLowerRoles, isAtLeastWriter } from '@/access'
import { GlobalConfig } from 'payload'

export const SchoolsGlobal: GlobalConfig = {
  slug: 'schools-global',
  access: {
    read: () => true,
    update: isAtLeastWriter,
  },
  admin: {
    hidden: hiddenForLowerRoles,
  },
  fields: [
    {
      name: 'howToLearn',
      type: 'richText',
      localized: true,
    },
  ],
}
