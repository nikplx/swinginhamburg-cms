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

/** Any logged-in user, regardless of role. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/**
 * Organizations and dance styles are public reference data. Organization
 * `members` stays hidden through field-level access.
 */
export const publicRead: Access = () => true

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

const PUBLISHED: Where = { _status: { equals: 'published' } }

/**
 * Writers/admins: every event. Linked users: events of their organizations
 * (drafts included, because that is what they edit). Everyone else: nothing.
 */
const memberScope = async (req: any): Promise<boolean | Where> => {
  const user = req.user
  if (!user) return false
  if (isAtLeastWriterUser(user)) return true

  const organizationIDs = await memberOrganizationIDs(req)
  return organizationIDs.length ? { organizers: { in: organizationIDs } } : false
}

/** Anonymous visitors only ever see published events. */
export const eventRead: Access = ({ req }) => (req.user ? memberScope(req) : PUBLISHED)

/**
 * Never derived from the read scope: a read constraint returned from a write
 * rule would grant that write to everyone matching it, anonymous users included.
 * Deleting co-hosted events is further restricted in `restrictEventDelete`.
 */
export const eventUpdate: Access = ({ req }) => memberScope(req)
export const eventDelete: Access = ({ req }) => memberScope(req)

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
// Role helpers
// ---------------------------------------------------------------------------

// Collection access
export const isAdmin = grantIf<Access>('admin')
export const isAtLeastWriter = grantIf<Access>('admin', 'writer')

// Field access
export const isAdminField = grantIf<FieldAccess>('admin')
export const isAtLeastWriterField = grantIf<FieldAccess>('admin', 'writer')
