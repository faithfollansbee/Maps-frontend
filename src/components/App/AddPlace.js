import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PlaceForm from './PlaceForm'
import { withRouter } from 'react-router-dom'
// import Search from './Search'
// import BestSearch from './bestsearch'

const style = {
  width: '90%',
  margin: 10,
  padding: 15,
  justifyContent: 'space-between',
  alignItems: 'baseline',
  position: 'fixed'
}

class AddPlace extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.user,
      latitude: props.latitude,
      longitude: props.longitude,
      name: props.name,
      type: props.type,
      place: {
        name: props.name,
        latitude: props.latitude,
        longitude: props.longitude,
        type: props.type
      }
    }
    console.log(this.props.user)
  }

  handleChange = event => {
    this.setState({
      place: {
        ...this.state.place,
        [event.target.name]: event.target.value
      }
    })
  }
  // const handleClick = () => {
  //     event.preventDefault()
  //     axios({
  //       method: 'POST',
  //       url: `${apiUrl}/movies`,
  //       headers: {
  //         Authorization: `Token token=${props.user.token}`
  //       },
  //       data: {
  //         movie: {
  //           title: props.title,
  //           description: props.description,
  //           released: props.released,
  //           image: props.image
  //         }
  //       }
  //     })
  //   //  <Redirect to="/movies"/>
  //   }
  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/places`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        place: {
          name: this.props.name,
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          type: this.props.type
        }
      }
    })
      .then(response => {
        this.props.history.push(`/places/${response.data.place._id}`)
      })
      .catch(err => this.setState({ error: err.message }))
  }

  render () {
    console.log(this.state.place)
    return (
      <div style={style}>
        <h3>search and add a place</h3>
        <div className="row" style={style}>
          <PlaceForm
            latitude={this.props.latitude}
            longitude={this.props.longitude}
            name={this.props.name}
            type={this.props.type}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            user={this.user}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(AddPlace)
