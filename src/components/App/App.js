import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
// import { Map, GoogleApiWrapper } from 'google-maps-react'
// import { Search } from './Search'
// import Landing from './Landing'
import 'typeface-roboto'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import MapContainer from './Container'
import Places from './Places'
import Place from './Place'
// import AddPlace from './AddPlace'
import Search from './Search'
import BestSearch from './bestsearch'
// import Map from './Map'
// import { google } from 'google-maps'

// const theStyle = {
//   display: 'flex'
// }
class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <AuthenticatedRoute user={user} path='/map' render={() => (
            <div>
              <Search user={user} />
              <MapContainer user={user} />
            </div>
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
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

          <AuthenticatedRoute user={user} exact path='/places/'
            render={() => (<Places user={user}/>)}
          />
          <AuthenticatedRoute user={user} exact path='/places/:id'
            render={() => (<Place user={user}/>)}/>

          <AuthenticatedRoute user={user} path='/createplace'
            render={() => (
              <BestSearch user={user}/>
            )}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
