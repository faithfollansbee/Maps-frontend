import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// const signInStyle = {
//   background: 'white',
//   margin: '15px',
//   padding: '10px'
// }
class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/map'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert({
          heading: 'Sign In Failed',
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Card variant="outlined dark">
            <CardContent>
              <h3>Sign In</h3>
              <Form onSubmit={this.onSignIn}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="dark"
                >
                  Submit
                </Button>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
