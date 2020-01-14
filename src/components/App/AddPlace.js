import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PlaceForm from './PlaceForm'
import { withRouter } from 'react-router-dom'
import Search from './Search'

const style = {
  width: '90%',
  margin: 10,
  padding: 15,
  justifyContent: 'space-between'
}

class AddPlace extends Component {
  state = {
    place: {
      name: '',
      type: '',
      latitude: '',
      longitude: ''
    },
    submitted: false
  }

  handleChange = event => {
    this.setState({
      place: {
        ...this.state.place,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/places`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        place: this.state.place
      }
    })
      .then(response => {
        this.props.history.push(`/places/${response.data.place._id}`)
      })
      .catch(err => this.setState({ error: err.message }))
  }

  render () {
    return (
      <div style={style}>
        <h3>search and add a place</h3>
        <div className="row" style={style}>
          <PlaceForm
            place={this.state.place}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          <Search user={this.user}/>
        </div>
      </div>
    )
  }
}

export default withRouter(AddPlace)
