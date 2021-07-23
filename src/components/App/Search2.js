import React from 'react'
import AddPlace from './AddPlace'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
const style = {
  zIndex: 2,
  position: 'absolute',
  padding: 15,
  width: '50px'
}
const style2 = {
  zIndex: 1,
  position: 'absolute',
  margin: 15,
  padding: 15
}
class LocationSearchInput extends React.Component {
  state = {
    name: '',
    type: '',
    latitude: '',
    longitude: '',
    address: '',
    placeId: '',
    suggestion: {},
    placeObj: {},
    user: this.props.user,
    theData: {}
  }

  handleChange = (address) => {
    this.setState({ address })
  };

  handleSelect = (address, placeId, suggestion) => {
    console.log(address)
    console.log(suggestion)
    console.log(placeId)
    // this.setState({ suggestion })
    this.setState({ placeId })
    this.setState({ address })
    this.setState({ name: address })
    // geocodeByPlaceId(placeId)
    //   .then(results => console.log(results))
    geocodeByAddress(address)
      // .then(results => console.log(results[0].address_components))
      .then(results => getLatLng(results[0]))
      .then(LatLng => {
        this.setState({
          latitude: LatLng.lat,
          longitude: LatLng.lng
        })
        console.log(this.state.latitude) // returns the correct value
        console.log(this.state.theData)
      })
      .then(latLng => console.log('Success', this.latitude))
      .catch(error => console.error('Error', error))
  }

  render () {
    console.log(this.state)
    return (
      <div className="Search2-layout">
        <Card>
          <CardContent>
            <div className="row">
              <p>Search and select your desired place, then specify its category</p>
            </div>
            <div className="row">
              <PlacesAutocomplete
                style={style}
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Search for a place ...',
                        className: 'location-search-input'
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item'
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' }
                        console.log(suggestion)
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                            key={suggestion.id}
                          >
                            <span>{suggestion.description} {suggestion.location} {suggestion.formattedSuggestion.mainText}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
            <div className="row">
              <AddPlace style={style2} user={this.state.user} name={this.state.name} latitude={this.state.latitude} longitude={this.state.longitude} />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}
export default LocationSearchInput
