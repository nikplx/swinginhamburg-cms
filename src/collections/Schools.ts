import {
  isAdmin,
  isAdminField,
  isAtLeastWriter,
  isAtLeastWriterField,
  isOwnerOrStaff,
  isOwnerOrStaffField,
} from '@/access'
import type { CollectionConfig } from 'payload'
export const Schools: CollectionConfig = {
  slug: 'schools',
  admin: {
    useAsTitle: 'name',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isOwnerOrStaff,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'teachers',
      type: 'relationship',
      relationTo: 'teachers',
      hasMany: true,
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      index: true,
      access: {
        read: isOwnerOrStaffField,
        update: isAdminField,
      },
    },
  ],
}
