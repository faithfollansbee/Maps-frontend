import React from 'react'
import GoogleMapReact from 'google-map-react'
import MarkerWithInfoWindow from './MarkerWithInfoWindow'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// const markerStyle = {
//   color: 'white',
//   background: 'grey',
//   padding: '15px 10px',
//   display: 'inline-flex',
//   textAlign: 'center',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: '100%',
//   transform: 'translate(-50%, -50%)'
// }
// style={{ position: 'absolute', transform: 'translate(-50%, -50%)', height: '300px', width: '300px', zIndex: '5' }}
// const AnyReactComponent = ({ text }) => <div style={markerStyle} >{text}🍕</div>

class SimpleMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      places: [],
      centerPlaces: [],
      user: this.props.user,
      coords: this.props.mapCenter,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      loaded: false
      // isOpen: false
    }
  }
  // static defaultProps = {
  //   center: {
  //     // lat: 59.95,
  //     // lng: 30.33
  //     lat: 42.3600825,
  //     lng: -71.0588801
  //   },
  //   zoom: 11
  // }

  async componentDidMount () {
    try {
      const response = await axios({
        url: `${apiUrl}/places`,
        method: 'GET',
        headers: {
          Authorization: `Token token=${this.props.user.token}`
        }
      })
      this.setState({ places: response.data.places, isLoading: false, loaded: true })
    } catch (error) {
    }
  }
  displayMarkers = () => {
    this.state.places.map((place) => (
      <MarkerWithInfoWindow
        key={place.id}
        text={place.name}
        name={place.name}
        place={place}
        lat={place.latitude}
        lng={place.longitude}
      />
    ))
  }
  // {this.state.places.map((place) => (
  //   <MarkerWithInfoWindow
  //     key={place.id}
  //     text={place.name}
  //     name={place.name}
  //     place={place}
  //     lat={place.latitude}
  //     lng={place.longitude}
  //   />
  // ))}
  render () {
    console.log(this.props)
    console.log(this.state.places)
    // const { places } = this.state
    // if (this.state)
    // if (!this.props.loaded) {
    //   return <div>Loading...</div>
    // }
    if (this.props.mapCenter.length === 0) {
      return (
        <div className="Search2-layout">
          { this.state.loaded && (
            <div style={{ height: '100vh', width: '100%', position: 'relative', marginTop: '10px' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
                // defaultCenter={this.props.center}
                defaultCenter={{ lat: 42.3600825, lng: -71.0588801 }}
                // center={this.props.currMap.currCoords}
                // defaultZoom={this.props.zoom}
                defaultZoom={13}
                onGoogleApiLoaded={({ map, maps }) => console.log(map, maps)}
              >
                {this.state.places.map((place) => (
                  <MarkerWithInfoWindow
                    key={place._id}
                    text={place.name}
                    name={place.name}
                    type={place.type}
                    place={place}
                    lat={place.latitude}
                    lng={place.longitude}
                  />
                ))}
              </GoogleMapReact>
            </div>
          )}
        </div>
      )
    }
    return (
      <div className="Search2-layout">
        { this.state.loaded && (
          <div style={{ height: '100vh', width: '100%', position: 'relative', marginTop: '10px' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
              // defaultCenter={this.props.center}
              defaultCenter={{ lat: 42.3600825, lng: -71.0588801 }}
              // defaultZoom={this.props.zoom}
              defaultZoom={13}
              // hoverDistance={50}
              // initialCenter={this.props.currMap.currCoords}
              center={this.props.mapCenterArr}
              onGoogleApiLoaded={({ map, maps }) => console.log(map, maps)}
            >
              {this.state.places.map((place) => (
                <MarkerWithInfoWindow
                  key={place.id}
                  text={place.name}
                  name={place.name}
                  type={place.type}
                  place={place}
                  lat={place.latitude}
                  lng={place.longitude}
                />
              ))}
            </GoogleMapReact>
          </div>
        )}
      </div>
    )
    // return (
    //   <div>
    //     {places && (
    //       <div style={{ height: '100vh', width: '100%', position: 'absolute' }}>
    //         <GoogleMapReact
    //           bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
    //           defaultCenter={this.props.center}
    //           defaultZoom={this.props.zoom}
    //         >
    //           {this.state.places.map((place) => (
    //             <MarkerWithInfoWindow
    //               key={place.id}
    //               text={place.name}
    //               name={place.name}
    //               place={place}
    //               lat={place.latitude}
    //               lng={place.longitude}
    //             />
    //           ))}
    //         </GoogleMapReact>
    //       </div>
    //     )}
    //   </div>
    // )
  }
}
// <AnyReactComponent
//   // lat={59.955413}
//   // lng={30.337844}
//   text="My Marker"
//   lat={place.latitude}
//   // lat={ 42.363739 }
//   lng={place.longitude}
//   position={{ lat: place.latitude, lng: place.longitude }}
//   // lng={71.05369999999999}
// />
export default SimpleMap
