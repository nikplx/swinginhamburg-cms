'use client'

import React, { useState, type KeyboardEvent } from 'react'
import { Banner, FieldDescription, TextInput, useDocumentForm, useFormFields, useTranslation } from '@payloadcms/ui'
import { useAdminText } from './useAdminText'
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
  const t = useAdminText()
  const { i18n } = useTranslation()

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
        `https://nominatim.openstreetmap.org/search?format=json&limit=10&accept-language=${
          i18n?.language === 'en' ? 'en' : 'de'
        }&q=${encodeURIComponent(query)}`,
      )
      setResults(await response.json())
    } catch (searchError) {
      console.error('Geocoding failed', searchError)
      setError(
        t(
          'Adresssuche fehlgeschlagen. Bitte erneut versuchen.',
          'Address search failed. Please try again.',
        ),
      )
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
        description={t(
          'Adresse eingeben, Enter drücken und einen Treffer auswählen. Nur so werden die Karten-Koordinaten gesetzt.',
          'Enter an address, press Enter and pick a result. This is the only way map coordinates are set.',
        )}
        label={t('Adresse suchen', 'Search address')}
        path={`${basePath}.geocode`}
        placeholder={address || t('Straße, PLZ Hamburg', 'Street, postal code Hamburg')}
        value={query}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
        onKeyDown={search}
      />

      {loading && (
        <FieldDescription
          description={t('Suche läuft …', 'Searching …')}
          path={`${basePath}.geocode`}
        />
      )}

      {error && <Banner type="error">{error}</Banner>}

      {results.length > 0 && (
        <div className="location-picker__results">
          {results.map((result) => (
            <button
              type="button"
              className="location-picker__result"
              key={result.place_id}
              onClick={() => select(result)}
            >
              {result.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocationPicker
