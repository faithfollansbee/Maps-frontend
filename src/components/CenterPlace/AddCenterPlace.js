import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import CenterPlaceForm from './CenterPlaceForm'
// import GenreDialogForm from './GenreDialogForm'
import { withRouter } from 'react-router-dom'

class AddCenterPlace extends Component {
  state = {
    centerPlace: {
      name: '',
      latitude: '',
      longitude: ''
    },
    // user: this.props.user,
    submitted: false
  }

  handleChange = event => {
    this.setState({
      centerPlace: {
        ...this.state.centerPlace,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/centerPlaces`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        centerPlace: {
          name: this.state.centerPlace.name,
          latitude: this.state.centerPlace.latitude,
          longitude: this.state.centerPlace.longitude
        }
      }
    })
      .then(response => {
        this.props.history.push(`/centerPlaces${response.data.centerPlace._id}`)
      })
      .then(response => {
        this.props.history.push('/centerPlaces')
      })
    this.props.handleSubmitClose()
  }
  render () {
    return (
      <CenterPlaceForm
        user={this.user}
        // genre={this.state.genre}
        handleSubmitClose={this.props.handleSubmitClose}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(AddCenterPlace)
