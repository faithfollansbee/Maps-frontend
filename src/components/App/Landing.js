import React, { Component } from 'react'
import ExMap from './ExMap.jpg'

const imgStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  // marginTop: '-50px',
  // marginLeft: '-100px',
  transform: 'translate(-50%, -50%)',
  // width: '70%',
  // height: '60%',
  // margin: 15,
  // padding: 15,
  // position: 'absolute',
  // width: '70%',
  // height: '50%',
  // zIndex: 0,
  // // margin: 15,
  // // padding: 15,
  // marginTop: '10%',
  // marginLeft: '20%',
  // marginRight: '20%',
  // alignItems: 'center',
  // justifyContent: 'center',
  // position: 'relative',
  backgroundImage: './ExMap.jpg'
  // backgroundUrl: 'https://i.imgur.com/5B4lvRe.jpg'
}

class Landing extends Component {
  render () {
    return (
      <img className="bg" style={imgStyle}src={ExMap} alt="baking" />
    )
  }
}

export default Landing
