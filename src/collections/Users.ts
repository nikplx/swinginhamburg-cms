import { canReadUser, hiddenForLowerRoles, isAdmin, isAdminField } from '@/access'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { de: 'Benutzer', en: 'User' },
    plural: { de: 'Benutzer', en: 'Users' },
  },
  access: {
    read: canReadUser,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
  },
  admin: {
    hidden: hiddenForLowerRoles,
    useAsTitle: 'email',
    group: { de: 'Verwaltung', en: 'Administration' },
  },
  auth: {
    useAPIKey: true,
    forgotPassword: {
      generateEmailSubject: () => 'Set up your account at swinginhamburg.de',
      generateEmailHTML: (req) => {
        if (!req) {
          return ''
        }
        const { token, user } = req

        const setupURL = `${process.env.DOMAIN || "http://localhost:3000"}/admin/reset/${token}`

        return `
          <h1>Welcome, ${user.email}!</h1>
          <p>You have been invited to manage your dancing school's bio and class schedule.</p>
          <p><a href="${setupURL}">Click here to set your password and activate your account</a></p>
        `
      },
    },
  },

  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          try {
            await req.payload.forgotPassword({
              collection: 'users',
              data: {
                email: doc.email,
              },
              req,
              disableEmail: false,
            })
            console.log(`Invite email dispatched to ${doc.email}`)
          } catch (error) {
            console.error('Failed to trigger invite email:', error)
          }
        }
      },
    ],
  },

  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'guest',
      label: { de: 'Rolle', en: 'Role' },
      options: [
        { value: 'system', label: { de: 'System', en: 'System' } },
        { value: 'admin', label: { de: 'Administrator:in', en: 'Admin' } },
        { value: 'writer', label: { de: 'Redakteur:in', en: 'Writer' } },
        { value: 'school', label: { de: 'Schule', en: 'School' } },
        { value: 'guest', label: { de: 'Gast', en: 'Guest' } },
      ],
      access: {
        update: isAdminField,
      },
      admin: {
        description: {
          de: 'Redakteur:innen und Administrator:innen verwalten alle Inhalte. Schulen und Gäste sehen nur ihre eigenen Organisationen und deren Veranstaltungen.',
          en: 'Writers and admins manage all content. Schools and guests only see their own organizations and their events.',
        },
      },
    },
    {
      name: 'organizations',
      type: 'join',
      collection: 'organizations',
      on: 'members',
      label: { de: 'Organisationen', en: 'Organizations' },
      admin: {
        defaultColumns: ['name', 'kind'],
        description: {
          de: 'Organisationen, deren Beschreibung dieser Benutzer bearbeiten darf.',
          en: 'Organizations whose description this user may edit.',
        },
      },
    },
  ],
}
