import Form from 'react-bootstrap/Form'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// import FormControl from '@material-ui/core/FormControl'
// import FormLabel from '@material-ui/core/FormLabel'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import { withRouter, Redirect } from 'react-router-dom'
import placeTypes from '../../App/PlaceTypes'

class EditPlaceForm extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      user: props.user,
      placeTypes: placeTypes,
      // places: [],
      filtered: false,
      place: {
        name: props.name,
        latitude: props.latitude,
        longitude: props.longitude,
        type: props.type
      }
    }
  }
  // closeMovieInfo = event => {
  //   this.setState({ currentMovie: null })
  // }
  // handleChange = event => {
  //   this.setState({
  //     place: {
  //       ...this.state.place,
  //       [event.target.name]: event.target.value
  //     }
  //   })
  // }
  handleChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/places/${this.props.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        place: {
          name: this.state.name,
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          type: this.state.type
        }
      }
    })
      .then(response => {
        this.props.history.push(`/places${this.props.id}`)
      })
      // .then(() => this.props.history.push(`/movies/${this.props.id}`))
      .catch(err => this.setState({ error: err.message }))

    // if editting from specific genre, should redirect to that same genre. if editting from
    // genre list, redirect to all genres
      .then(response => {
        // this.props.history.push('/movies')
        this.props.history.goBack()
      })
    this.props.handleSubmitClose()
  }

  handleOptionChange = changeEvent => {
    this.setState({
      type: changeEvent.target.value
    })
  }
  // handleChange = changeEvent => {
  //   this.setState({
  //     name: changeEvent.target.value
  //   })
  // }

  // async componentDidMount () {
  //   try {
  //     const response = await axios({
  //       url: `${apiUrl}/genres`,
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Token token=${this.props.user.token}`
  //       }
  //     })
  //     this.setState({ genres: response.data.genres, isLoading: false })
  //     this.setState({ userGenres: response.data.genres })
  //   } catch (error) {
  //   }
  // }

  render (props) {
    const { saved } = this.state
    const { place } = this.props
    if (saved) {
      return <Redirect to={
        {
          pathname: '/'
        }
      }/>
    }
    // <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group"
    //   name="controlled-radio-buttons-group"
    //   //     name="controlled-radio-buttons-group"
    //   value={this.type}
    //   // onChange={handleChange}
    //   onChange={this.handleOptionChange}>
    //   <FormControlLabel value="restaurant"
    //     control={
    //       <div>
    //         <Radio
    //           checked={this.state.type === 'restaurant'}
    //           onChange={this.handleOptionChange}
    //           value="restaurant"
    //           name="radio-buttons"
    //           inputProps={{ 'aria-label': 'restaurant' }} />
    //           🍕
    //         <img src='https://img.icons8.com/color/48/000000/pizza.png'/>
    //       </div>}
    //     label="Restaurant" />
    const placeTypesJsx = this.state.placeTypes.map(type => (
      <div key={type.id}>
        <RadioGroup name="type" key={type.id} value={type.id} aria-labelledby="demo-controlled-radio-buttons-group">
          <FormControlLabel
            value={type.id}
            control={
              <div>
                <Radio
                  value={type.id}
                  checked={this.state.type === type.id}
                  onChange={this.handleOptionChange}
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
    // <FormControlLabel value={type.id}
    //   control={
    //     <div>
    //       <Radio
    //         checked={this.state.type === type.id}
    //         onChange={this.handleOptionChange}
    //         value={type.id}
    //         name="radio-buttons"
    //         inputProps={{ 'aria-label': 'restaurant' }} />
    //         🍕
    //       {type.emoji}
    //     </div>}
    //   label="Restaurant" />
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>{place.name}</Form.Label>
            <Form.Control
              type="text"
              // placeholder={genre.name}
              defaultValue={place.name}
              // value={place.name}
              onChange={this.handleChange}
              name="name"
              required
            />
          </Form.Group>
          <Form.Group controlId="placeType">
            { placeTypesJsx }
          </Form.Group>
          <DialogActions>
            <Button onClick={this.props.handleSubmitClose} color="primary">Close</Button>
            <Button color="primary" type="submit">
                Submit
            </Button>
          </DialogActions>
        </Form>
      </div>
    )
  }
}
export default withRouter(EditPlaceForm)

// import React from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from '@material-ui/core/Button'
// const MovieForm = ({ movie, title, genre, handleChange, handleSubmit, handleSubmitClose }) => (
//   <Form onSubmit={handleSubmit}>
//     <Form.Group controlId="name">
//       <Form.Label>Movie title</Form.Label>
//       <Form.Control
//         type="text"
//         // placeholder={genre.name}
//         defaultValue={title}
//         // value={genre.name}
//         onChange={handleChange}
//         name="name"
//         required
//       />
//     </Form.Group>
//     <Form.Group controlId="genre">
//       <Form.Label>genre</Form.Label>
//       <Form.Control
//         type="text"
//         // placeholder={genre.name}
//         defaultValue={genre}
//         // value={genre.name}
//         onChange={handleChange}
//         name="genre"
//         required
//       />
//     </Form.Group>
//     <Button variant="dark" type="submit">
//       Submit
//     </Button>
//     <Button onClick={handleSubmitClose} color="primary">Close</Button>
//   </Form>
// )
// export default MovieForm

// const PlaceForm = ({ place, handleChange, handleSubmit, handleSubmitClose }) => (
//   <div className="Search2-layout" margin="auto">
//     <Form onSubmit={this.handleSubmit}>
//       <div className="col">
//         <FormControl>
//           <FormLabel id="demo-controlled-radio-buttons-group">Type</FormLabel>
//           <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group"
//             name="controlled-radio-buttons-group"
//             //     name="controlled-radio-buttons-group"
//             value={this.type}
//             // onChange={handleChange}
//             onChange={this.handleChange}>
//
//             <FormControlLabel value="restaurant"
//               control={
//                 <div>
//                   <Radio
//                     checked={this.state.type === 'restaurant'}
//                     onChange={this.handleOptionChange}
//                     value="restaurant"
//                     name="radio-buttons"
//                     inputProps={{ 'aria-label': 'restaurant' }} />
//                     🍕
//                   <img src='https://img.icons8.com/color/48/000000/pizza.png'/>
//                 </div>}
//               label="Restaurant" />
//
//             <FormControlLabel value="museum"
//               control={
//                 <div>
//                   <Radio
//                     checked={this.state.type === 'museum'}
//                     onChange={this.handleOptionChange}
//                     value="museum"
//                     name="radio-buttons"
//                     inputProps={{ 'aria-label': 'museum' }} />
//                   <img src='https://img.icons8.com/material-sharp/24/000000/museum.png'/>
//                 </div>}
//               label="Museum" />
//
//             <FormControlLabel value="bar"
//               control={
//                 <div>
//                   <Radio
//                     checked={this.state.type === 'bar'}
//                     onChange={this.handleOptionChange}
//                     value="bar"
//                     name="radio-buttons"
//                     inputProps={{ 'aria-label': 'bar' }} />
//                   <img src='https://img.icons8.com/plasticine/50/000000/wine-glass.png'/>
//                 </div>}
//               label="Bar" />
//             <FormControlLabel value="outdoors"
//               control={
//                 <div>
//                   <Radio
//                     checked={this.state.type === 'outdoors'}
//                     onChange={this.handleOptionChange}
//                     value="outdoors"
//                     name="radio-buttons"
//                     inputProps={{ 'aria-label': 'outdoors' }} />
//                   <img src='https://img.icons8.com/ios-filled/25/000000/deciduous-tree.png'/>
//                 </div>}
//               label="Outdoors" />
//           </RadioGroup>
//         </FormControl>
//       </div>
//       <DialogActions>
//         <Button onClick={handleSubmitClose} color="primary">
//            Cancel
//         </Button>
//         <Button onClick={this.handleSubmit} type="submit" color="primary">
//            Submit
//         </Button>
//       </DialogActions>
//       <Button variant="dark" color="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   </div>
// )
// const PlaceForm = ({ place, handleChange, handleSubmit, handleSubmitClose }) => (
//   <Form onSubmit={handleSubmit}>
//     <Form.Group controlId="name">
//       <Form.Label>Place title</Form.Label>
//       <Form.Control
//         type="text"
//         // placeholder={place.name}
//         defaultValue={place.name}
//         onChange={handleChange}
//         name="name"
//         required
//       />
//     </Form.Group>
//
//     <Button variant="dark" type="submit">
//       Submit
//     </Button>
//     <Button onClick={handleSubmitClose} color="primary">Close</Button>
//
//   </Form>
// )

// export default PlaceForm
