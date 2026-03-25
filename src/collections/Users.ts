import { canReadUser, isAdmin, isAdminField, isAtLeastWriter } from '@/access'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: canReadUser,
    create: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'email',
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

        const setupURL = `https://${import.meta.env.DOMAIN}/setup-account?token=${token}`

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
      options: ['admin', 'writer', 'school', 'guest'],
      access: {
        update: isAdminField,
      },
    },
  ],
}
