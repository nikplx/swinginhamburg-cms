import { Access, FieldAccess } from 'payload'

const ALL_ROLES = ['admin', 'writer', 'school', 'guest'] as const

export type UserRole = (typeof ALL_ROLES)[number]

const checkRole = (user: any, roles: UserRole[]) => roles.includes(user?.role)

const grantIf = <T extends Access | FieldAccess>(...roles: UserRole[]): T => {
  return (({ req: { user } }: any) => checkRole(user, roles)) as T
}

export const canReadUser: Access = ({ req: { user } }) => {
  if (user?.role === 'admin' || user?.role === 'writer') return true

  if (user) {
    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}

// ---------------------------------------------------------------------------
// Events / organizations / dance styles
//
// Deliberately minimal and kept together so finer-grained, per-organization
// permissions can replace these in one place later.
// ---------------------------------------------------------------------------

/** Any logged-in admin user may create, update or delete. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/** Organizations and dance styles are public reference data. */
export const publicRead: Access = () => true

/**
 * Anonymous visitors only ever see published events. Drafts stay private even
 * though their `_status` may be set on the document.
 */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

// ---------------------------------------------------------------------------
// Legacy helpers still used by users/media
// ---------------------------------------------------------------------------

// Usage in Collections
export const isAdmin = grantIf<Access>('admin')
export const isAtLeastWriter = grantIf<Access>('admin', 'writer')

// Usage in Fields
export const isAdminField = grantIf<FieldAccess>('admin')
export const isAtLeastWriterField = grantIf<FieldAccess>('admin', 'writer')
