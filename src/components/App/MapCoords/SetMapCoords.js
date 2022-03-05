import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
// import { changeCoords } from '../../api/auth'
// import messages from '../../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SetMapCoords extends Component {
  constructor () {
    super()

    this.state = {
      // oldMapCoords: '',
      newMapCoords: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = event => {
    event.preventDefault()
    // changeCoords(this.state, user)
    //   .then(() => alert({
    //     heading: 'Change Coords Success',
    //     message: messages.changeCoordsSuccess,
    //     variant: 'success'
    //   }))
    //   .then(() => history.push('/'))
    //   .catch(error => {
    //     console.error(error)
    //     this.setState({ oldMapCoords: '', newMapCoords: '' })
    //     alert({
    //       heading: 'Change Coords Failed',
    //       message: messages.changeCoordsFailure,
    //       variant: 'danger'
    //     })
    //   })

    axios({
      method: 'POST',
      url: `${apiUrl}/change-coords`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        mapSettings: {
          // coords: this.state.coords,
          lat: this.state.lat,
          lng: this.state.lng
        }
      }
    })
      .then(response => {
        console.log('set new map settings', this.user.mapSettings)
        // this.props.history.push(`/genres${response.data.Genre._id}`)
      })
      .then(() => history.push('/map'))

      .then(() => alert({
        heading: 'Change Coords Success',
        // message: messages.changeCoordsSuccess,
        variant: 'success'
      }))
      // .then(response => {
      //   this.props.history.push('/genres')
      // })
    // this.props.handleSubmitClose()
      .catch(err => this.setState({ error: err.message }))
      .catch(error => {
        console.error(error)
        // this.setState({ oldMapCoords: '', newMapCoords: '' })
        alert({
          heading: 'Change Coords Failed',
          // message: messages.changeCoordsFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // const { mapCenter } = this.state
    console.log(this.state)
    console.log(this.props)
    console.log(this.props.mapCenter.lat)
    return (
      <div className="Search2-layout">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Change Map Coords</h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="lat">
              <Form.Label>Lat</Form.Label>
              <Form.Control
                required
                name="lat"
                value={this.props.mapCenter.lat}
                type="lat"
                placeholder="Lat"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lng">
              <Form.Label>Lng</Form.Label>
              <Form.Control
                required
                name="lng"
                value={this.props.mapCenter.lng}
                type="lng"
                placeholder="Lng"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="dark"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(SetMapCoords)
