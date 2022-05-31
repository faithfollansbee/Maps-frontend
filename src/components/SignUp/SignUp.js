import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Fade from '@material-ui/core/Fade'
// import Typography from '@material-ui/core/Typography'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      isSigningUp: false
    }
  }
  componentDidMount = () => {
    this.setState({ isSigningUp: true })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/map'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        alert({
          heading: 'Sign Up Failed',
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, passwordConfirmation, isSigningUp } = this.state

    return (
      <Fade in={isSigningUp} {...(isSigningUp ? { timeout: 1000 } : {})}>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <Card style={{ fontFamily: 'Poppins' }}>
              <CardContent>
                <h3 style={{ marginBottom: '1rem', fontWeight: '400' }}>Sign Up</h3>
                <Form onSubmit={this.onSignUp}>
                  <Form.Group controlId="email">
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Control
                      required
                      name="password"
                      value={password}
                      type="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="passwordConfirmation">
                    <Form.Control
                      required
                      name="passwordConfirmation"
                      value={passwordConfirmation}
                      type="password"
                      placeholder="Confirm Password"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Button style={{ backgroundColor: '#122c38' }} type="submit">
                    Submit
                  </Button>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Fade>
    )
  }
}

export default withRouter(SignUp)
