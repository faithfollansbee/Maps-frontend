import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
// import Menu from '@material-ui/core/Menu'
// import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
// import Snackbar from '@material-ui/core/Snackbar'

const buttonStyle = {
  display: 'block',
  marginTop: 'theme.spacing(2)'
}
// const formControlStyle = {
//   margin: 'theme.spacing(1)',
//   minWidth: 120
// }
class SelectFromCenterPlace extends Component {
  constructor (props) {
    super(props)

    this.state = {
      centerPlaces: [],
      isLoading: true,
      filtered: false,
      open: false,
      mapCenter: ''
      // mapSettings: props.mapSettings
      // centerPlace: ''
      // map: ''
    }
  }

  async componentDidMount () {
    try {
      const response = await axios({
        url: `${apiUrl}/centerPlaces`,
        method: 'GET',
        headers: {
          Authorization: `Token token=${this.props.user.token}`
        }
      })
      this.setState({ centerPlaces: response.data.centerPlaces, isLoading: false })
      // this.setState({ userGenres: response.data.genres })
    } catch (error) {
      console.log(error)
    }
  }

  handleOpen = (e) => {
    this.setState({ open: true })
    this.setState({ anchorEl: e.target })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  handleChange = (event) => {
    console.log(event.target.value)
    this.props.setMapCenter(event.target.value)
    const newCenter = { lat: event.target.value.latitude, lng: event.target.value.longitude }
    const centerObj = { ...event.target.value }
    // this.props.setMapCenter(newCenter)
    // this.setState({ mapCenter: event.target.value.name })
    this.setState({ mapCenter: event.target.value })
    // this.setState({ mapCenter: [...event.target.value], newCenter })
    console.log(newCenter)
    console.log(centerObj)
  }

  render (props) {
    const { centerPlaces, open } = this.state
    // console.log('select state', this.state)
    // console.log('select props', this.props)

    return (
      <div className="Search2-layout">
        <Button style={buttonStyle} onClick={this.handleOpen} aria-controls="simple-menu">
           View Other Map
        </Button>
        <Select
          labelId="select"
          id="demo-simple-select"
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          defaultValue=''
          open={open}
          // value={mapSettings.name}
          // value={mapCenter}
          onChange={this.handleChange}
          // onClick={(e) => this.props.setMapCenter({ lat: centerPlace.latitude, lng: centerPlace.longitude })}
        >
          { centerPlaces.map(centerPlace => (
            <MenuItem key={centerPlace._id} value={centerPlace}
              onClick={this.handleChange}
              // onClick={(e) => this.props.setMapCenter({ lat: centerPlace.latitude, lng: centerPlace.longitude })}
            >{centerPlace.name}</MenuItem>
          ))}
        </Select>
        <h5>select props.mapSettings.name: {this.props.mapSettings.name}</h5>
        <h5>select props.currMap.name: {this.props.currMap.name}</h5>

      </div>
    )
  }
}
// const centerPlacesJSX = centerPlaces.map(centerPlace => (
//   <MenuItem key={centerPlace._id} value={centerPlace}
//     // onClick={(e) => this.props.setMapCenter({ lat: centerPlace.latitude, lng: centerPlace.longitude })}
//   >{centerPlace.name}</MenuItem>
// ))
// {centerPlacesJSX}

export default SelectFromCenterPlace
