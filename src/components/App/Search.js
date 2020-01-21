import React from 'react'
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
const style = {
  padding: 10,
  margin: 10,
  overflow: 'scroll'
}
export default function Search () {
  const [address, setAddress] = React.useState('')
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  })

  const handleSelect = async value => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setAddress(value)
    setCoordinates(latLng)
  }

  return (
    <div style={style}>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>
            <input {...getInputProps({ placeholder: 'Type address' })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                  overflow: 'auto'
                }

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })} key={suggestion.id}>
                    {suggestion.description}
                    {suggestion.location}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  )
}
