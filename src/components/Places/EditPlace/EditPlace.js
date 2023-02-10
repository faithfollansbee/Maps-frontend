import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import EditPlaceForm from './EditPlaceForm'
import { withRouter } from 'react-router-dom'
import placeTypes from '../../App/PlaceTypes'

class EditPlace extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.user,
      place: {
        name: props.name,
        latitude: props.latitude,
        longitude: props.longitude,
        type: props.type
      },
      submitted: false,
      placeTypes: placeTypes

    }
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
      method: 'PATCH',
      url: `${apiUrl}/places/${this.props.place._id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        place: {
          name: this.props.name,
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          type: this.state.type
        }
      }
    })
      // .then(response => {
      //   this.props.history.push(`/places${this.props.place._id}`)
      // })
      // .then(() => this.setState({ submitted: true }))
      .then(response => {
        this.props.history.goBack()
      })
      // .then(() => this.props.history.push('/places'))
    this.props.handleSubmitClose()
  }

  render (props) {
    // console.log(this.props)
    // console.log(this.state)
    const { place, id, type, name, handleSubmitClose } = this.props

    return (
      <div>
        <EditPlaceForm
          user={this.props.user}
          id={id}
          place={place}
          type={type}
          name={name}
          handleSubmitClose={handleSubmitClose}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default withRouter(EditPlace)
