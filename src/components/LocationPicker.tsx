'use client'

import React, { useState, type KeyboardEvent } from 'react'
import { Banner, Button, FieldDescription, TextInput, useDocumentForm, useFormFields } from '@payloadcms/ui'
import './LocationPicker.scss'

type Props = {
  path: string
}

/**
 * Small geocoder helper rendered inside the location group. It writes to the
 * sibling fields (`address`, `lat`, `lng`) via form state, so it works for both
 * `events.location` and `organizations.defaultLocation`.
 */
export const LocationPicker: React.FC<Props> = ({ path }) => {
  const basePath = path.replace(/\.?geocode$/, '')
  const { dispatchFields } = useDocumentForm()

  const address = useFormFields(
    ([fields]) => (fields?.[`${basePath}.address`]?.value as string) ?? '',
  )
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const search = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    // Do not submit the whole document.
    event.preventDefault()
    if (query.trim().length < 4) return

    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
          query,
        )}`,
      )
      setResults(await response.json())
    } catch (searchError) {
      console.error('Geocoding failed', searchError)
      setError('Adresssuche fehlgeschlagen. Bitte erneut versuchen.')
    } finally {
      setLoading(false)
    }
  }

  const select = (result: any) => {
    setResults([])
    setQuery(result.display_name)
    dispatchFields({
      type: 'UPDATE',
      path: `${basePath}.address`,
      value: result.display_name,
    })
    dispatchFields({
      type: 'UPDATE',
      path: `${basePath}.lat`,
      value: Number(result.lat),
    })
    dispatchFields({
      type: 'UPDATE',
      path: `${basePath}.lng`,
      value: Number(result.lon),
    })
  }

  return (
    <div className="location-picker">
      <TextInput
        description="Adresse eingeben und Enter drücken. Der erste Treffer wird übernommen, weitere Treffer erscheinen darunter."
        label="Adresse suchen"
        path={`${basePath}.geocode`}
        placeholder={address || 'Straße, PLZ Hamburg'}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={search}
      />

      {loading && (
        <FieldDescription description="Suche läuft …" path={`${basePath}.geocode`} />
      )}

      {error && <Banner type="error">{error}</Banner>}

      {results.length > 0 && (
        <div className="location-picker__results">
          {results.map((result) => (
            <Button
              buttonStyle="subtle"
              className="location-picker__result"
              key={result.place_id}
              onClick={() => select(result)}
            >
              {result.display_name}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocationPicker
