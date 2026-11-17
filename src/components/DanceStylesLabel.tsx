'use client'

import React from 'react'
import { FieldLabel, useFormFields } from '@payloadcms/ui'

/**
 * The dance-style question changes with the event type:
 * - class/workshop: required, "Welcher Tanz wird unterrichtet?"
 * - everything else: optional, "Tanzfokus (optional)"
 *
 * Implemented as a reactive UI field so it follows the type select without a
 * page reload. The actual required-ness is enforced in the relationship's
 * validate function on the server.
 */
export const DanceStylesLabel: React.FC = () => {
  const type = useFormFields(([fields]) => fields?.type?.value as string | undefined)
  const classLike = type === 'class' || type === 'workshop'

  return (
    <div className="field-type">
      <FieldLabel
        label={classLike ? 'Welcher Tanz wird unterrichtet?' : 'Tanzfokus (optional)'}
        path="danceStyles"
        required={classLike}
      />
    </div>
  )
}

export default DanceStylesLabel
