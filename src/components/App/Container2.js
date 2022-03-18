import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'

import axios from 'axios'
import apiUrl from '../../apiConfig'

const style = {
  position: 'relative',
  border: '4px solid gray',
  width: '100%',
  height: '550px',
  marginTop: '10px'
}
const divstyle = {
  marginTop: '10px'
}
const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
}

class MapContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      places: [],
      centerPlaces: [],
      user: this.props.user,
      coords: this.props.mapCenter
    }
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
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker
    })
  }

  setMapCenter = (e) => {
    this.setState({
      mapCenter: ''
    })
    console.log('called setMapCenter from Container')
  }
  onMouseoverMarker = (props, marker, e) => {
    console.log('marker.name', marker.name)
    console.log('props:', props)
    return (
      <InfoWindow visible={true} open={open} marker={marker}>{marker.name}</InfoWindow>
    )
  }

  displayMarkers = () => {
    console.log(this.state.places)
    return this.state.places.map((place, index) => {
      if (place.type === 'restaurant') {
        return <Marker key={index} id={index} name={place.name} place={place} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/color/48/000000/pizza.png' }}
        onClick={() => console.log(place.name)}
        onMouseover={this.onMouseoverMarker}
        >
          <InfoWindow visible={true} open={open} marker={place}>{place.name}</InfoWindow>
        </Marker>
      } else if (place.type === 'entertainment') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/offices/30/000000/ferris-wheel.png' }}
        onClick={() => console.log(place.name)} />
      } else if (place.type === 'historical landmark') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/offices/30/000000/monument.png' }}
        onClick={() => console.log(place.name)} />
      } else if (place.type === 'outdoors') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/ios-filled/25/000000/deciduous-tree.png' }}
        onClick={() => console.log(place.name)} />
      } else if (place.type === 'bar') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/plasticine/50/000000/wine-glass.png' }}
        onClick={() => console.log(place.name)} />
      } else if (place.type === 'museum') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/material-sharp/24/000000/museum.png' }}
        onClick={() => console.log(place.name)} />
      } else if (place.type === 'home') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/color/48/000000/home.png' }}
        onClick={() => console.log(place.name)} />
      } else if (place.type === 'university') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/color/48/000000/student-center.png' }}
        onClick={() => console.log(place.name)} />
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
    console.log('container state', this.state)
    console.log('container props', this.props)
    return (
      <div className="Search2-layout">
        { this.props.mapCenter && (
          <div style={divstyle}>
            <Map
              style={style}
              containerStyle={containerStyle}
              google={window.google}
              zoom={13}
              apiKey={this.props.apiKey}
              initialCenter={this.props.currMap.currCoords}
              center={this.props.mapCenter}
            >
              {this.displayMarkers()}
              <Marker
                name={'Current location'} />
            </Map>

          </div>

        )}
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer)
