import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PlaceForm = ({ place, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="name">
      <Form.Label>place Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter a name"
        value={place.name}
        onChange={handleChange}
        name="name"
        required
      />
    </Form.Group>

    <Form.Group controlId="latitude">
      <Form.Label>latitude</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter the latitude"
        value={place.latitude}
        onChange={handleChange}
        name="latitude"
        required
      />
    </Form.Group>
    <Form.Group controlId="longitude">
      <Form.Label>longitude</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter the longitude"
        value={place.longitude}
        onChange={handleChange}
        name="longitude"
        required
      />
    </Form.Group>

    <Form.Group controlId="type">
      <Form.Label>place type</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter the type of place"
        value={place.type}
        onChange={handleChange}
        name="type"
        required
      />
    </Form.Group>

    <Button variant="dark" type="submit">
      Submit
    </Button>
  </Form>
)

export default PlaceForm
