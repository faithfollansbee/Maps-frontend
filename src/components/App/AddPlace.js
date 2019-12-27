import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PlaceForm from './PlaceForm'
import { withRouter } from 'react-router-dom'

class AddPlace extends Component {
  state = {
    place: {
      name: '',
      type: '',
      coords: ''
    },
    submitted: false
  }

  handleChange = event => {
    this.setState({
      place: {
        ...this.state.place,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/places`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        place: this.state.place
      }
    })
      .then(response => {
        this.props.history.push(`/places/${response.data.place._id}`)
      })
      .catch(err => this.setState({ error: err.message }))
  }

  render () {
    console.log(this.state)
    return (
      <PlaceForm
        place={this.state.place}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(AddPlace)
