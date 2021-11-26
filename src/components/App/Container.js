import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
// import SimpleSearch from './SimpleSearch'

import axios from 'axios'
import apiUrl from '../../apiConfig'

const style = {
  position: 'fixed',
  border: '4px solid black',
  width: '800px',
  height: '550px',
  transform: 'translate(-50%, -50%)' // this is needed for some reason
  // backgroundColor: '#31464f'
}
const divstyle = { // this whole thing is keeping the map centered
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

class MapContainer extends Component {
  state = {
    places: [],
    mapCenter: this.props.mapCenter,
    defaultCoords: { lat: 42.8125913, lng: -70.87727509999999 }
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
      console.log(this.props.mapCenter)
      console.log(this.state.defaultCoords)
      console.log(this.defaultCoords)
    } catch (error) {
    }
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker
    })

  setMapCenter = (e) => {
    this.setState({
      mapCenter: ''
    })
  }

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
      } else if (place.type === 'historical landmark') {
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
      } else if (place.type === 'home') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/color/48/000000/home.png' }}
        onClick={() => console.log('You clicked me!')} />
      } else if (place.type === 'university') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/color/48/000000/student-center.png' }}
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
  // <img src="https://img.icons8.com/color/48/000000/student-center.png"/>
  render () {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div style={divstyle}>
        <Map
          style={style}
          google={window.google}
          // zoom={13}
          zoom={13}
          apiKey={this.props.apiKey}
          // initialCenter={this.state.mapCenter}
          // initialCenter={this.state.mapCenter}
          // defaultCenter={this.state.defaultCoords}
          // initialCenter={ this.props.mapCenter ? this.props.mapCenter : this.props.defaultCoords }
          initialCenter={{
            lat: 42.8125913,
            lng: -70.87727509999999
          }}
          // center={this.props.mapCenter}
          // boston MA coords: 42.3601, -71.0589
          // newburport MA coords: 42.8125913, -70.87727509999999
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
