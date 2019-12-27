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

    <Form.Group controlId="coords">
      <Form.Label>coordinates</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter the coords"
        value={place.coords}
        onChange={handleChange}
        name="coords"
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
