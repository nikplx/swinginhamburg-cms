import { hiddenForLowerRoles, isAtLeastWriter } from '@/access'
import { simpleRichTextEditor } from '@/fields/editors'
import { GlobalConfig } from 'payload'

export const SchoolsGlobal: GlobalConfig = {
  slug: 'schools-global',
  label: { de: 'Organisationen-Seite', en: 'Organizations page' },
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
      name: 'howToLearn',
      type: 'richText',
      localized: true,
      label: { de: 'Wie lernt man Swing?', en: 'How to learn Swing' },
      editor: simpleRichTextEditor,
      admin: {
        description: {
          de: 'Einleitungstext auf der Organisationen-Seite.',
          en: 'Introductory text on the organizations page.',
        },
      },
    },
  ],
}
