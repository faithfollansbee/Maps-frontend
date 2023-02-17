import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
// import AddMapForm from './AddMapForm'
import { withRouter } from 'react-router-dom'

class AddMap extends Component {
  state = {
    centerPlace: {
      name: this.props.name,
      latitude: this.props.lat,
      longitude: this.props.lng
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
          name: this.props.name,
          latitude: this.props.lat,
          longitude: this.props.lng
        }
      }
    })
      .then(response => {
        this.props.history.push(`/centerPlaces${response.data.centerPlace._id}`)
      })
      .then(response => {
        this.props.history.push('/saved')
      })
    console.log('submitted new map')
    this.props.handleSubmitClose()
  }
  render () {
    console.log(this.props)
    return (
      <DialogActions style={{ marginTop: '15px' }}>
        <Button onClick={this.handleSubmit} type="submit">
          Submit
        </Button>
        <Button onClick={this.props.handleSubmitClose}>Close</Button>
      </DialogActions>
    )
  }
}
// <AddMapForm
//   user={this.props.user}
//   name={this.props.name}
//   lat={this.props.lat}
//   lng={this.props.lng}
//   handleSubmitClose={this.props.handleSubmitClose}
//   handleChange={this.handleChange}
//   handleSubmit={this.handleSubmit}
// />
export default withRouter(AddMap)
