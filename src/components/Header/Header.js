import React, { Fragment, Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import AccountMenu from './AccountMenu'
import { withRouter, NavLink } from 'react-router-dom'
import '../../index.scss'
// import PlaceBookLogo from './PlaceBookLogo.png'
import { signIn } from '../../api/auth'

const logoStyle = {
  height: '80px',
  width: '110px',
  padding: '0px',
  marign: '0px',
  color: 'white'
}
const NavBarStyle = {
  margin: '0px',
  padding: '0px',
  position: 'relative'
}

const authenticatedOptions = (
  <Fragment>
    <NavLink className="nav-link" activeStyle={{ color: 'white' }} to="/places" href="#places"> Saved Places </NavLink>
    <NavLink className="nav-link" activeStyle={{ color: 'white' }} to="/map" href="#map"> Map </NavLink>
    <NavLink className="nav-link" activeStyle={{ color: 'white' }} to="/centerplaces" href="#centerPlaces"> Saved Maps </NavLink>
  </Fragment>
)

// const unauthenticatedOptions = (
//   <Fragment>
//     <Nav.Link onClick={() => this.guestSignIn(user, setUser)} href="#map">Guest</Nav.Link>
//
//     <NavLink className="nav-link" activeStyle={{ color: 'white' }} to="/sign-up" href="#sign-up"> Sign Up </NavLink>
//     <NavLink className="nav-link" activeStyle={{ color: 'white' }} to="/sign-in" href="#sign-in"> Sign In </NavLink>
//   </Fragment>
// )

const alwaysOptions = (
  <Fragment>
  </Fragment>
)
// const guestSignIn = (user, setUser) => {
//   signIn({ email: 'guest@guest', password: 'guest!' })
//     .then(res => setUser(res.data.user))
//     .then(() => history.push('/map'))
// }
class Header extends Component {
  render () {
    const { alert, user, history, setUser } = this.props
    console.log(history)

    const guestSignIn = (user, setUser) => {
      event.preventDefault()
      console.log(user)
      signIn({ email: 'guest@guest', password: 'guest' })
        .then(res => setUser(res.data.user))
        .then(() => alert({
          heading: `Welcome, ${this.props.user.email}`,
          variant: 'success'
        }))
        .then(() => history.push('/map'))
    }

    const unauthenticatedOptions = (
      <Fragment>
        <Nav.Link onClick={() => guestSignIn(user, setUser)} href="#map">Guest</Nav.Link>

        <NavLink className="nav-link" activeStyle={{ color: 'white' }} to="/sign-up" href="#sign-up"> Sign Up </NavLink>
        <NavLink className="nav-link" activeStyle={{ color: 'white' }} to="/sign-in" href="#sign-in"> Sign In </NavLink>
      </Fragment>
    )
    return (
      <Fragment>
        <Navbar variant="dark" expand="md" style={NavBarStyle}>
          <Navbar.Brand href="#map">
          </Navbar.Brand>
          <div className="logoContainer" style={logoStyle}>
            <img src={require('./PlaceBookLogo.png')} style={logoStyle} alt="PlaceBook-logo"/>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              { alwaysOptions }
              { user ? authenticatedOptions : unauthenticatedOptions }
            </Nav>
          </Navbar.Collapse>
          {user && <AccountMenu user={user}/>}
        </Navbar>
      </Fragment>
    )
  }
}
// const Header = ({ user, location }) => (
//   <Fragment>
//     <Navbar variant="dark" expand="md" style={NavBarStyle}>
//       <Navbar.Brand href="#map">
//       </Navbar.Brand>
//       <div className="logoContainer" style={logoStyle}>
//         <img src={require('./PlaceBookLogo.png')} style={logoStyle} alt="PlaceBook-logo"/>
//       </div>
//       <Navbar.Toggle aria-controls="basic-navbar-nav"/>
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="ml-auto">
//           { alwaysOptions }
//           { user ? authenticatedOptions : unauthenticatedOptions }
//           <Nav.Link onClick={() => guestSignIn(user, setUser)} href="#map"><i>GUEST</i></Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//       {user && <AccountMenu user={user}/>}
//     </Navbar>
//   </Fragment>
// )

export default withRouter(Header)
// <Nav style={{ display: 'flex', justifyContent: 'space-evenly', bottom: '30px', left: '18rem', right: '18rem', position: 'fixed', zIndex: '20', backgroundColor: '#E6F7E7' }}> {unauthenticatedOptions} </Nav>

// <Nav.Link href="#change-coords"> Change Coords </Nav.Link>
// <Nav.Link href="#createplace">Add place</Nav.Link>

// <Navbar.Brand href="#">
//   PLACEBOOK
// </Navbar.Brand>
