import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
// import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Fade from '@material-ui/core/Fade'
// import FormHelperText from '@material-ui/core/FormHelperText'
// import Select from '@material-ui/core/Select'
// import Tooltip from '@material-ui/core/Tooltip'

// const buttonStyle = {
//   display: 'block',
//   marginTop: 'theme.spacing(2)'
// }
// const formControlStyle = {
//   margin: 'theme.spacing(1)',
//   minWidth: 120
// }
const inputStyle = {
  // position: 'relative'
  // color: 'black'
}
// const formControlStyle = {
//   minWidth: 'max-content',
//   // position: 'relative',
//   // minWidth: 'labelWidth',
//   // minWidth: '120px',
//   // marginRight: '10px',
//   // marginLeft: '10px'
//   // paddingRight: '15px'
//   // margin: '10px'
//   backgroundColor: 'yellow'
// }
class SelectAMap extends Component {
  constructor (props) {
    super(props)

    this.state = {
      centerPlaces: [],
      isLoading: true,
      filtered: false,
      open: false,
      mapCenter: '',
      currMap: this.props.currMap,
      map: ''
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
    this.setState({ map: event.target.value })
  }

  render (props) {
    const { centerPlaces } = this.state
    // <Button style={buttonStyle} onClick={this.handleOpen} aria-controls="simple-menu">
    //    View Other Map
    // </Button>
    return (
      <Fade in={true} timeout={500}>
        <div className="SelectMap">
          <FormControl variant="filled">
            { centerPlaces.length === 0 ? (
              <div><InputLabel id="simple-select-label" style={{ color: 'black', minWidth: 'max-content' }}>{this.props.currMap.name}</InputLabel>
                <TextField
                  size="small"
                  variant="filled"
                  id="simple-select"
                  select
                  labelId="simple-select-label"
                  value={name}
                  // onChange={this.handleChange}
                >
                  <MenuItem
                  ><i>No places found</i></MenuItem>
                </TextField>
              </div>)
              : (<div>
                <InputLabel id="select-map">{this.props.currMap.name}</InputLabel>
                <TextField
                  // variant="outlined"
                  variant="filled"
                  style={{ backgroundColor: 'white' }}
                  // color="secondary"
                  select
                  value={name}
                  // label={this.props.currMap.name}
                  // placeholder={this.props.currMap.name}
                  onChange={this.handleChange}
                  labelId="select-map"
                  name="map"
                >
                  { centerPlaces.map(centerPlace => (
                    <MenuItem key={centerPlace._id} value={centerPlace}
                      onClick={this.handleChange} name={centerPlace.name} style={inputStyle}
                    >
                      {centerPlace.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>)}
          </FormControl>
        </div>
      </Fade>
    )
  }
}
// <div style={{ marginTop: '15px' }}>
//   <TextField
//     variant="outlined"
//     placeholder="Enter The Zip Code"
//     label="Zip Code"
//     select
//     name="zipcode"
//   >
//     { centerPlaces.map(centerPlace => (
//       <MenuItem key={centerPlace._id} value={centerPlace}
//         onClick={this.handleChange} name={centerPlace.name} style={inputStyle}
//       >
//         {centerPlace.name}
//       </MenuItem>
//     ))}
//   </TextField>
// </div>

export default SelectAMap
