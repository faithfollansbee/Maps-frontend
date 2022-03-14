// import React, { Component } from 'react'
// import axios from 'axios'
// import apiUrl from '../../../apiConfig'
// import EditPlaceForm from './EditPlaceForm'
// import { withRouter } from 'react-router-dom'
//
// class EditPlace extends Component {
//   state = {
//     genre: null,
//     submitted: false
//   }
//
//   handleChange = event => {
//     this.setState({
//       place: {
//         ...this.state.place,
//         [event.target.name]: event.target.value
//       }
//     })
//   }
//
//   handleSubmit = event => {
//     event.preventDefault()
//     axios({
//       method: 'PATCH',
//       url: `${apiUrl}/places/${this.props.place._id}`,
//       headers: {
//         'Authorization': `Token token=${this.props.user.token}`
//       },
//       data: {
//         place: this.state.place
//       }
//     })
//       .then(response => {
//         this.props.history.push(`/places${this.props.place._id}`)
//       })
//       .then(() => this.setState({ submitted: true }))
//       .then(response => {
//         this.props.history.goBack()
//       })
//     this.props.handleSubmitClose()
//   }
//   render () {
//     const { place, id, type, name, handleSubmitClose } = this.props
//     return (
//       <EditPlaceForm
//         user={this.user}
//         id={id}
//         place={place}
//         type={type}
//         name={name}
//         handleSubmitClose={handleSubmitClose}
//         handleChange={this.handleChange}
//         handleSubmit={this.handleSubmit}
//       />
//     )
//   }
// }
//
// export default withRouter(EditPlace)
