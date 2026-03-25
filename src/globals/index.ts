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
      name: 'intro',
      type: 'richText',
      localized: true,
    },
    {
      name: 'donation',
      type: 'richText',
      localized: true,
    },
    {
      name: 'donationBox',
      type: 'richText',
      localized: true,
    },
    {
      name: 'disclaimer',
      type: 'richText',
      localized: true,
    },
    {
      name: 'learnHeader',
      type: 'text',
      localized: true,
    },
    {
      name: 'learnDescription',
      type: 'text',
      localized: true,
    },
  ],
}
