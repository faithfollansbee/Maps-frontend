import React from 'react'
import AddPlace from './AddPlace'
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
    user: this.props.user,
    theData: {}
  }

  handleChange = address => {
    this.setState({ address })
  };

  handleSelect = (address, description) => {
    this.setState({ address })
    this.setState({ name: address })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(LatLng => {
        this.setState({
          latitude: LatLng.lat,
          longitude: LatLng.lng
        })
        console.log(this.state.latitude) // returns the correct value
      })
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render () {
    return (
      <div className="Search2-layout">
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
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                        key={suggestion.id}
                      >
                        <span>{suggestion.description} {suggestion.location}</span>
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
      </div>
    )
  }
}
export default LocationSearchInput
