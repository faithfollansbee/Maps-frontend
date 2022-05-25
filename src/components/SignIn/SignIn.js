import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import classNames from 'classnames'
import Card from '@material-ui/core/Card'
// import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Fade from '@material-ui/core/Fade'
// import { withStyles } from '@material-ui/core/styles'

// const signInStyle = {
//   background: 'white',
//   margin: '15px',
//   padding: '10px'
// }

class SignIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user: null,
      isSigningIn: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  componentDidMount = () => {
    this.setState({ isSigningIn: true })
  }

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert({
        heading: `Welcome, ${this.state.email}`,
        // message: messages.signInSuccess,
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

  render (props) {
    // const { classes } = this.props
    const { email, password, isSigningIn } = this.state
    return (
      <Fade in={isSigningIn} {...(isSigningIn ? { timeout: 700 } : {})}>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <Card style={{ fontFamily: 'Poppins', fontWeight: '300' }}>
              <CardContent>
                <h3 style={{ marginBottom: '1rem', fontWeight: '400' }}>Sign In</h3>
                <Form onSubmit={this.onSignIn}>
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
                  <Button type="submit" style={{ backgroundColor: '#122c38' }}>Submit</Button>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Fade>
    )
  }
}
// export default (withStyles(styles), withRouter)(SignIn)

export default withRouter(SignIn)
