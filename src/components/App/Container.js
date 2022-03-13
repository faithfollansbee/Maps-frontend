// import React, { Component } from 'react'
import React from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'
// import MarkerWithInfoWindow from './Marker'

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

class MapContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      places: [],
      centerPlaces: [],
      user: this.props.user,
      coords: this.props.mapCenter,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
      // isOpen: false
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

  // onMarkerClick = (props, marker, e) => {
  //   console.log(props)
  //   // this.setState({
  //   // selectedPlace: props,
  //   // activeMarker: marker
  //   // })
  // }
  onMarkerClick = (props, marker, e) => {
    console.log(props.title)
    console.log(props)
    console.log(marker)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  setMapCenter = (e) => {
    this.setState({
      mapCenter: ''
    })
    console.log('called setMapCenter from Container')
  }
  windowOpened = () => {
    console.log('window opened')
  }
  windowClosed = () => {
    console.log('window closed')
  }

  // onToggleOpen = () => {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   })
  // }
  displayMarkers = () => {
    return this.state.places.map((place, index) => {
      if (place.type === 'restaurant') {
        return <Marker key={index} id={index}
          title={'The marker`s title will appear as a tooltip.'}
          name={place.name}
          position={{
            lat: place.latitude,
            lng: place.longitude
          }} icon={{ url: 'https://img.icons8.com/color/48/000000/pizza.png' }}
          onClick={this.onMarkerClick}
        />
      } else if (place.type === 'entertainment') {
        return <Marker key={index} id={index} name={place.name} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/offices/30/000000/ferris-wheel.png' }}
        onClick={this.onMarkerClick} />
      } else if (place.type === 'landmark') {
        return <Marker key={index} id={index} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/offices/30/000000/monument.png' }}
        onClick={() => console.log(place.name)} />
      } else if (place.type === 'outdoors') {
        return <Marker key={index} id={index} name={place.name} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/ios-filled/25/000000/deciduous-tree.png' }}
        onClick={this.onMarkerClick}/>
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
        return <Marker
          onClick={() => console.log('You clicked me!')} />
      }
    })
  }

  render (props) {
    // const { places } = this.state
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    console.log('container state', this.state)
    console.log('container props', this.props)
    console.log('container props.currMap', this.props.currMap)
    // console.log(props)
    // props.google.maps.InfoWindow
    // .Marker
    if (this.props.mapCenter.length === 0) {
      return (
        <div className="Search2-layout">
          { this.props.mapCenter && (
            <div style={divstyle}>
              <Map
                onClick={this.onMapClicked}
                style={style}
                containerStyle={containerStyle}
                google={window.google}
                zoom={13}
                apiKey={this.props.apiKey}
                initialCenter={{
                  lat: 42.3600825,
                  lng: -71.0588801
                }}
              >
                {this.displayMarkers()}
                <Marker
                  name={'current location'} />
                <Marker
                  name={'Dolores park'}
                  position={{ lat: 37.759703, lng: -122.428093 }} />
                <Marker />
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  // marker={this.props.place}
                  onOpen={this.windowOpened}
                  onClose={this.windowClosed}
                  // visible={true}
                >{this.state.selectedPlace.name}
                </InfoWindow>
              </Map>

            </div>

          )}
        </div>
      )
    }
    // <InfoWindow
    //   marker={this.state.activeMarker}
    //   visible={this.state.showingInfoWindow}
    //   // marker={this.props.place}
    //   onOpen={this.windowOpened}
    //   onClose={this.windowClosed}
    //   // visible={true}
    // >{this.state.selectedPlace.name}
    // </InfoWindow>
    return (
      <div className="Search2-layout">
        <div style={divstyle}>
          <Map
            onClick={this.onMapClicked}
            style={style}
            google={window.google}
            zoom={13}
            containerStyle={containerStyle}
            apiKey={this.props.apiKey}
            // initialCenter={this.props.mapSettings}
            initialCenter={this.props.currMap.currCoords}
            // initialCenter={{
            //   lat: 42.8125913,
            //   lng: -70.87727509999999
            // }}
            center={this.props.mapCenter}
          >
            {this.displayMarkers()}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onOpen={this.windowOpened}
              onClose={this.windowClosed}
            >{this.state.selectedPlace.name}
            </InfoWindow>
          </Map>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer)
