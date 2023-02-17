import React from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'
import axios from 'axios'
import apiUrl from '../../../apiConfig'

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

// const tooltipStyle = {
//   backgroundColor: '#f5f5f9',
//   color: 'rgba(0, 0, 0, 0.87)',
//   maxWidth: '220',
//   fontSize: '24px',
//   border: '1px solid #dadde9'
// }

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
  }
  windowOpened = () => {
    // console.log('window opened')
  }
  windowClosed = () => {
    // console.log('window closed')
  }

  displayMarkers = () => {
    return this.state.places.map((place, index) => {
      if (place.type === 'restaurant') {
        return <Marker key={index} id={index}
          title={place.name}
          name={place.name}
          markerImage={place.emoji}
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
        return <Marker key={index} id={index} name={place.name} position={{
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
        return <Marker key={index} id={index} name={place.name} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: '/bar.ico' }}
        onClick={() => console.log(place.name)} />
      } else if (place.type === 'museum') {
        return <Marker key={index} id={index} name={place.name} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/material-sharp/24/000000/museum.png' }}
        onClick={() => console.log(place.name)} />
      } else if (place.type === 'home') {
        return <Marker key={index} id={index} name={place.name} position={{
          lat: place.latitude,
          lng: place.longitude
        }} icon={{ url: 'https://img.icons8.com/color/48/000000/home.png' }}
        onClick={() => console.log(place.name)} />
      } else if (place.type === 'university') {
        return <Marker key={index} id={index} name={place.name} position={{
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
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
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
            initialCenter={this.props.currMap.currCoords}
            center={this.props.mapCenter}
          >
            {this.displayMarkers()}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onOpen={this.windowOpened}
              onClose={this.windowClosed}
            >
              <div>
                {this.state.selectedPlace.name}
              </div>
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
