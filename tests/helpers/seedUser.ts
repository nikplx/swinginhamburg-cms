import { getPayload } from 'payload'
import config from '../../src/payload.config.js'

export const testUser = {
  email: 'dev@payloadcms.com',
  password: 'test',
}



/**
 * Creates the test user if it does not exist yet.
 */
export async function seedTestUser(): Promise<void> {
  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: testUser.email } },
    limit: 1,
  })

  if (existing.docs.length) return

  await payload.create({
    collection: 'users',
    data: { email: testUser.email, password: testUser.password } as any,
  })
}

/**
 * Cleans up test user after tests
 */
export async function cleanupTestUser(): Promise<void> {
  const payload = await getPayload({ config })

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })
}
