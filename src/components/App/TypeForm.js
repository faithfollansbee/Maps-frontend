// import React, { Component } from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
//
// class TypeForm extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       place: {
//         name: props.name,
//         latitude: props.latitude,
//         longitude: props.longitude,
//         type: ''
//       }
//     }
//   }
//   handleChange = event => {
//     this.setState({
//       place: {
//         ...this.state.place,
//         [event.target.name]: event.target.value
//       }
//     })
//     console.log(this.state)
//   }
//   handleSubmit = event => {
//     event.preventDefault()
//     axios({
//       method: 'POST',
//       url: `${apiUrl}/places`,
//       headers: {
//         'Authorization': `Token token=${this.props.user.token}`
//       },
//       data: {
//         place: {
//           name: this.props.name,
//           latitude: this.props.latitude,
//           longitude: this.props.longitude,
//           type: this.props.type
//         }
//       }
//     })
//       .then(response => {
//         this.props.history.push(`/places/${response.data.place._id}`)
//       })
//       .catch(err => this.setState({ error: err.message }))
//   }
//
//   render () {
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <Form.Group controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter a name"
//             value={this.props.name}
//             onChange={this.handleChange}
//             name="name"
//             required
//           />
//         </Form.Group>
//
//         <Form.Group controlId="latitude">
//           <Form.Label>latitude</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter the latitude"
//             value={this.props.latitude}
//             onChange={this.handleChange}
//             name="latitude"
//             required
//           />
//         </Form.Group>
//         <Form.Group controlId="longitude">
//           <Form.Label>longitude</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter the longitude"
//             value={this.props.longitude}
//             onChange={this.handleChange}
//             name="longitude"
//             required
//           />
//         </Form.Group>
//         <Form.Group controlId="formBasicCheckbox">
//           <ul>
//             <li>
//               <label>
//                 <input
//                   name="type"
//                   type="radio"
//                   value="restaurant"
//                   ref={this.input}
//                   onChange={this.handleChange}
//                 />Restaurant</label>
//             </li>
//             <li>
//               <label>
//                 <input
//                   name="type"
//                   type="radio"
//                   value="entertainment"
//                   ref={this.input}
//                   onChange={this.handleChange}
//                 />Entertainment</label>
//             </li>
//             <li>
//               <label>
//                 <input
//                   name="type"
//                   type="radio"
//                   value="landmark"
//                   ref={this.input}
//                   onChange={this.handleChange}
//                 />Landmark</label>
//             </li>
//           </ul>
//         </Form.Group>
//         <Button variant="dark" type="submit">
//           Submit
//         </Button>
//       </Form>
//     )
//   }
// }
// export default TypeForm
// // <form onSubmit={this.props.handleSubmit}>
// //   <p>Select a place category/type:</p>
// //   <ul>
// //     <li>
// //       <label>
// //         <input
// //           name="type"
// //           type="radio"
// //           value="restaurant"
// //           onChange={this.props.handleChange}
// //         />
// //         Restaurant
// //       </label>
// //     </li>
// //     <li>
// //       <label>
// //         <input
// //           name="type"
// //           type="radio"
// //           value="entertainment"
// //           onChange={this.toHandleChange}
// //         />
// //       Entertainment
// //       </label>
// //     </li>
// //     <li>
// //       <label>
// //         <input
// //           name="type"
// //           type="radio"
// //           value="landmark"
// //           onChange={this.props.handleChange}
// //         />
// //         Landmark
// //       </label>
// //     </li>
// //   </ul>
// //   <Button variant="dark" type="submit">
// //     Submit
// //   </Button>
// // </form>
