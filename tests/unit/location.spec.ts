import { describe, expect, it } from 'vitest'
import {
  formatAddress,
  partsFromNominatim,
  venueNameFromNominatim,
  type NominatimResult,
} from '@/lib/location'

// Shapes taken from real Nominatim responses for Hamburg venues.
const haus73: NominatimResult = {
  display_name: 'Haus 73, 73, Schulterblatt, Sternschanze, Altona, Hamburg, 20357, Deutschland',
  lat: '53.5626',
  lon: '9.9637',
  name: 'Haus 73',
  address: {
    amenity: 'Haus 73',
    house_number: '73',
    road: 'Schulterblatt',
    suburb: 'Sternschanze',
    city_district: 'Altona',
    city: 'Hamburg',
    postcode: '20357',
    country: 'Deutschland',
  },
}

const wiesendamm: NominatimResult = {
  display_name: 'Wiesendamm, Barmbek-Nord, Hamburg-Nord, Hamburg, 22305, Deutschland',
  lat: '53.586',
  lon: '10.03',
  name: 'Wiesendamm',
  address: {
    road: 'Wiesendamm',
    suburb: 'Barmbek-Nord',
    city_district: 'Hamburg-Nord',
    city: 'Hamburg',
    postcode: '22305',
  },
}

describe('partsFromNominatim', () => {
  it('maps a venue with house number', () => {
    expect(partsFromNominatim(haus73)).toEqual({
      street: 'Schulterblatt',
      houseNumber: '73',
      postcode: '20357',
      district: 'Sternschanze',
      city: 'Hamburg',
    })
  })

  it('handles addresses without a house number', () => {
    expect(partsFromNominatim(wiesendamm)).toMatchObject({
      street: 'Wiesendamm',
      houseNumber: null,
      district: 'Barmbek-Nord',
    })
  })

  it('falls back for towns and missing details', () => {
    expect(
      partsFromNominatim({
        display_name: 'x',
        lat: '0',
        lon: '0',
        address: { pedestrian: 'Marktplatz', town: 'Pinneberg', city_district: 'Mitte' },
      }),
    ).toMatchObject({ street: 'Marktplatz', city: 'Pinneberg', district: 'Mitte' })
    expect(partsFromNominatim({ display_name: 'x', lat: '0', lon: '0' })).toEqual({
      street: null,
      houseNumber: null,
      postcode: null,
      district: null,
      city: null,
    })
  })
})

describe('venueNameFromNominatim', () => {
  it('suggests real venue names but not plain street names', () => {
    expect(venueNameFromNominatim(haus73)).toBe('Haus 73')
    expect(venueNameFromNominatim(wiesendamm)).toBeNull()
  })
})

describe('formatAddress', () => {
  it('formats street, number, postcode and city', () => {
    expect(formatAddress(partsFromNominatim(haus73))).toBe('Schulterblatt 73, 20357 Hamburg')
    expect(formatAddress(partsFromNominatim(wiesendamm))).toBe('Wiesendamm, 22305 Hamburg')
    expect(formatAddress({})).toBe('')
  })
})
