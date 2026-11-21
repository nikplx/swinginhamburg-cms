'use client'

import React, { useState, type KeyboardEvent } from 'react'
import { Banner, FieldDescription, TextInput, useDocumentForm, useFormFields, useTranslation } from '@payloadcms/ui'
import {
  partsFromNominatim,
  venueNameFromNominatim,
  type NominatimResult,
} from '@/lib/location'
import { useAdminText } from './useAdminText'
import './LocationPicker.scss'

type Props = {
  path: string
}

/**
 * Small geocoder helper rendered inside the location group. It writes the
 * address parts, coordinates and (if empty) the venue name into the sibling
 * fields via form state, so it works for both `events.location` and
 * `organizations.defaultLocation`. The one-line `address` is derived on save.
 */
export const LocationPicker: React.FC<Props> = ({ path }) => {
  const basePath = path.replace(/\.?geocode$/, '')
  const { dispatchFields } = useDocumentForm()
  const t = useAdminText()
  const { i18n } = useTranslation()

  const address = useFormFields(
    ([fields]) => (fields?.[`${basePath}.address`]?.value as string) ?? '',
  )
  const venueName = useFormFields(
    ([fields]) => (fields?.[`${basePath}.name`]?.value as string) ?? '',
  )
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<NominatimResult[]>([])
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
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=10&accept-language=${
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

  const select = (result: NominatimResult) => {
    setResults([])
    setQuery(result.display_name)
    const update = (field: string, value: unknown) =>
      dispatchFields({ type: 'UPDATE', path: `${basePath}.${field}`, value })

    for (const [field, value] of Object.entries(partsFromNominatim(result))) {
      update(field, value)
    }
    update('lat', Number(result.lat))
    update('lng', Number(result.lon))

    // Suggest the venue name, but never overwrite one the editor entered.
    const suggestedName = venueNameFromNominatim(result)
    if (suggestedName && !venueName.trim()) update('name', suggestedName)
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
              key={`${result.lat},${result.lon},${result.display_name}`}
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
