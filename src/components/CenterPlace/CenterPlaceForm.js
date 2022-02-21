import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CenterPlaceForm = ({ centerPlace, handleChange, handleSubmit, handleSubmitClose }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="name">
      <Form.Label>Center Place title</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter a name pls"
        // value={genre.name}
        onChange={handleChange}
        name="name"
        required
      />
    </Form.Group>
    <Form.Group controlId="latitude">
      <Form.Label>Center Place latitude</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter latitude of place pls"
        // value={genre.name}
        onChange={handleChange}
        name="latitude"
        required
      />
    </Form.Group>
    <Form.Group controlId="longitude">
      <Form.Label>Center Place longitude</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter longitude of place pls"
        // value={genre.name}
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

export default CenterPlaceForm
