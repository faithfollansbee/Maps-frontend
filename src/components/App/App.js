import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import 'typeface-roboto'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import MapContainer from './Container'
// import Places from './Places'
import Place from './Place'
// import Search2 from './Search2'
import Background from './Background'
import { createGlobalStyle } from 'styled-components'
import AccordionPlaces from './AccordionPlaces'
import BestSearch from './bestsearch'
import SimpleSearch from './SimpleSearch'

const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    // background: #f8f5f2;
    // background-image: url('./backgroundimage.svg')
  }
`
class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      mapCenter: []
    }
  }

  apiKey = `${process.env.REACT_APP_API_KEY}`
  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }
  setMapCenter = (LatLng) => {
    this.setState({ mapCenter: LatLng })
    console.log('set map center callback')
    // console.log(this.latitude)
    console.log(this.LatLng)
    console.log(this.state.mapCenter)
    console.log(this.state.mapCenter.lng)
  }

  render () {
    const { alerts, user } = this.state
    return (
      <Fragment>
        <GlobalStyle />
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <Background user={user}/>
        <main className="container" style={{ backgroundImage: 'url(require("./backgroundimage"))' }}>

          <AuthenticatedRoute user={user} exact path='/places/'
            render={() => (<AccordionPlaces user={user}/>)}
          />

          <AuthenticatedRoute user={user} path='/map' render={() => (
            <div>
              <MapContainer user={user} mapCenter={this.state.mapCenter} apiKey={this.apiKey}/>
            </div>
          )} />

          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser}/>
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser}/>
          )}
          />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/places/:id'
            render={() => (<Place user={user}/>)}/>

          <AuthenticatedRoute user={user} path='/createplace'
            render={() => (
              <BestSearch user={user}/>
            )}
          />
          <AuthenticatedRoute user={user} path='/simplesearch'
            render={() => (
              <SimpleSearch setMapCenter={this.setMapCenter}/>
            )}
          />
        </main>
      </Fragment>
    )
  }
}
// <Search2 user={user}/>

export default App
