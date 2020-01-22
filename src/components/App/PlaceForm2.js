// import React from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
//
// const PlaceForm2 = ({ place, latitude, longitude, type, name, handleChange, handleSubmit }) => (
//   <Form onSubmit={this.handleSubmit}>
//     <Form.Group controlId="name">
//       <Form.Label>Name</Form.Label>
//       <Form.Control
//         type="text"
//         placeholder="Enter a name"
//         value={name}
//         onChange={this.handleChange}
//         name="name"
//         required
//       />
//     </Form.Group>
//
//     <Form.Group controlId="latitude">
//       <Form.Label>latitude</Form.Label>
//       <Form.Control
//         type="text"
//         placeholder="Enter the latitude"
//         value={this.latitude}
//         onChange={this.handleChange}
//         name="latitude"
//         required
//       />
//     </Form.Group>
//     <Form.Group controlId="longitude">
//       <Form.Label>longitude</Form.Label>
//       <Form.Control
//         type="text"
//         placeholder="Enter the longitude"
//         value={this.longitude}
//         onChange={this.handleChange}
//         name="longitude"
//         required
//       />
//     </Form.Group>
//     <Button variant="dark" type="submit">
//       Submit
//     </Button>
//   </Form>
// )
//
// export default PlaceForm2
// // <Form.Group controlId="type" className="field" id="type">
// //   <Form.Label>place type</Form.Label>
// //
// //   <p>Select a place category/type:</p>
// //   <ul>
// //     <li>
// //       <label>
// //         <input
// //           name="type"
// //           type="radio"
// //           value="restaurant"
// //           checked={this.state.type === 'restaurant'}
// //           onChange={this.toHandleChange}
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
// //           checked={this.state.type === 'entertainment'}
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
// //           checked={this.state.type === 'landmark'}
// //           onChange={this.toHandleChange}
// //         />
// //         Landmark
// //       </label>
// //     </li>
// //   </ul>
// // </Form.Group>
