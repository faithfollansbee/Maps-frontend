import React, { Component } from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

import 'react-google-places-autocomplete/dist/assets/index.css'
import AddPlace from './AddPlace'

class BestSearch extends Component {
  state = {
    name: '',
    type: '',
    latitude: '',
    longitude: '',
    address: '',
    user: this.props.user

  }

  handleSelect = (location) => {
    console.log(location.types[0])
    console.log(location.description)
    console.log(location.structured_formatting.main_text)
    this.setState({ location })
    this.setState({ name: location.structured_formatting.main_text })
    this.setState({ type: location.types[0] })
    geocodeByAddress(
      'location'
    )
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          latitude: latLng.lat,
          longitude: latLng.lng
        })
        console.log(this.state.latitude) // returns the correct value
      })
    return (
      <p>{this.state.latitude}</p>
    )
  }

  render () {
    console.log(this.state.user)
    return (
      <div>
        <GooglePlacesAutocomplete
          autocompletionRequest={{
            componentRestrictions: {
              country: ['us', 'ca']
            }
          }}
          onSelect={this.handleSelect}
          renderInput={(props) => (
            <div className="custom-wrapper">
              <input
              // Custom properties
                {...props}
              />
            </div>
          )}
          renderSuggestions={(active, suggestions, onSelectSuggestion) => (
            <div className="suggestions-container">
              {
                suggestions.map((suggestion) => (
                  <div
                    className="suggestion"
                    onClick={(event) => onSelectSuggestion(suggestion, event)} key={suggestion.id}
                  >
                    {suggestion.description}
                    {suggestion.location}
                  </div>
                ))
              }
            </div>
          )}
        />
        <AddPlace user={this.state.user} type={this.state.type} name={this.state.name} latitude={this.state.latitude} longitude={this.state.longitude} />
      </div>
    )
  }
}
export default BestSearch
