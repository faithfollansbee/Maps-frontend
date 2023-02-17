import React, { Component } from 'react'
// import ExMap from './ExMap.jpg'
import ExMap from '../Images/ExMap.jpg'

// const imgStyle = {
//   position: 'fixed',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   backgroundImage: './ExMap.jpg',
//   marginTop: '10px'
// }
// const imgContainer = {
//   position: 'fixed',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)'
// }
const imgDivStyle = {
  display: 'flex',
  justifyContent: 'center'
}
const imgStyle = {
  width: '70em',
  position: 'fixed'
  // opacity: '0.9'
}
class Landing extends Component {
  render () {
    return (
      <div className="Search2-layout">
        <div style={imgDivStyle} margin="auto">
          <img src={ExMap} style={imgStyle} alt="map" />
        </div>
      </div>
    )
  }
}

export default Landing
