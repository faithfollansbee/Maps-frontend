import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import PlaceBookLogo from './PlaceBookLogo.png'
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
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link href="#createplace">Add place</Nav.Link>
    <Nav.Link href="#places"> Places </Nav.Link>
    <Nav.Link href="#map"> Map </Nav.Link>
    <Nav.Link href="#simplesearch"> SimpleSearch </Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar variant="dark" expand="md" style={NavBarStyle}>
    <Navbar.Brand href="#">
    </Navbar.Brand>
    <div className="logoContainer" style={logoStyle}>
      <img src={require('./PlaceBookLogo.png')} style={logoStyle} alt="PlaceBook-logo"/>
    </div>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header

// <Navbar.Brand href="#">
//   PLACEBOOK
// </Navbar.Brand>
