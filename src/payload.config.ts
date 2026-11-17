import { postgresAdapter } from '@payloadcms/db-postgres'
import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { migrations } from './migrations'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Teachers } from './collections/Teachers'
import { Dances } from './collections/Dances'
import { Events } from './collections/Events'
import { Organizations } from './collections/Organizations'
import { resendAdapter } from '@payloadcms/email-resend'
import { Index } from './globals/index'
import { About } from './globals/about'
import { Swing } from './globals/swing'
import { SchoolsGlobal } from './globals/schools'
import { occurrencesEndpoint } from './endpoints/occurrences'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // The admin must be usable in German; German is also the fallback for
  // browsers whose language is not configured.
  i18n: {
    fallbackLanguage: 'de',
    // payload@3.93 vs @payloadcms/translations@3.79: a few newer keys are typed
    // as required. The shipped German translations are complete for this app.
    supportedLanguages: { de: de as any, en: en as any },
  },
  email: process.env.RESEND_API_KEY ? resendAdapter({
    defaultFromAddress: 'swinginhamburg@eins9und30.de',
    defaultFromName: 'Swing in Hamburg Support',
    apiKey: process.env.RESEND_API_KEY || '',
  }) : undefined,
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
    defaultLocale: 'de',
  },
  globals: [Index,About,Swing,SchoolsGlobal],
  serverURL: process.env.DOMAIN || 'http://localhost:3000',
  collections: [Users, Media, Teachers, Dances, Events, Organizations],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      EXPERIMENTAL_TableFeature(), // Enables the table tool
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  endpoints: [
    occurrencesEndpoint,
    {
      path: '/health',
      method: 'get',
      handler: async (_) => {
        return Response.json({
          message: "ok",
        })
      },
    },
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // The database uses PostGIS (older migrations created geometry columns).
    // Declaring the extension keeps `push` from trying to drop system tables
    // such as `spatial_ref_sys` now that no Payload field uses geometry.
    extensions: ['postgis'],
    push: process.env.NODE_ENV === 'development',
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [],
})
