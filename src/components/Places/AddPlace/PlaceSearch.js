import React, { Component } from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import 'react-google-places-autocomplete/dist/assets/index.css'
import AddPlace from './AddPlace'

const style = {
  zIndex: 2,
  // position: 'absolute',
  position: 'relative',
  padding: '20px',
  marginBottom: '20px',
  marginTop: '15px',
  width: '50px'
}
const style2 = {
  zIndex: 1,
  position: 'absolute',
  margin: 15,
  padding: 15
}
const inputStyle = {
  width: '50%'
}
class PlaceSearch extends Component {
  state = {
    name: '',
    type: '',
    latitude: '',
    longitude: '',
    address: '',
    user: this.props.user,
    longName: ''
  }

  handleSelect = (location) => {
    console.log(location)
    console.log(location.types[0])
    // console.log(location.description) // long name
    console.log(location.structured_formatting.main_text)
    this.setState({ location })
    this.setState({ name: location.structured_formatting.main_text })
    this.setState({ longName: location.structured_formatting.secondary_text })

    this.setState({ type: location.types[0] })
    // this.setState({ })
    // console.log(typeof location)
    // console.log('location:', location)
    // console.log(typeof location.description)
    // console.log('place id:', location.place_id)
    // console.log(typeof location.place_id)
    geocodeByAddress(location.description)
      .then(results => getLatLng(results[0]))
      .then(LatLng => {
        this.setState({
          latitude: LatLng.lat,
          longitude: LatLng.lng
        })
        console.log(this.state.latitude) // returns the correct value
        console.log(this.state.longitude)
      })
      // .then(({ lat, lng }) =>
      //   console.log('Successfully got latitude and longitude', { lat, lng })
      // )
    // geocodeByAddress(
    //   'location' // this obviously shouldn't be a string
    // )
    //   .then(results => getLatLng(results[0]))
    //   .then(LatLng => {
    //     this.setState({
    //       latitude: LatLng.lat,
    //       longitude: LatLng.lng
    //     })
    //     console.log(this.state.latitude) // returns the correct value
    //   })
    // geocodeByAddress(location)
    //   .then(results => getLatLng(results[0]))
    //   .then(({ lat, lng }) =>
    //     console.log('Successfully got latitude and longitude', { lat, lng })
    //   )
    return (
      <p>{this.state.latitude}</p>
    )
  }

  render () {
    console.log(this.props)
    console.log(this.state)
    const { handleSubmitClose } = this.props
    return (
      <div style={{ marginTop: '15px' }}>
        <GooglePlacesAutocomplete
          style={style}
          autocompletionRequest={{
            componentRestrictions: {
              country: ['us', 'ca']
            }
          }}
          placeholder="search..."
          onSelect={this.handleSelect}
          renderInput={(props) => (
            <div className="custom-wrapper">
              <input
                style={inputStyle}
                // Custom properties
                {...props}
              />
            </div>
          )}
          renderSuggestions={(active, suggestions, onSelectSuggestion) => (
            <div className="suggestions-container" >
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
        <span>
          <AddPlace handleSubmitClose={handleSubmitClose} style={style2} user={this.state.user} name={this.state.name} longName={this.state.longName} latitude={this.state.latitude} longitude={this.state.longitude} />
        </span>
      </div>
    )
  }
}
// <AddPlace style={style2} user={this.state.user} name={this.state.name} latitude={this.state.latitude} longitude={this.state.longitude} />

export default PlaceSearch
