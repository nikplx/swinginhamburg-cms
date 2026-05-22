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
      name: 'whatIsSwing',
      type: 'richText',
      localized: true,
    },
    {
      name: 'dances',
      type: 'array',
      label: 'Dances',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        }
      ]
    },
    {
      name: 'howToLearn',
      type: 'richText',
      localized: true,
    },
  ],
}
