import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// import PlaceForm from './PlaceForm'
import { withRouter } from 'react-router-dom'
// import TypeForm from './TypeForm'
// import BestSearch from './bestsearch'

// const style = {
//   width: '50%',
//   // paddingLeft: ,
//   justifyContent: 'space-between',
//   alignItems: 'baseline',
//   position: 'fixed'
// }

class AddPlace extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      user: props.user,
      // latitude: props.latitude,
      // longitude: props.longitude,
      // name: props.name,
      place: {
        name: props.name,
        latitude: props.latitude,
        longitude: props.longitude,
        type: ''
      }
    }
    console.log(this.props.user)
  }

  handleChange = event => {
    this.setState({
      place: {
        ...this.state.place,
        [event.target.name]: event.target.value
      }
    })
    console.log(this.state)
  }
  // const handleClick = () => {
  //     event.preventDefault()
  //     axios({
  //       method: 'POST',
  //       url: `${apiUrl}/movies`,
  //       headers: {
  //         Authorization: `Token token=${props.user.token}`
  //       },
  //       data: {
  //         movie: {
  //           title: props.title,
  //           description: props.description,
  //           released: props.released,
  //           image: props.image
  //         }
  //       }
  //     })
  //   //  <Redirect to="/movies"/>
  //   }
  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/places`,
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
      .then(response => {
        this.props.history.push(`/places/${response.data.place._id}`)
      })
      .catch(err => this.setState({ error: err.message }))
  }
  handleOptionChange = changeEvent => {
    this.setState({
      type: changeEvent.target.value
    })
  }

  render () {
    console.log(this.state.place)
    return (
      <div className="Search2-layout">
        <Form onSubmit={this.handleSubmit}>
          <div className="col">
            <Form.Group controlId="formBasicCheckbox">
              <ul>
                <li>
                  <label>
                    <input
                      name="type"
                      type="radio"
                      value="restaurant"
                      ref={this.input}
                      checked={this.state.type === 'restaurant'}
                      onChange={this.handleOptionChange}
                    /> Restaurant</label>
                </li>
                <li>
                  <label>
                    <input
                      name="type"
                      type="radio"
                      value="entertainment"
                      checked={this.state.type === 'entertainment'}
                      ref={this.input}
                      onChange={this.handleOptionChange}
                    /> Entertainment</label>
                </li>
                <li>
                  <label>
                    <input
                      name="type"
                      type="radio"
                      value="landmark"
                      ref={this.input}
                      onChange={this.handleOptionChange}
                      checked={this.state.type === 'landmark'}
                    /> Landmark</label>
                </li>
                <li>
                  <label>
                    <input
                      name="type"
                      type="radio"
                      value="bar"
                      ref={this.input}
                      checked={this.state.type === 'bar'}
                      onChange={this.handleOptionChange}
                    /> Bar</label>
                </li>
                <li>
                  <label>
                    <input
                      name="type"
                      type="radio"
                      value="outdoors"
                      ref={this.input}
                      checked={this.state.type === 'outdoors'}
                      onChange={this.handleOptionChange}
                    /> Outdoors</label>
                </li>
                <li>
                  <label>
                    <input
                      name="type"
                      type="radio"
                      value="museum"
                      ref={this.input}
                      checked={this.state.type === 'museum'}
                      onChange={this.handleOptionChange}
                    /> Museum</label>
                </li>
              </ul>
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group controlId="name">
              <Form.Label></Form.Label>
              <Form.Control
                plaintext readOnly
                type="text"
                placeholder=""
                value={this.props.name}
                onChange={this.handleChange}
                name="name"
                required
              />
            </Form.Group>

            <Form.Group controlId="latitude">
              <Form.Label></Form.Label>
              <Form.Control
                plaintext readOnly
                type="text"
                placeholder=""
                value={this.props.latitude}
                onChange={this.handleChange}
                name="latitude"
                required
              />
            </Form.Group>
            <Form.Group controlId="longitude">
              <Form.Label></Form.Label>
              <Form.Control
                plaintext readOnly
                placeholder=""
                value={this.props.longitude}
                onChange={this.handleChange}
                name="longitude"
                required
              />
            </Form.Group>
          </div>
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
// <div className="row" style={style}>
//   <TypeForm
//     latitude={this.props.latitude}
//     longitude={this.props.longitude}
//     name={this.props.name}
//     type={this.props.type}
//     handleChange={this.handleChange}
//     handleSubmit={this.handleSubmit}
//     user={this.props.user}
//   />
// </div>
export default withRouter(AddPlace)
