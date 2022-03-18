import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import 'typeface-roboto'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import MapContainer from './Container'
import NewMap from './NewMap'
// import Place from '../Places/Place'
import PlaceDetail from '../Places/PlaceDetail'
import Background from './Background'
import { createGlobalStyle } from 'styled-components'
// import AccordionPlaces from '../Places/AccordionPlaces'
import Places from '../Places/Places'

// import BestSearch from './bestsearch'
import SimpleSearch from './SimpleSearch'
// import SetMapCoords from './MapCoords/SetMapCoords'
import CenterPlaces from '../CenterPlace/CenterPlaces'
import CenterPlace from '../CenterPlace/CenterPlace'
import AddCenterPlace from '../CenterPlace/AddCenterPlace'
import SelectFromCenterPlace from '../CenterPlace/SelectFromCenterPlace'

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
    // console.log(this.props)
    console.log(LatLng)
    // console.log(LatLng.name)
    // console.log({ lat: LatLng.latitude, lng: LatLng.longitude })
    const coordSet = { lat: LatLng.latitude, lng: LatLng.longitude }
    const coordArr = [ Number(LatLng.latitude), Number(LatLng.longitude) ]
    console.log(coordArr)
    // this.setState({ mapCenter: LatLng })
    this.setState({ mapCenter: coordSet, mapCenterArr: coordArr })
    this.setState({ mapSettings: LatLng })
    // this.setState({ currMap: LatLng.name })
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
    console.log('app state', this.state)
    console.log('app curr Map state', this.state.currMap)
    // console.log(location)
    // console.log(this.state.user)
    // console.log(this.state)
    // console.log('user.mapSettings', this.state.user.mapSettings)
    return (
      <Fragment>
        <GlobalStyle />
        <Header user={user} location={location} />
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
          <AuthenticatedRoute user={user} exact path='/centerPlaces/'
            render={() => (<CenterPlaces setMapCenter={this.setMapCenter} user={user}/>)}
          />
          <AuthenticatedRoute user={user} path="/createCenterPlace"
            render={() => (<AddCenterPlace user={user}/>)}/>

          <AuthenticatedRoute user={user} exact path='/centerPlaces/:id'
            render={() => (<CenterPlace setMapCenter={this.setMapCenter} user={user}/>)}/>

          <AuthenticatedRoute user={user} exact path='/map' render={() => (
            <div>
              <MapContainer user={user} mapCenter={this.state.mapCenter} currMap={this.state.currMap} mapSettings={this.state.mapSettings} apiKey={this.apiKey}/>
              <SelectFromCenterPlace setMapCenter={this.setMapCenter} currMap={this.state.currMap} mapSettings={this.state.mapSettings} mapCenter={this.state.mapCenter} centerPlaces={this.state.centerPlaces} getCenterPlaces={this.getCenterPlaces} user={user} />
            </div>
          )} />
          <AuthenticatedRoute user={user} exact path='/newmap' render={() => (
            <div>
              <NewMap user={user} mapCenter={this.state.mapCenter} mapCenterArr={this.state.mapCenterArr} currMap={this.state.currMap} mapSettings={this.state.mapSettings} apiKey={this.apiKey}/>
              <SelectFromCenterPlace setMapCenter={this.setMapCenter} currMap={this.state.currMap} mapSettings={this.state.mapSettings} mapCenter={this.state.mapCenter} centerPlaces={this.state.centerPlaces} getCenterPlaces={this.getCenterPlaces} user={user} />
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
            render={() => (<PlaceDetail user={user}/>)}/>

          <AuthenticatedRoute user={user} path='/simplesearch'
            render={() => (
              <SimpleSearch user={user} setMapCenter={this.setMapCenter}/>
            )}
          />
        </main>
      </Fragment>
    )
  }
}
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
