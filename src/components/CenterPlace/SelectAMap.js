import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
// import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

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
      <div className="SelectMap">

        <Tooltip title="Current map">
          <FormControl variant="filled">
            <InputLabel id="simple-select-label" style={{ color: 'black', minWidth: 'max-content' }}>{this.props.currMap.name}</InputLabel>
            <TextField
              // variant="outlined"
              size="small"
              variant="filled"
              style={{ color: 'black', backgroundColor: 'white', borderRadius: '3px' }}
              id="simple-select"
              select
              labelId="simple-select-label"
              value={name}
              onChange={this.handleChange}
            >
              { centerPlaces.map(centerPlace => (
                <MenuItem key={centerPlace._id} value={centerPlace}
                  onClick={this.handleChange} name={centerPlace.name} style={inputStyle}
                >{centerPlace.name}</MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Tooltip>
      </div>
    )
  }
}

export default SelectAMap
// <form variant="filled">
//   <Tooltip title="Current map">
//     <TextField
//       // variant="outlined"
//       size="small"
//       variant="filled"
//       style={{ color: 'black', backgroundColor: 'white', borderRadius: '3px' }}
//       id="simple-select"
//       select
//       // label={this.props.currMap.name}
//       labelId="simple-select-label"
//       value={name}
//       label={this.props.currMap.name}
//       onChange={this.handleChange}
//     >
//       { centerPlaces.map(centerPlace => (
//         <MenuItem key={centerPlace._id} value={centerPlace}
//           onClick={this.handleChange} name={centerPlace.name} style={inputStyle}
//         >{centerPlace.name}</MenuItem>
//       ))}
//     </TextField>
//   </Tooltip>
// </form>
