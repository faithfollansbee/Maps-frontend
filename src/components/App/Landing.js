import React, { Component } from 'react'
import ExMap from './ExMap.jpg'

const imgStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  // marginTop: '-50px',
  // marginLeft: '-100px',
  transform: 'translate(-50%, -50%)',
  backgroundImage: './ExMap.jpg',
  marginTop: '10px;'
  // backgroundUrl: 'https://i.imgur.com/5B4lvRe.jpg'
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
        <img className="bg" style={imgStyle}src={ExMap} alt="baking" />
      </div>
    )
  }
}

export default Landing
