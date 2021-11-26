import React, { Component } from 'react'
// import ExMap from './ExMap.jpg'
import ExMap from '../Images/ExMap.jpg'

const imgStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundImage: './ExMap.jpg',
  marginTop: '10px'
}
const imgContainer = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

class Landing extends Component {
  render () {
    return (
      <div style={imgContainer}>
        <img className="bg" style={imgStyle}src={ExMap} alt="map" />
      </div>
    )
  }
}

export default Landing
