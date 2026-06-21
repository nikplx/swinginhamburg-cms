# Swing in Hamburg — CMS

Payload 3.x admin and content backend for the [Swing in Hamburg](https://github.com/nikplx/swinginhamburg) Astro site. Exposes the `classes`, `schools`, and `index` (homepage) content consumed by the frontend.

- **Stack:** Payload 3 on Next.js 15, Postgres (PostGIS, via Docker), Resend for transactional email
- **Package manager:** pnpm
- **Admin UI:** http://localhost:3000/admin

This package is a git submodule of the parent [`swinginhamburg`](https://github.com/nikplx/swinginhamburg) repository. The parent repo's README has the full local-development walkthrough (env file, two-terminal setup, fixture restore). The notes below are a CMS-specific quick reference.

## Local development

Once `.env` is in place (`DATABASE_URL` pointing at the Dockerised Postgres and a `PAYLOAD_SECRET` — see `.env.example`):

```bash
pnpm install
pnpm run setup   # first run: docker-compose up -d, restore db-fixture.sql, next dev
pnpm run dev     # subsequent runs
```

If the database gets into a bad state, `pnpm run dev:clean` drops the Postgres volume and re-runs `setup` from a clean fixture.

## Useful scripts

| Command                       | What it does                                                      |
| :---------------------------- | :---------------------------------------------------------------- |
| `pnpm run dev`                | Next.js dev server on port 3000                                   |
| `pnpm run setup`              | Start Postgres in Docker, restore the fixture, then `dev`         |
| `pnpm run dev:clean`          | Drop the Postgres volume and re-run `setup`                       |
| `pnpm run db:dump`            | Export the running Postgres to `db-fixture.sql`                   |
| `pnpm run db:restore`         | Restore `db-fixture.sql` into the running Postgres                |
| `pnpm run generate:types`     | Regenerate `src/payload-types.ts` after schema changes            |
| `pnpm run generate:importmap` | Regenerate the admin import map after admin component changes     |
| `pnpm run build` / `start`    | Production build and start                                        |
| `pnpm run test`               | Integration tests (`vitest`) and end-to-end tests (`playwright`)  |

## Project conventions

See [`AGENTS.md`](./AGENTS.md) for the Payload patterns this project follows (collections, access control, hooks, custom components).
