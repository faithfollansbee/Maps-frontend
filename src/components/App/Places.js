import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
// import FormControl from 'react-bootstrap/FormControl'
// import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
const style = {
  margin: 20
}
class Places extends Component {
  constructor (props) {
    super(props)

    this.state = {
      places: [],
      isLoading: true,
      userPlaces: [],
      filtered: false
    }
  }

  async componentDidMount () {
    try {
      const response = await axios({
        url: `${apiUrl}/places`,
        method: 'GET',
        headers: {
          Authorization: `Token token=${this.props.user.token}`
        }
      })
      this.setState({ places: response.data.places, isLoading: false })
      this.setState({ userPlaces: response.data.places })
    } catch (error) {
    }
  }

  handleFilter = event => {
    event.preventDefault()
    this.setState({ filtered: !this.state.filtered })
  }
  handleChange = event => {
    const searchString = event.target.value.toLowerCase()
    const queryLength = searchString.length
    const prevQueryLength = this.state.queryLength || 0
    const places = queryLength > prevQueryLength ? this.state.userPlaces : this.state.places

    const searchResults = places.filter(place => place.name.toLowerCase().includes(searchString))

    this.setState({ userRecipes: searchResults, queryLength: queryLength })
  }

  render (props) {
    const placesJsx = this.state.places.map(place => (
      <ListGroup.Item key={place._id}>
        <Link to={`/places/${place._id}`}>{place.name}</Link>
      </ListGroup.Item>
    ))

    if (this.state.isLoading) {
      return (
        <div className="text-center">
        </div>
      )
    }
    console.log(this.state)
    return (
      <ListGroup style={style}>
        {this.state.places.length
          ? placesJsx
          : <ListGroup.Item>No places found</ListGroup.Item>
        }
      </ListGroup>
    )
  }
}
export default Places
