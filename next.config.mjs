import path from 'path'
import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'

// The CMS is a submodule of the frontend repo. Without an explicit root,
// Next/Turbopack picks the parent folder (it has its own lockfile) as the
// workspace root and loads the frontend's src/middleware.ts, which breaks
// every /api route. It would also nest the standalone output under cms/.
const root = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: root,
  turbopack: { root },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
