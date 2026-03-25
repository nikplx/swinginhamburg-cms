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

export const isOwnerOrStaff: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'admin' || user.role === 'writer') return true

  return {
    owner: {
      equals: user.id,
    },
  }
}

export const canCreateClass: Access = async ({ req, data }) => {
  const user = req.user
  if (!user) return false

  // Admins and Writers can create classes for any school
  if (user.role === 'admin' || user.role === 'writer') return true
  if (user.role !== 'school') return false

  // If the user is a school role, they MUST provide a school ID
  const schoolId = data?.school
  if (!schoolId) return false 

  // Fetch the target school to verify ownership
  try {
    const school = await req.payload.findByID({
      collection: 'schools',
      id: schoolId,
      depth: 0, // Performance optimization: we only need the raw ID, not populated relationships
    })

    // Handle whether the owner field is populated or just an ID
    const ownerId = typeof school.owner === 'object' ? school.owner?.id : school.owner

    return ownerId === user.id
  } catch (error) {
    // If the school doesn't exist or there's a DB error, deny access
    return false
  }
}

// 2. Check if the user can UPDATE, DELETE, or READ their own classes
export const canManageClass: Access = async ({ req }) => {
  const user = req.user
  if (!user) return false

  // Admins and Writers have unrestricted access
  if (user.role === 'admin' || user.role === 'writer') return true
  if (user.role !== 'school') return false

  // Find all schools owned by this specific user
  const ownedSchools = await req.payload.find({
    collection: 'schools',
    where: {
      owner: {
        equals: user.id,
      },
    },
    depth: 0,
    pagination: false, // Ensure we get ALL their schools, not just the first 10
  })

  // Extract just the IDs
  const schoolIds = ownedSchools.docs.map((doc) => doc.id)

  // If they own no schools, they can manage no classes
  if (schoolIds.length === 0) return false

  // Return a query constraint: The class's 'school' field MUST be in their list of owned schools
  return {
    school: {
      in: schoolIds,
    },
  }
}

export const isOwnerOrStaffField: FieldAccess = ({ req: { user }, doc }) => {
  if (user?.role === 'admin' || user?.role === 'writer') return true

  return doc?.owner === user?.id || (typeof doc?.owner === 'object' && doc.owner?.id === user?.id)
}

// Usage in Collections
export const isAdmin = grantIf<Access>('admin')
export const isAtLeastWriter = grantIf<Access>('admin', 'writer')

// Usage in Fields
export const isAdminField = grantIf<FieldAccess>('admin')
export const isAtLeastWriterField = grantIf<FieldAccess>('admin', 'writer')
