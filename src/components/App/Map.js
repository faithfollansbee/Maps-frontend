// import React, { Component } from 'react'
// // import ReactDOM from 'react-dom'
// // import GoogleMapReact from 'google-map-react'
// import { Map, GoogleApiWrapper } from 'google-maps-react'
//
// // import MapView from './MapView'
// // const MapView = ({ text }) => <div>{text}</div>
//
// class MapView extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 14
//   }
//
//   loadMap () {
//     if (this.props && this.props.google) {
//       // google is available
//       const { google } = this.props
//       const maps = google.maps
//       // const mapRef = this.refs.map
//       const node = this.map.current
//       // const node = this.map
//       this.map = React.createRef()
//       const zoom = 14
//       const lat = 37.774929
//       const lng = -122.419416
//       const center = new maps.LatLng(lat, lng)
//       const mapConfig = Object.assign({}, {
//         center: center,
//         zoom: zoom
//       })
//       this.map = new maps.Map(node, mapConfig)
//     }
//   }
//
//   componentDidUpdate (prevProps, prevState) {
//     if (prevProps.google !== this.props.google) {
//       this.loadMap()
//     }
//   }
//
//   componentDidMount () {
//     this.loadMap()
//   }
//
//   render () {
//     return (
//       <div style={{ height: '100%', width: '100%' }}>
//         <Map
//           google={this.props.google}
//           zoom={8}
//           initialCenter={{ lat: 47.444, lng: -122.176 }}
//         />
//         <MapView
//           lat={59.955413}
//           lng={30.337844}
//           text="My Marker"
//         />
//       </div>
//     )
//   }
// }
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyBOXkzxWxurGgpeo_KsLSs4LczoSS0InN8'
// })(MapView)
// // <GoogleMapReact
// //   bootstrapURLKeys={{ key: 'AIzaSyBOXkzxWxurGgpeo_KsLSs4LczoSS0InN8' }}
// //   defaultCenter={this.props.center}
// //   defaultZoom={this.props.zoom}
// // >
// //   </GoogleMapReact>
