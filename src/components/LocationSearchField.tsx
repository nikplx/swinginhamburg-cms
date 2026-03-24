'use client';

import React, { useState, KeyboardEvent } from 'react';
// Import useForm to access sibling fields
import { useField, useForm } from '@payloadcms/ui'; 

export const LocationSearchField: React.FC<{ path: string }> = ({ path }) => {
  // Manage the point field (location)
  const { value: locationValue, setValue: setLocationValue } = useField<[number, number]>({ path });
  
  // Access the overall form to dispatch updates to the 'address' field
  const { dispatchFields } = useForm();

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Trigger search ONLY when Enter is pressed
  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Crucial: Prevent the Enter key from submitting the entire Payload document
      e.preventDefault(); 
      
      if (searchQuery.length > 3) {
        setIsSearching(true);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
          const data = await res.json();
          setResults(data);
        } catch (error) {
          console.error("Geocoding failed", error);
        } finally {
          setIsSearching(false);
        }
      }
    }
  };

  const handleSelect = (lat: string, lon: string, displayName: string) => {
    // Update local UI state
    setSearchQuery(displayName);
    setResults([]);
    
    // 1. Update the 'location' point field [longitude, latitude]
    setLocationValue([parseFloat(lon), parseFloat(lat)]);
    
    // 2. Update the sibling 'address' text field invisibly
    dispatchFields({
      type: 'UPDATE',
      path: 'address', // This must match the exact name of your address field in the config
      value: displayName,
    });
  };

  return (
    <div className="custom-location-field" style={{ marginBottom: '1rem' }}>
      <label className="field-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Search Location (Press Enter)
      </label>
      
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        onKeyDown={handleKeyDown}
        placeholder="Type an address and press Enter..."
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />

      {isSearching && <div style={{ fontSize: '12px', marginTop: '4px' }}>Searching...</div>}

      {results.length > 0 && (
        <ul style={{ border: '1px solid #ccc', listStyle: 'none', padding: 0, marginTop: '4px', maxHeight: '200px', overflowY: 'auto' }}>
          {results.map((result) => (
            <li 
              key={result.place_id} 
              onClick={() => handleSelect(result.lat, result.lon, result.display_name)}
              style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '14px' }}
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}

      {locationValue && (
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
          Active Coordinates: [{locationValue[0]}, {locationValue[1]}]
        </div>
      )}
    </div>
  );
};

export default LocationSearchField;