import React from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import 'react-google-places-autocomplete/dist/assets/index.css'
import AddMap from './AddMap'

const style = {
  zIndex: 10,
  position: 'relative',
  // position: 'absolute',
  // overflow: 'hidden',
  // overflowY: 'scroll',
  padding: '20px',
  marginBottom: '20px',
  marginTop: '15px',
  width: '50px'
}
const suggestionsStyle = {
  // position: 'absolute'
  overflow: 'hidden'
  // height: 'fit-content'
}
// const style2 = {
//   zIndex: 1,
//   position: 'absolute',
//   margin: 15,
//   padding: 15
// }
class SimpleSearch extends React.Component {
  state = {
    name: '',
    type: '',
    latitude: '',
    longitude: '',
    address: '',
    user: this.props.user,
    LatLng: ''
  }

  handleSelect = (location) => {
    console.log(location)
    console.log(location.types[0])
    // console.log(location.description) // long name
    console.log(location.structured_formatting.main_text)
    this.setState({ location })
    this.setState({ name: location.structured_formatting.main_text })
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
        this.setState({ LatLng: LatLng })
        console.log(this.state.latitude)
        console.log(this.state.longitude)
        console.log('location', location)
        // commenting this out to use "simple search" component in add center place dialog
        // this.props.setMapCenter(this.state.LatLng)
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
    // this.props.setMapCenter(this.state.latitude)
    // return (
    //   <div>
    //     <p>{this.state.latitude}</p>
    //     <p>{this.state.name}</p>
    //   </div>
    // )
  }

  render () {
    console.log(this.state)
    console.log(this.props)
    // console.log(this.state.user)
    return (
      <div style={{ marginTop: '15px' }}>
        <GooglePlacesAutocomplete
          // apiKey={this.props.apiKey}
          style={style}
          autocompletionRequest={{
            componentRestrictions: {
              country: ['us', 'ca']
            }
          }}
          onSelect={this.handleSelect}
          placeholder="search..."
          renderInput={(props) => (
            <div className="custom-wrapper">
              <input
                style={{ width: '50%' }}
                // Custom properties
                {...props}
              />
            </div>
          )}
          renderSuggestions={(active, suggestions, onSelectSuggestion) => (
            <div className="suggestions" style={suggestionsStyle}>
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
        <AddMap name={this.state.name} lat={this.state.latitude} lng={this.state.longitude} handleSubmitClose={this.props.handleSubmitClose} user={this.state.user}/>
      </div>
    )
  }
}
export default SimpleSearch
