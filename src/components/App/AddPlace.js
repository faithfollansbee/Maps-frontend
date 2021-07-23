import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'

// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
const listStyle = {
  listStyleType: 'none'
}
class AddPlace extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      user: props.user,
      place: {
        name: props.name,
        latitude: props.latitude,
        longitude: props.longitude,
        type: ''
      }
    }
    // console.log(this.props.user)
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
    // console.log(this.state.place)
    return (

      <div className="Search2-layout" margin="auto">
        <Form onSubmit={this.handleSubmit}>
          <div className="col">
            <Form.Group controlId="formBasicCheckbox">
              <ul style={listStyle}>
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
                  <img src='https://img.icons8.com/color/48/000000/pizza.png'/>
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
                  <img src='https://img.icons8.com/offices/30/000000/ferris-wheel.png'/>                </li>
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
                  <img src='https://img.icons8.com/offices/30/000000/monument.png'/>
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
                  <img src='https://img.icons8.com/plasticine/50/000000/wine-glass.png'/>
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
                    /> Outdoors </label>
                  <img src='https://img.icons8.com/ios-filled/25/000000/deciduous-tree.png'/>
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
                    /> Museum </label>
                  <img src='https://img.icons8.com/material-sharp/24/000000/museum.png'/>
                </li>
              </ul>
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

export default withRouter(AddPlace)
// <div className="col">
//   <Form.Group controlId="name">
//     <Form.Label></Form.Label>
//     <Form.Control
//       plaintext readOnly
//       type="text"
//       placeholder=""
//       value={this.props.name}
//       onChange={this.handleChange}
//       name="name"
//       required
//     />
//   </Form.Group>
// </div>
// <Form.Group controlId="latitude">
//   <Form.Label></Form.Label>
//   <Form.Control
//     plaintext readOnly
//     type="text"
//     placeholder=""
//     value={this.props.latitude}
//     onChange={this.handleChange}
//     name="latitude"
//     required
//   />
// </Form.Group>
// <Form.Group controlId="longitude">
//   <Form.Label></Form.Label>
//   <Form.Control
//     plaintext readOnly
//     placeholder=""
//     value={this.props.longitude}
//     onChange={this.handleChange}
//     name="longitude"
//     required
//   />
// </Form.Group>
