import React, { Component } from 'react'
import Landing from './Landing'

class Background extends Component {
  super (props) {
  }

  render () {
    const isLoggedIn = this.props.user
    return (
      <div>
        {isLoggedIn ? '' : <Landing /> }
      </div>
    )
  }
}
export default Background
