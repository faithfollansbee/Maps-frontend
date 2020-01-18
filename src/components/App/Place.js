import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { withRouter, Redirect, Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import apiUrl from '../../apiConfig'

const style = {
  justifyContent: 'center',
  margin: 20,
  padding: 10
}

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
        <div style={style}>
          { place && (
            <Fragment>
              <CardDeck>
                <Card>
                  <Card.Body>
                    <Card.Title>{place.name}</Card.Title>
                    <Card.Subtitle>{place.type}</Card.Subtitle>
                    <Card.Text>
                      {place.coords}
                      {place.latitude}
                      {place.longitude}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to="/places">Back to all</Link>
                    <button onClick={this.deleteplace}>Delete this place</button>
                  </Card.Footer>
                </Card>
              </CardDeck>
            </Fragment>
          )}
        </div>
      )
    }
}

export default withRouter(Place)
