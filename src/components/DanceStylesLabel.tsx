'use client'

import React from 'react'
import { FieldLabel, useFormFields } from '@payloadcms/ui'
import { useAdminText } from './useAdminText'

/**
 * The dance-style question changes with the event type:
 * - class/workshop: required, "Which dance is taught?"
 * - everything else: optional, "Dance focus (optional)"
 *
 * Implemented as a reactive UI field so it follows the type select without a
 * page reload. The actual required-ness is enforced in the relationship's
 * validate function on the server.
 */
export const DanceStylesLabel: React.FC = () => {
  const type = useFormFields(([fields]) => fields?.type?.value as string | undefined)
  const classLike = type === 'class' || type === 'workshop'
  const t = useAdminText()

  return (
    <div className="field-type">
      <FieldLabel
        label={
          classLike
            ? t('Welcher Tanz wird unterrichtet?', 'Which dance is taught?')
            : t('Tanzfokus (optional)', 'Dance focus (optional)')
        }
        path="danceStyles"
        required={classLike}
      />
    </div>
  )
}

export default DanceStylesLabel
