import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import LocationSearchInput from './SearchClass'
// import GoogleMapReact from 'google-map-react'
const style = {
  width: '80%',
  height: '70%',
  margin: 15,
  padding: 15,
  flexDirection: 'column',
  position: 'absolute',
  backgroundColor: '#31464f'
}
//
// const otherStyle = {
//   display: 'flex'
// }
export class MapContainer extends Component {
  state = {
    places: []
    // places: [{
    //   latitude: 42.3601,
    //   longitude: -71.0589,
    //   iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    //   content: '<h1>Lynn MA</h1>'
    // },
    // {
    //   latitude: 42.8015,
    //   longitude: -70.9898,
    //   content: '<h1>Boston MA</h1>'
    // }
    // ]
  }
  async componentDidMount () {
    try {
      const response = await axios({
        url: `${apiUrl}/places`,
        method: 'GET',
        headers: {
          Authorization: `Token token=${this.props.user.token}`
        }
      })
      this.setState({ places: response.data.places, isLoading: false })
    } catch (error) {
    }
  }

    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker
      })

  displayMarkers = () => {
    return this.state.places.map((place, index) => {
      if (place.type === 'food') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' }}
        onClick={() => console.log('You clicked me!')} />
      } else if (place.type === 'entertainment') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' }}
        onClick={() => console.log('You clicked me!')} />
      } else if (place.type === 'historic') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' }}
        onClick={() => console.log('You clicked me!')} />
      } else if (place.type === 'outdoors') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' }}
        onClick={() => console.log('You clicked me!')} />
      } else {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }}
        onClick={() => console.log('You clicked me!')} />
      }
    })
  }
  render () {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    // const style = {
    //   width: '100vw',
    //   height: '100vh'
    // }

    return (
      <Map
        style={style}
        google={window.google}
        zoom={12}
        initialCenter={{
          lat: 42.3601,
          lng: -71.0589
        }}
      >
        {this.displayMarkers()}
        <Marker onClick={this.onMarkerClick}
          name={'Current location'} />
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{ lat: 37.778519, lng: -122.405640 }} />
        <Marker
          name={'Dolores park'}
          position={{ lat: 37.759703, lng: -122.428093 }} />
        <Marker />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBOXkzxWxurGgpeo_KsLSs4LczoSS0InN8'
})(MapContainer)

// <InfoWindow onClose={this.onInfoWindowClose}>
//   <div>
//     <h1>{this.state.selectedPlace.name}</h1>
//   </div>
// </InfoWindow>
