import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import EditCenterPlaceForm from './EditCenterPlaceForm'
import { withRouter } from 'react-router-dom'

class EditCenterPlace extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.user,
      centerPlace: {
        name: props.name,
        latitude: props.latitude,
        longitude: props.longitude
      },
      submitted: false
    }
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
      method: 'PATCH',
      url: `${apiUrl}/centerPlaces/${this.props.centerPlace._id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        centerPlace: {
          name: this.props.name,
          latitude: this.props.latitude,
          longitude: this.props.longitude
        }
      }
    })
      .then(response => {
        this.props.history.push(`/saved${this.props.centerPlace._id}`)
      })
      .then(() => this.setState({ submitted: true }))
      .then(response => {
        this.props.history.goBack()
      })
    console.log('called handleSubmit from EditCenterPlace.js')
    this.props.handleSubmitClose()
  }

  render (props) {
    // console.log(this.props)
    // console.log(this.state)
    const { centerPlace, id, name, handleSubmitClose } = this.props
    return (
      <div>
        <EditCenterPlaceForm
          user={this.props.user}
          id={id}
          centerPlace={centerPlace}
          name={name}
          handleSubmitClose={handleSubmitClose}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default withRouter(EditCenterPlace)
