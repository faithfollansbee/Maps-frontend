import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
// import FormLabel from '@material-ui/core/FormLabel'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import placeTypes from '../../App/PlaceTypes'

class AddPlace extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      user: props.user,
      placeTypes: placeTypes,
      place: {
        name: props.name,
        latitude: props.latitude,
        longitude: props.longitude,
        longName: props.longName,
        type: '',
        emoji: ''
      },
      value: '',
      emoji: ''
    }
    // console.log(this.props.user)
  }

  handleChange = event => {
    console.log(event)
    console.log(event.target)
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
          type: this.state.type,
          emoji: this.state.emoji,
          longName: this.props.longName
        }
      }
    })
      .then(response => {
        this.props.history.push(`/places/${response.data.place._id}`)
      })
      .catch(err => this.setState({ error: err.message }))
    this.props.handleSubmitClose()
  }

  handleOptionChange = changeEvent => {
    console.log(changeEvent)
    // console.log(changeEvent.target.value)
    console.log(changeEvent.target)
    console.log(changeEvent.target.name)
    this.setState({
      type: changeEvent.target.name,
      emoji: changeEvent.target.value
      // type: changeEvent.target.value.name,
      // emoji: changeEvent.target.value.emoji
    })
  }

  render () {
    console.log(this.state)
    const { handleSubmitClose } = this.props
    // <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
    const placeTypesJsx = this.state.placeTypes.map(type => (
      <div key={type.id}>
        <RadioGroup name={type.placeType} key={type.id} value={type.id} aria-labelledby="demo-controlled-radio-buttons-group">
          <FormControlLabel
            value={type.id}
            control={
              <div>
                <Radio
                  value={type.id}
                  checked={this.state.type === type.placeType}
                  onChange={this.handleOptionChange}
                  inputProps={{ 'aria-label': type.placeType }}
                  name={type.placeType}
                />
                <img src={type.img} style={{ transform: 'scale(0.7)' }}/>
              </div>
            }
            // checked={this.state.type === type.id}
            onChange={this.handleOptionChange}
            label={type.placeType}
          />
        </RadioGroup>
      </div>
    ))

    return (
      // 🍕🍺🍿🏠🏛🌲🥡
      <div margin="auto" style={{ marginTop: '15px' }}>
        <Form onSubmit={this.handleSubmit}>
          <div className="col">
            <FormControl>
              <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                //     name="controlled-radio-buttons-group"
                value={this.type}
                // onChange={handleChange}
                onChange={this.handleOptionChange}>

                { placeTypesJsx }

              </RadioGroup>
            </FormControl>
          </div>
          <DialogActions>
            <Button onClick={handleSubmitClose} variant="dark" color="primary">
               Cancel
            </Button>
            <Button onClick={this.handleSubmit} variant="dark" type="submit" color="primary">
               Submit
            </Button>
          </DialogActions>
        </Form>
      </div>
    )
  }
}

export default withRouter(AddPlace)

// <Form onSubmit={this.handleSubmit}>
//   <div className="col">
//     <Form.Group controlId="formBasicCheckbox">
//       <ul style={listStyle}>
//         <li>
//           <label>
//             <input
//               name="type"
//               type="radio"
//               value="restaurant"
//               ref={this.input}
//               checked={this.state.type === 'restaurant'}
//               onChange={this.handleOptionChange}
//             /> Restaurant</label>
//           <img src='https://img.icons8.com/color/48/000000/pizza.png'/>
//         </li>
//         <li>
//           <label>
//             <input
//               name="type"
//               type="radio"
//               value="entertainment"
//               checked={this.state.type === 'entertainment'}
//               ref={this.input}
//               onChange={this.handleOptionChange}
//             /> Entertainment</label>
//           <img src='https://img.icons8.com/offices/30/000000/ferris-wheel.png'/>                </li>
//         <li>
//           <label>
//             <input
//               name="type"
//               type="radio"
//               value="historical landmark"
//               ref={this.input}
//               onChange={this.handleOptionChange}
//               checked={this.state.type === 'historical landmark'}
//             /> Historical landmark</label>
//           <img src='https://img.icons8.com/offices/30/000000/monument.png'/>
//         </li>
//         <li>
//           <label>
//             <input
//               name="type"
//               type="radio"
//               value="bar"
//               ref={this.input}
//               checked={this.state.type === 'bar'}
//               onChange={this.handleOptionChange}
//             /> Bar</label>
//           <img src='https://img.icons8.com/plasticine/50/000000/wine-glass.png'/>
//         </li>
//         <li>
//           <label>
//             <input
//               name="type"
//               type="radio"
//               value="outdoors"
//               ref={this.input}
//               checked={this.state.type === 'outdoors'}
//               onChange={this.handleOptionChange}
//             /> Outdoors </label>
//           <img src='https://img.icons8.com/ios-filled/25/000000/deciduous-tree.png'/>
//         </li>
//         <li>
//           <label>
//             <input
//               name="type"
//               type="radio"
//               value="museum"
//               ref={this.input}
//               checked={this.state.type === 'museum'}
//               onChange={this.handleOptionChange}
//             /> Museum </label>
//           <img src='https://img.icons8.com/material-sharp/24/000000/museum.png'/>
//         </li>
//         <li>
//           <label>
//             <input
//               name="type"
//               type="radio"
//               value="home"
//               ref={this.input}
//               checked={this.state.type === 'home'}
//               onChange={this.handleOptionChange}
//             /> Home </label>
//           <img src='https://img.icons8.com/color/48/000000/home.png'/>
//         </li>
//         <li>
//           <label>
//             <input
//               name="type"
//               type="radio"
//               value="university"
//               ref={this.input}
//               checked={this.state.type === 'university'}
//               onChange={this.handleOptionChange}
//             /> University </label>
//           <img src="https://img.icons8.com/color/48/000000/student-center.png"/>
//         </li>
//       </ul>
//     </Form.Group>
//   </div>
//   <Button variant="dark" type="submit">
//     Submit
//   </Button>
// </Form>

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
