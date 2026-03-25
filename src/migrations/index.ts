import * as migration_20260322_135644 from './20260322_135644';
import * as migration_20260325_100404 from './20260325_100404';
import * as migration_20260325_160803 from './20260325_160803';

export const migrations = [
  {
    up: migration_20260322_135644.up,
    down: migration_20260322_135644.down,
    name: '20260322_135644',
  },
  {
    up: migration_20260325_100404.up,
    down: migration_20260325_100404.down,
    name: '20260325_100404',
  },
  {
    up: migration_20260325_160803.up,
    down: migration_20260325_160803.down,
    name: '20260325_160803'
  },
];
