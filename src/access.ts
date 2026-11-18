import { Access, FieldAccess, Where } from 'payload'

const ALL_ROLES = ['admin', 'writer', 'school', 'guest'] as const

export type UserRole = (typeof ALL_ROLES)[number]

const checkRole = (user: any, roles: UserRole[]) => roles.includes(user?.role)

const grantIf = <T extends Access | FieldAccess>(...roles: UserRole[]): T => {
  return (({ req: { user } }: any) => checkRole(user, roles)) as T
}

/** Writers and admins manage content; everyone else only edits their own organization. */
export const isAtLeastWriterUser = (user: any): boolean =>
  user?.role === 'admin' || user?.role === 'writer'

export const canReadUser: Access = ({ req: { user } }) => {
  if (isAtLeastWriterUser(user)) return true

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
// ---------------------------------------------------------------------------

/** Any logged-in admin user may create, update or delete. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/** Organizations and dance styles are public reference data. */
export const publicRead: Access = () => true

/**
 * Visitors and editors see every organization; members of an organization (and
 * other lower roles) only the ones they are linked to.
 */
export const organizationRead: Access = ({ req: { user } }) => {
  if (!user) return true
  if (isAtLeastWriterUser(user)) return true
  return { members: { equals: user.id } }
}

/** IDs of the organizations a user is linked to. */
export const memberOrganizationIDs = async (req: any): Promise<(number | string)[]> => {
  const result = await req.payload.find({
    collection: 'organizations',
    where: { members: { equals: req.user.id } },
    depth: 0,
    pagination: false,
    select: { id: true },
    req,
    overrideAccess: true,
  })
  return result.docs.map((doc: { id: number | string }) => doc.id)
}

const eventScope = async (req: any): Promise<boolean | Where> => {
  const user = req.user
  if (!user) return { _status: { equals: 'published' } }
  if (isAtLeastWriterUser(user)) return true

  const organizationIDs = await memberOrganizationIDs(req)
  if (!organizationIDs.length) return { id: { in: [] } }
  return { organizers: { in: organizationIDs } }
}

/**
 * Anonymous visitors only ever see published events. Lower roles additionally
 * only see events of organizations they belong to; drafts included, because
 * that is what they edit.
 */
export const eventRead: Access = ({ req }) => eventScope(req)

/** Lower roles may only change events of their own organizations. */
export const eventUpdate: Access = ({ req }) => eventScope(req)
export const eventDelete: Access = ({ req }) => eventScope(req)

/**
 * Creating is open to authenticated users so the admin create view renders; the
 * organizer scope itself is enforced in `enforceEventOrganizerScope`.
 */
export const eventCreate: Access = authenticated

/** Writers/admins edit any organization; members only their own. */
export const organizationUpdate: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isAtLeastWriterUser(user)) return true
  return { members: { equals: user.id } }
}

/**
 * Hides collections and globals from the admin navigation for roles below
 * writer. They keep access to organizations and events only.
 */
export const hiddenForLowerRoles = ({ user }: { user?: any }): boolean =>
  !isAtLeastWriterUser(user)

// ---------------------------------------------------------------------------
// Legacy helpers still used by users/media
// ---------------------------------------------------------------------------

// Usage in Collections
export const isAdmin = grantIf<Access>('admin')
export const isAtLeastWriter = grantIf<Access>('admin', 'writer')

// Usage in Fields
export const isAdminField = grantIf<FieldAccess>('admin')
export const isAtLeastWriterField = grantIf<FieldAccess>('admin', 'writer')
