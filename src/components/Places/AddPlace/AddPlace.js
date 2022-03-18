import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

// const listStyle = {
//   listStyleType: 'none'
// }
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
          emoji: this.state.emoji
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

    return (
      // 🍕🍺🍿🏠🏛🌲🥡
      <div className="Search2-layout" margin="auto">
        <Form onSubmit={this.handleSubmit}>
          <div className="col">
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Type</FormLabel>
              <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                //     name="controlled-radio-buttons-group"
                value={this.type}
                // onChange={handleChange}
                onChange={this.handleOptionChange}>

                <FormControlLabel value="restaurant"
                  control={
                    <div>
                      <Radio
                        checked={this.state.type === 'restaurant'}
                        onChange={this.handleOptionChange}
                        value={'🍕'}
                        name="restaurant"
                        inputProps={{ 'aria-label': 'restaurant' }} />
                      <img src='https://img.icons8.com/color/48/000000/pizza.png'/>
                      🍕
                    </div>}
                  label="Restaurant" />

                <FormControlLabel value="museum"
                  control={
                    <div>
                      <Radio
                        checked={this.state.type === 'museum'}
                        onChange={this.handleOptionChange}
                        value="museum"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'museum' }} />
                      <img src='https://img.icons8.com/material-sharp/24/000000/museum.png'/>
                    </div>}
                  label="Museum" />

                <FormControlLabel value="bar"
                  control={
                    <div>
                      <Radio
                        checked={ this.state.type === 'bar' && this.state.emoji === '🍺' }
                        onChange={this.handleOptionChange}
                        value={'🍺'}
                        // value='🍺'
                        name="bar"
                        // name="radio-buttons"
                        inputProps={{ 'aria-label': 'bar' }} />
                      <img src='https://img.icons8.com/plasticine/50/000000/wine-glass.png'/>
                      🍺
                    </div>}
                  label="Bar" />

                <FormControlLabel value="historical landmark"
                  control={
                    <div>
                      <Radio
                        checked={this.state.type === 'historical landmark'}
                        onChange={this.handleOptionChange}
                        value="historical landmark"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'historical landmark' }} />
                      <img src='https://img.icons8.com/offices/30/000000/monument.png'/>
                    </div>}
                  label="Historical Landmark" />

                <FormControlLabel value="entertainment"
                  control={
                    <div>
                      <Radio
                        checked={this.state.type === 'entertainment'}
                        onChange={this.handleOptionChange}
                        value="entertainment"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'entertainment' }} />
                      <img src='https://img.icons8.com/offices/30/000000/ferris-wheel.png'/>
                    </div>}
                  label="Entertainment" />

                <FormControlLabel value="university"
                  control={
                    <div>
                      <Radio
                        checked={this.state.type === 'university'}
                        onChange={this.handleOptionChange}
                        value="university"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'university' }} />
                      <img src="https://img.icons8.com/color/48/000000/student-center.png"/>
                    </div>}
                  label="University" />

                <FormControlLabel value="home"
                  control={
                    <div>
                      <Radio
                        checked={this.state.type === 'home'}
                        onChange={this.handleOptionChange}
                        value="home"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'home' }} />
                      <img src='https://img.icons8.com/color/48/000000/home.png'/>
                    </div>}
                  label="Home" />

                <FormControlLabel value="outdoors"
                  control={
                    <div>
                      <Radio
                        checked={this.state.type === 'outdoors'}
                        onChange={this.handleOptionChange}
                        value="outdoors"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'outdoors' }} />
                      <img src='https://img.icons8.com/ios-filled/25/000000/deciduous-tree.png'/>
                    </div>}
                  label="Outdoors" />
              </RadioGroup>
            </FormControl>
          </div>
          <DialogActions>
            <Button onClick={handleSubmitClose} color="primary">
               Cancel
            </Button>
            <Button onClick={this.handleSubmit} type="submit" color="primary">
               Submit
            </Button>
          </DialogActions>
          <Button variant="dark" color="primary" type="submit">
            Submit
          </Button>
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
