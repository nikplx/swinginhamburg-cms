import * as migration_20260322_135644 from './20260322_135644';
import * as migration_20260325_100404 from './20260325_100404';
import * as migration_20260325_160803 from './20260325_160803';
import * as migration_20260405_150616 from './20260405_150616';
import * as migration_20260414_202159 from './20260414_202159';
import * as migration_20260522_133218 from './20260522_133218';
import * as migration_20260525_125629 from './20260525_125629';
import * as migration_20260606_175302 from './20260606_175302';
import * as migration_20260612_220819 from './20260612_220819';
import * as migration_20261117_224917_unified_events from './20261117_224917_unified_events';
import * as migration_20261118_124847_remove_teachers from './20261118_124847_remove_teachers';
import * as migration_20261118_161637_organization_members from './20261118_161637_organization_members';
import * as migration_20261118_190455_organization_description_richtext from './20261118_190455_organization_description_richtext';
import * as migration_20261118_190937_event_type_options from './20261118_190937_event_type_options';
import * as migration_20261118_212710_remove_workshop_type from './20261118_212710_remove_workshop_type';
import * as migration_20261121_135132_remove_system_role_last_confirmed from './20261121_135132_remove_system_role_last_confirmed';

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
    name: '20260325_160803',
  },
  {
    up: migration_20260405_150616.up,
    down: migration_20260405_150616.down,
    name: '20260405_150616',
  },
  {
    up: migration_20260414_202159.up,
    down: migration_20260414_202159.down,
    name: '20260414_202159',
  },
  {
    up: migration_20260522_133218.up,
    down: migration_20260522_133218.down,
    name: '20260522_133218',
  },
  {
    up: migration_20260525_125629.up,
    down: migration_20260525_125629.down,
    name: '20260525_125629',
  },
  {
    up: migration_20260606_175302.up,
    down: migration_20260606_175302.down,
    name: '20260606_175302',
  },
  {
    up: migration_20260612_220819.up,
    down: migration_20260612_220819.down,
    name: '20260612_220819',
  },
  {
    up: migration_20261117_224917_unified_events.up,
    down: migration_20261117_224917_unified_events.down,
    name: '20261117_224917_unified_events',
  },
  {
    up: migration_20261118_124847_remove_teachers.up,
    down: migration_20261118_124847_remove_teachers.down,
    name: '20261118_124847_remove_teachers',
  },
  {
    up: migration_20261118_161637_organization_members.up,
    down: migration_20261118_161637_organization_members.down,
    name: '20261118_161637_organization_members',
  },
  {
    up: migration_20261118_190455_organization_description_richtext.up,
    down: migration_20261118_190455_organization_description_richtext.down,
    name: '20261118_190455_organization_description_richtext',
  },
  {
    up: migration_20261118_190937_event_type_options.up,
    down: migration_20261118_190937_event_type_options.down,
    name: '20261118_190937_event_type_options',
  },
  {
    up: migration_20261118_212710_remove_workshop_type.up,
    down: migration_20261118_212710_remove_workshop_type.down,
    name: '20261118_212710_remove_workshop_type',
  },
  {
    up: migration_20261121_135132_remove_system_role_last_confirmed.up,
    down: migration_20261121_135132_remove_system_role_last_confirmed.down,
    name: '20261121_135132_remove_system_role_last_confirmed'
  },
];
