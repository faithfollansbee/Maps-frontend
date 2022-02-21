import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const MapCoordsForm = ({ coords, lat, lng, handleChange, handleSubmit, handleSubmitClose }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="lat">
      <Form.Label>Coords lat</Form.Label>
      <Form.Control
        type="text"
        // placeholder={genre.name}
        defaultValue={coords.lat}
        // value={genre.name}
        onChange={handleChange}
        name="lat"
        required
      />
    </Form.Group>
    <Form.Group controlId="lng">
      <Form.Label>Coords lng</Form.Label>
      <Form.Control
        type="text"
        // placeholder={genre.name}
        defaultValue={coords.lng}
        // value={genre.name}
        onChange={handleChange}
        name="lng"
        required
      />
    </Form.Group>

    <Button variant="dark" type="submit">
      Submit
    </Button>
    <Button onClick={handleSubmitClose} color="primary">Close</Button>

  </Form>
)

export default MapCoordsForm
