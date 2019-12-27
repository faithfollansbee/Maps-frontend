import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { withRouter, Redirect, Link } from 'react-router-dom'

import apiUrl from '../../apiConfig'

class Place extends Component {
    state = {
      place: '',
      deleted: false,
      filtered: false
    }

    async componentDidMount (props) {
      try {
        const response = await axios({
          url: `${apiUrl}/places/${this.props.match.params.id}`,
          method: 'GET',
          headers: {
            'Authorization': `Token token=${this.props.user.token}`
          }
        })
        this.setState({ place: response.data.place })
        console.log(this.state.place.name)
      } catch (error) {
      }
    }

    handleFilter = event => {
      event.preventDefault()
      this.setState({ filtered: !this.state.filtered })
    }

    deleteplace = () => {
      axios({
        url: `${apiUrl}/places/${this.props.match.params.id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
        .then(() => this.setState({ deleted: true }))
        .then(() => this.props.history.push('/places'))
        .catch(err => this.setState({ error: err.message }))
    }

    render () {
      const { place, deleted } = this.state
      if (deleted) {
        return <Redirect to={
          {
            pathname: '/places'
          }
        }/>
      }

      return (
        <div>
          { place && (
            <Fragment>
              <div className="container">
                <div className="row">
                  <div className="col s12 m8">
                    <div className="info-container">
                      <p> {place.name} </p>
                      <p> {place.type} </p>
                      <p> {place.coords} </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <Link to="/places">Back to all</Link>
                <button onClick={this.deleteplace}>Delete this place</button>
              </div>
            </Fragment>
          )}
        </div>
      )
    }
}

export default withRouter(Place)
