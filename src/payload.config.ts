import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { migrations } from './migrations'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Classes } from './collections/Classes'
import { Schools } from './collections/Schools'
import { Teachers } from './collections/Teachers'
import { Index } from './globals'
import { integer, pgTable, varchar } from '@payloadcms/db-postgres/drizzle/pg-core'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'German',
        code: 'de',
      },
    ],
    defaultLocale: 'en',
  },
  globals: [Index],
  serverURL: process.env.DOMAIN || 'http://localhost:3000',
  collections: [Users, Media, Classes, Schools, Teachers],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: process.env.NODE_ENV === 'development',
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [],
})
