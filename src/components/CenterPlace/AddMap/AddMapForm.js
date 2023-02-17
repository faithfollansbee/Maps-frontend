import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AddMapForm = ({ centerPlace, handleChange, handleSubmit, handleSubmitClose, name, lat, lng }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="name">
      <Form.Control
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleChange}
        name="name"
        required
      />
    </Form.Group>
    <Form.Group controlId="latitude">
      <Form.Control
        type="text"
        placeholder="Latitude"
        value={lat}
        onChange={handleChange}
        name="latitude"
        required
      />
    </Form.Group>
    <Form.Group controlId="longitude">
      <Form.Control
        type="text"
        placeholder="Longitude"
        value={lng}
        onChange={handleChange}
        name="longitude"
        required
      />
    </Form.Group>

    <Button variant="dark" type="submit">
      Submit
    </Button>
    <Button onClick={handleSubmitClose} color="primary">Close</Button>

  </Form>
)

export default AddMapForm
