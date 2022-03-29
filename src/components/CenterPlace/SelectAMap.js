import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
// import Button from '@material-ui/core/Button'
// import Paper from '@material-ui/core/Paper'

// const buttonStyle = {
//   display: 'block',
//   marginTop: 'theme.spacing(2)'
// }
// const formControlStyle = {
//   margin: 'theme.spacing(1)',
//   minWidth: 120
// }
const inputStyle = {
  position: 'relative'
}
const formControlStyle = {
  minWidth: '120px'
}
class SelectAMap extends Component {
  constructor (props) {
    super(props)

    this.state = {
      centerPlaces: [],
      isLoading: true,
      filtered: false,
      open: false,
      mapCenter: '',
      currMap: this.props.currMap
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
    console.log('select state', this.state)
    console.log('select props', this.props)
    console.log(this.props.currMap.name)
    // <Button style={buttonStyle} onClick={this.handleOpen} aria-controls="simple-menu">
    //    View Other Map
    // </Button>
    return (
      <div className="SelectMap">
        <FormControl style={formControlStyle}>
          <InputLabel id="simple-select-label">{this.props.currMap.name}</InputLabel>
          <Select
            style={{ position: 'relative' }}
            // labelId="select"
            // id="demo-simple-select"
            labelId="simple-select-label"
            id="simple-select"
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            // defaultValue=''
            // defaultValue={this.props.currMap.name}
            open={open}
            value={name}
            // value={this.props.currMap.name}
            // value={mapSettings.name}
            onChange={this.handleChange}
            // onClick={(e) => this.props.setMapCenter({ lat: centerPlace.latitude, lng: centerPlace.longitude })}
          >
            { centerPlaces.map(centerPlace => (
              <MenuItem key={centerPlace._id} value={centerPlace}
                onClick={this.handleChange} name={centerPlace.name} style={inputStyle}
                // onClick={(e) => this.props.setMapCenter({ lat: centerPlace.latitude, lng: centerPlace.longitude })}
              >{centerPlace.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Current Map</FormHelperText>

        </FormControl>
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

export default SelectAMap
