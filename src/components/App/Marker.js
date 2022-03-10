import React, { Component } from 'react'
// import { compose, withProps } from 'recompose'
import { Marker, InfoWindow } from 'react-google-maps'

class MarkerWithInfoWindow extends Component {
    state = {
      isOpen: false
    }
    // this.onToggleOpen = this.onToggleOpen.bind(this)

  onToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render (props) {
    return (<Marker
      position={{
        lat: props.place.latitude,
        lng: props.place.longitude
      }}
      // position={this.props.position}
      icon={{ url: 'https://img.icons8.com/color/48/000000/pizza.png' }}
      onClick={this.onToggleOpen}>
      {this.state.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
        <h3>{this.props.content}</h3>
      </InfoWindow>}
    </Marker>)
  }
}

export default MarkerWithInfoWindow
// export default GoogleApiWrapper({
//   apiKey: this.props.REACT_APP_API_KEY
// })(MarkerWithInfoWindow)
