import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import { Link } from 'react-router-dom'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import ListItemText from '@material-ui/core/ListItemText'
// import Tooltip from '@material-ui/core/Tooltip'
// import EditPlaceMenu from './EditPlaceMenu'
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import AddPlaceDialog from './AddPlace/AddPlaceDialog'
// import EditPlaceDialog from './EditPlaceDialog'
// import Divider from '@material-ui/core/Divider'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
import Place from './Place'

import placeTypes from '../App/PlaceTypes'

const style = {
  // paddingBottom: '0'
  // margin: 50
}
const headingStyle = {
  color: 'black',
  fontSize: '40px',
  margin: 'auto',
  textAlign: 'center'
}
// function ListItemLink (props) {
//   return <ListItem button component="a" {...props} />
// }
class Places extends Component {
  constructor (props) {
    super(props)

    this.state = {
      places: [],
      isLoading: true,
      userPlaces: [],
      filtered: false,
      placeTypes: placeTypes
    }
  }

  async componentDidMount () {
    try {
      const response = await axios({
        url: `${apiUrl}/places`,
        method: 'GET',
        headers: {
          Authorization: `Token token=${this.props.user.token}`
        }
      })
      this.setState({ places: response.data.places, isLoading: false })
      this.setState({ userPlaces: response.data.places })
    } catch (error) {
    }
  }

  handleFilter = event => {
    event.preventDefault()
    this.setState({ filtered: !this.state.filtered })
  }
  handleChange = event => {
    const searchString = event.target.value.toLowerCase()
    const queryLength = searchString.length
    const prevQueryLength = this.state.queryLength || 0
    const places = queryLength > prevQueryLength ? this.state.userPlaces : this.state.places

    const searchResults = places.filter(place => place.name.toLowerCase().includes(searchString))

    this.setState({ userPlaces: searchResults, queryLength: queryLength })
  }
  handleDelete = () => {
    event.preventDefault()
    // console.log(id)
    axios.delete(`${apiUrl}/places/${this.props.place.id}`,
      {
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        data: {
          place: this.state.place
        }
      })
      .then(() => this.setState({ deleted: true }))
      // .then(() => this.props.history.push('/genres'))
      .then(response => {
        this.props.history.goBack()
      })
  }
  editPlace = () => {
    console.log('edit eventually')
  }

  render (props) {
    const { places } = this.state

    const placesJsx = places.map(place => (
      <Place place={place} key={place._id} user={this.props.user} id={place._id} name={place.name} type={place.type} />
    ))
    // const placesJsx = this.state.places.map(place => (
    //   <ListItem button key={place._id}>
    //     <ListItemIcon>
    //       {placeTypes.map((placeType) => {
    //         if (placeType.placeType === place.type) {
    //           return <h5>{placeType.emoji}</h5>
    //         }
    //       })}
    //     </ListItemIcon>
    //     <ListItemText>
    //       {place.name}
    //     </ListItemText>
    //     <Link to={`/places/${place._id}`} href={`/places/${place._id}`}>
    //       <Tooltip title="More">
    //         <KeyboardArrowRightIcon />
    //       </Tooltip>
    //     </Link>
    //     <EditPlaceMenu deletePlace={this.handleDelete} title="more" {...place} place={place} type={place.type} id={place._id} name={place.name} />
    //   </ListItem>
    // ))
    // <Link to={`/places/${place._id}`}>{place.name}</Link>

    // <ListItemLink href="/" to={`/places/${place._id}`}>{place.name}</ListItemLink>

    if (this.state.isLoading) {
      return (
        <div className="text-center">
        </div>
      )
    }
    console.log(this.state)
    return (
      <div className="Search2-layout">
        <div style={{ display: 'flex', margin: '10px', alignItems: 'center' }}>
          <h1 style={headingStyle}>Saved Places</h1>
          <AddPlaceDialog user={this.props.user} />
        </div>
        <List style={style}>
          {this.state.places.length
            ? placesJsx
            : <ListItem>No places found</ListItem>
          }
        </List>
      </div>
    )
  }
}
export default Places
