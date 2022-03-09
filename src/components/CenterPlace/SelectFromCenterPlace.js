import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
// import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
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
      mapCenter: '',
      centerPlace: ''
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

  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  handleChange = (event) => {
    console.log(event.target.value)
    // this.props.setMapCenter({ lat: event.target.value.latitude, lng: event.target.value.longitude }, { lng: event.target.value.longitude })
    const newCenter = { lat: event.target.value.latitude, lng: event.target.value.longitude }
    this.props.setMapCenter(newCenter)
    console.log(newCenter)
    console.log(event.target.value.latitude)
  }
  // handleChange = (value) => {
  //   this.setState({ mapCenter: value })
  //   this.props.setMapCenter({ value })
  //   console.log(value)
  // }

  render (props) {
    const { centerPlaces } = this.state
    // const { mapcenter } = this.props

    // console.log(this.props.centerPlaces)
    const centerPlacesJSX = centerPlaces.map(centerPlace => (
      <MenuItem key={centerPlace._id} value={centerPlace}
        // onClick={(e) => this.props.setMapCenter({ lat: centerPlace.latitude, lng: centerPlace.longitude })}
      >{centerPlace.name}</MenuItem>
    ))
    return (
      <div className="Search2-layout">
        <Button style={buttonStyle} onClick={this.handleOpen}>
           View Other Map
        </Button>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          defaultValue=''
          // value={value}
          onChange={this.handleChange}
          // onClick={(e) => this.props.setMapCenter({ lat: centerPlace.latitude, lng: centerPlace.longitude })}
        >
          {centerPlacesJSX}
        </Select>
      </div>
    )
  }
}
export default SelectFromCenterPlace

// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import InputLabel from '@material-ui/core/InputLabel'
// import MenuItem from '@material-ui/core/MenuItem'
// import FormControl from '@material-ui/core/FormControl'
// import Select from '@material-ui/core/Select'
// import Button from '@material-ui/core/Button'
//
// const useStyles = makeStyles((theme) => ({
//   button: {
//     display: 'block',
//     marginTop: theme.spacing(2)
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120
//   }
// }))
//
// export default function SelectFromCenterPlace (props) {
//   const classes = useStyles()
//   const [open, setOpen] = React.useState(false)
//   const [map, setMap] = React.useState('')
//
//   const handleChange = (event) => {
//     setMap(event.target.value)
//     console.log(event.target.value)
//     console.log(props)
//     // props.setMapCenter(event.target.value)
//   }
//
//   const handleClose = () => {
//     setOpen(false)
//   }
//
//   const handleOpen = () => {
//     setOpen(true)
//   }
//
//   return (
//     <div>
//       <Button className={classes.button} onClick={handleOpen}>
//         View Other Map
//       </Button>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="demo-controlled-open-select-label">Map</InputLabel>
//         <Select
//           labelId="demo-controlled-open-select-label"
//           id="demo-controlled-open-select"
//           open={open}
//           onClose={handleClose}
//           onOpen={handleOpen}
//           value={map}
//           onChange={handleChange}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value={10}>Ten</MenuItem>
//           <MenuItem value={20}>Twenty</MenuItem>
//           <MenuItem value={30}>Thirty</MenuItem>
//         </Select>
//       </FormControl>
//     </div>
//   )
// }
