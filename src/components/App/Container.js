import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

import axios from 'axios'
import apiUrl from '../../apiConfig'

const style = {
  position: 'fixed',
  border: '4px solid red',
  // top: '50%',
  // left: '50%',
  width: '800px',
  height: '550px',
  transform: 'translate(-50%, -50%)' // this is needed for some reason
  // backgroundColor: '#31464f'
  // top: '30%',
  // left: '30%',
}
const divstyle = { // this whole thing is keeping the map centered
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

class MapContainer extends Component {
  state = {
    places: []
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
    console.log(this.state.places)
    return this.state.places.map((place, index) => {
      if (place.type === 'restaurant') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/color/48/000000/pizza.png' }}
        onClick={() => console.log('You clicked me!')} />
      } else if (place.type === 'entertainment') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/offices/30/000000/ferris-wheel.png' }}
        onClick={() => console.log('You clicked me!')} />
      } else if (place.type === 'landmark') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/offices/30/000000/monument.png' }}
        onClick={() => console.log('You clicked me!')} />
      } else if (place.type === 'outdoors') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/ios-filled/25/000000/deciduous-tree.png' }}
        onClick={() => console.log('You clicked me!')} />
      } else if (place.type === 'bar') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/plasticine/50/000000/wine-glass.png' }}
        onClick={() => console.log('You clicked me!')} />
      } else if (place.type === 'museum') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/material-sharp/24/000000/museum.png' }}
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
    return (
      <div style={divstyle}>
        <Map
          style={style}
          google={window.google}
          zoom={12}
          apiKey={this.props.apiKey}
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
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer)
