import React from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import { google } from 'google-maps'
// import AddPlace from './AddPlace'
import PlaceForm from './PlaceForm'
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class LocationSearchInput extends React.Component {
  constructor (props) {
    super(props)
    this.user = props.user
    this.state = this.initialState()
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.autocomplete = null
  }

  handleSubmit () {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/places`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        place: {
          name: this.state.name,
          type: this.state.type,
          latitude: this.state.latitude,
          longitude: this.state.longitude
        }
      }
    })
      .then(response => {
        this.props.history.push(`/places/${response.data.place._id}`)
      })
      .catch(err => this.setState({ error: err.message }))
  }

  // componentDidMount () {
  //   this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
  //   this.autocomplete.addListner('place_changed', this.handlePlaceSelect)
  // }

  initialState () {
    return {
      name: '',
      type: '',
      latitude: '',
      longitude: '',
      googleMapLink: ''
    }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  // handleSubmit (event) {
  //   event.preventDefault()
  //   this.addPlace(this.state)
  // }

  handlePlaceSelect () {
    const addressObject = this.autocomplete.getPlace()
    const address = addressObject.address_components
    this.setState({
      name: addressObject.name,
      type: `${address[0].long_name} ${address[1].long_name}`,
      lat: `${address[6].short_name}`,
      lng: `${address[8].short_name}`
    })
  }

  render () {
    console.log(this.state)
    return (
      <div>
        <PlaceForm
          name={this.state.name}
          type={this.state.type}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <h1> add new place to map</h1>
      </div>
    )
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBOXkzxWxurGgpeo_KsLSs4LczoSS0InN8'
})(LocationSearchInput)

//
// <form onSubmit={this.handleSubmit}>
//   <input id="autocomplete" className="input-field" type="text"
//   />
//   <input name={'name'}
//     value={this.state.name}
//     placeholder={'name'}
//     onChange={this.handleChange}
//   />
//   <input name={'latitude'}
//     value={this.state.latitude}
//     placeholder={'latitude'}
//     onChange={this.handleChange}
//   />
//   <input name={'longitude'}
//     value={this.state.longitude}
//     placeholder={'longitude'}
//     onChange={this.handleChange}
//   />
//   <input name={'type'}
//     value={this.state.type}
//     placeholder={'type'}
//     onChange={this.handleChange}
//   />
//   <button onSubmit={this.handleSubmit}>submit</button>
// </form>
