import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
// import 'typeface-roboto'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Map from './Map/Map'
import PlaceDetail from '../Places/PlaceDetail'
import Background from './Background'
import { createGlobalStyle } from 'styled-components'
import Places from '../Places/Places'
import SimpleSearch from '../CenterPlace/AddMap/SimpleSearch'
// import SetMapCoords from './MapCoords/SetMapCoords'
import CenterPlaces from '../CenterPlace/CenterPlaces'
import CenterPlace from '../CenterPlace/CenterPlace'
// import AddCenterPlace from '../CenterPlace/AddCenterPlace'
import SelectAMap from '../CenterPlace/SelectAMap'

const GlobalStyle = createGlobalStyle`
  body {
    // width: 100%;
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
      mapCenter: [],
      mapSettings: [],
      centerPlaces: [],
      mapId: '',
      currMap: {
        name: 'Boston',
        currCoords: {
          lat: '42.3600825',
          lng: '-71.0588801'
        }
      }
    }
    // this.setMapCenter = this.setMapCenter.bind(this)
  }

  apiKey = `${process.env.REACT_APP_API_KEY}`
  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }
  setMapCenter = (LatLng) => {
    const coordSet = { lat: LatLng.latitude, lng: LatLng.longitude }
    const coordArr = [ Number(LatLng.latitude), Number(LatLng.longitude) ]
    // this.setState({ mapCenter: LatLng })
    this.setState({ mapCenter: coordSet, mapCenterArr: coordArr })
    this.setState({ mapSettings: LatLng })
    this.setState({
      currMap: {
        name: LatLng.name,
        currCoords: {
          lat: LatLng.latitude,
          lng: LatLng.longitude
        }
      }
    })
    // this.setState({ mapSettings: [...LatLng], lat: LatLng.latitude, lng: LatLng.longitude })
    // console.log('user.mapSettings', this.state.user.mapSettings)
    // console.log('set map center callback')
    // console.log(this.state.mapCenter)
  }

  // getCenterPlaces = () => {
  //   const response = axios({
  //     url: `${apiUrl}/centerPlaces`,
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Token token=${this.state.user.token}`
  //     }
  //   })
  //   // this.setState({ centerPlaces: response.data.centerPlaces, isLoading: false })
  //   console.log(response)
  // }
  // async getCenterPlaces () {
  //   try {
  //     const response = await axios({
  //       url: `${apiUrl}/centerPlaces`,
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Token token=${this.props.user.token}`
  //       }
  //     })
  //     this.setState({ centerPlaces: response.data.centerPlaces, isLoading: false })
  //     // this.setState({ userGenres: response.data.genres })
  //   } catch (error) {
  //   }
  // }

  render () {
    const { alerts, user } = this.state
    // console.log('app state', this.state)
    // console.log('app curr Map state', this.state.currMap)
    // console.log(this.apiKey)
    // console.log(location)
    // console.log(this.state.user)
    // console.log(this.state)
    // console.log('user.mapSettings', this.state.user.mapSettings)
    return (
      <Fragment>
        <GlobalStyle />
        <Header user={user} alert={this.alert} location={location} setUser={this.setUser} />
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
            render={() => (<Places user={user}/>)}
          />
          <AuthenticatedRoute user={user} exact path='/saved/'
            render={() => (<CenterPlaces setMapCenter={this.setMapCenter} user={user} mapCenter={this.state.mapCenter} currMap={this.state.currMap} mapSettings={this.state.mapSettings}/>)}
          />

          <AuthenticatedRoute user={user} exact path='/centerPlaces/:id'
            render={() => (<CenterPlace setMapCenter={this.setMapCenter} user={user}/>)}/>

          <AuthenticatedRoute user={user} exact path='/map' render={() => (
            <div>
              <SelectAMap setMapCenter={this.setMapCenter} currMap={this.state.currMap} mapSettings={this.state.mapSettings} mapCenter={this.state.mapCenter} centerPlaces={this.state.centerPlaces} getCenterPlaces={this.getCenterPlaces} user={user} />
              <Map user={user} mapCenter={this.state.mapCenter} mapCenterArr={this.state.mapCenterArr} currMap={this.state.currMap} mapSettings={this.state.mapSettings} apiKey={this.apiKey}/>
            </div>
          )} />
          <AuthenticatedRoute user={user} path='/simplesearch'
            render={() => (
              <SimpleSearch apiKey={this.apiKey} user={user} setMapCenter={this.setMapCenter}/>
            )}
          />
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
            render={() => (<PlaceDetail user={user}/>)}/>

        </main>
      </Fragment>
    )
  }
}
// <AuthenticatedRoute user={user} path='/simplesearch'
//   render={() => (
//     <SimpleSearch user={user} setMapCenter={this.setMapCenter}/>
//   )}
// />
// <AuthenticatedRoute user={user} path="/createCenterPlace"
//   render={() => (<AddCenterPlace user={user}/>)}/>

// <Search2 user={user}/>
// <AuthenticatedRoute user={user} path='/change-coords' render={() => (
//   <SetMapCoords alert={this.alert} user={user} setMapCenter={this.state.setMapCenter} mapSettings={this.state.mapSettings} mapCenter={this.state.mapCenter}/>
// )} />
// <AuthenticatedRoute user={user} path='/createplace'
//   render={() => (
//     <BestSearch user={user}/>
//   )}
// />
export default App
