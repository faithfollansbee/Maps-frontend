import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

const style = {
  position: 'relative',
  marginTop: '10px'
}

class InfoBox extends Component {
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
      // if (deleted) {
      //   return <Redirect to={
      //     {
      //       pathname: '/places'
      //     }
      //   }/>
      // }

      return (
        <div style={style}>
          <Fragment>
            <CardDeck>
              <Card>
                <Card.Body>
                  <Card.Title>title</Card.Title>
                  <Card.Subtitle>subtitle</Card.Subtitle>
                  <Card.Text>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div className="cardLink">
                    <Link to="/places" className="cardLink">Back to all</Link>
                  </div>
                  <div className="cardButton">
                    <Button onClick={this.deleteplace} className="cardButton" variant="dark" type="submit">
                      Delete this place
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </CardDeck>
          </Fragment>
        </div>
      )
    }
}

export default withRouter(InfoBox)
