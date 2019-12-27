import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
// import GoogleMapReact from 'google-map-react'
const style = {
  width: '100%',
  height: '100%'
}
export class MapContainer extends Component {
  state = {
    places: [{
      latitude: 42.3601,
      longitude: -71.0589,
      iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      content: '<h1>Lynn MA</h1>'
    },
    {
      latitude: 42.8015,
      longitude: -70.9898,
      content: '<h1>Boston MA</h1>'
    }
    ]
  }

    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker
      })

  displayMarkers = () => {
    return this.state.places.map((place, index) => {
      return <Marker key={index} id={index} position={{
        lat: place.latitude,
        lng: place.longitude
      }}
      onClick={() => console.log('You clicked me!')} />
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
        google={window.google}
        zoom={14}
        style={style}
        initialCenter={{
          lat: 40.854885,
          lng: -88.081807
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
        <Marker
          google={window.google}
          name={'Your position'}
          position={{ lat: 37.762391, lng: -122.439192 }}
          icon={{
            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
            // anchor: new google.maps.Point(32, 32),
            // scaledSize: new google.maps.Size(64, 64)
          }} />
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
