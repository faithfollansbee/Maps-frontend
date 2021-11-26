import React from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import 'react-google-places-autocomplete/dist/assets/index.css'

const style = {
  zIndex: 2,
  position: 'absolute',
  padding: 15,
  width: '50px'
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
        console.log(this.state.latitude) // returns the correct value
        console.log(this.state.longitude)
        // console.log(location)
        console.log(LatLng)
        // this.props.setMapCenter(this.state.latitude, this.state.longitude)
        this.props.setMapCenter(this.state.LatLng)
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
    return (
      <p>{this.state.latitude}</p>
    )
  }

  render () {
    console.log(this.state.user)
    return (
      <div className="Search2-layout">
        <Card>
          <CardContent>
            <GooglePlacesAutocomplete
              style={style}
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
          </CardContent>
        </Card>
        <button onClick={() => this.props.setMapCenter(this.state.LatLng)}>set map center</button>
      </div>
    )
  }
}
export default SimpleSearch
