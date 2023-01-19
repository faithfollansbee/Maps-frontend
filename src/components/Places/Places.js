import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import List from '@material-ui/core/List'
import AddPlaceDialog from './AddPlace/AddPlaceDialog'
import Place from './Place'
import Skeleton from '@material-ui/lab/Skeleton'
import placeTypes from '../App/PlaceTypes'

const skeletonPlaceStyle = {
  height: '72px',
  marginTop: '2px',
  opacity: '.9'
}
const headingStyle = {
  color: '#ffffff',
  // fontSize: '40px',
  margin: 'auto',
  justifyContent: 'center',
  textAlign: 'center'
}
const textStyle = {
  color: '#ffffff',
  // color: 'rgba(255, 255, 255, 0.5)',
  margin: 'auto',
  opacity: '.6',
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
      placeTypes: placeTypes,
      loading: true
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
      this.setState({ places: response.data.places, isLoading: false, loading: false })
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
      // .then(response => {
      //   this.props.history.push(`/places/${response.data.place._id}`)
      // })
      // .then(response => {
      //   this.props.history.push('/places')
      // })
  }
  editPlace = () => {
    console.log('edit eventually')
  }

  render (props) {
    const { places, loading } = this.state

    const placesJsx = places.map(place => (
      <Place place={place} key={place._id} user={this.props.user} id={place._id} name={place.name} type={place.type} handleDelete={this.handleDelete} />
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

    // if (this.state.isLoading) {
    //   return (
    //     <div>
    //       <ListItem><Skeleton variant="rect"/></ListItem>
    //       <ListItem style={{ marginTop: '2px', height: '20px' }}><Skeleton variant="rect" /></ListItem>
    //       <ListItem style={{ marginTop: '2px', height: '20px' }}><Skeleton variant="rect" /></ListItem>
    //       <ListItem style={{ marginTop: '2px', height: '20px' }}><Skeleton variant="rect" /></ListItem>
    //       <ListItem style={{ marginTop: '2px', height: '20px' }}><Skeleton variant="rect" /></ListItem>
    //       <ListItem style={{ marginTop: '2px', height: '20px' }}><Skeleton variant="rect" /></ListItem>
    //       <Skeleton width="100%" variant="rect" />
    //       <Skeleton width="100%" variant="rect" />
    //       <Skeleton width="100%" variant="rect" />
    //       <ListItem><Skeleton variant="rect"/></ListItem>
    //     </div>
    //   )
    // }
    // console.log(this.state)
    return (
      <div className="Search2-layout">
        <Fragment>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={headingStyle}>Saved Places</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <AddPlaceDialog user={this.props.user} />
          </div>
          <br/>
          <List>
            { loading ? (<div>
              <Skeleton style={skeletonPlaceStyle} animation={false} variant="rect" />
              <Skeleton style={skeletonPlaceStyle} animation="wave" variant="rect" />
              <Skeleton style={skeletonPlaceStyle} animation="wave" variant="rect" />
              <Skeleton style={skeletonPlaceStyle} animation="wave" variant="rect" />
              <Skeleton style={skeletonPlaceStyle} animation="wave" variant="rect" />
              <Skeleton style={skeletonPlaceStyle} animation="wave" variant="rect" />
              <Skeleton style={skeletonPlaceStyle} animation="wave" variant="rect" />
            </div>)
              : <div> { this.state.places.length === 0 ? (
                <div style={textStyle}>You haven&apos;t saved any places yet! Get started here</div>)
                : (placesJsx)} </div>}
          </List>
        </Fragment>
        <br/>
      </div>
    )
  }
}
// { this.state.places.length === 0 ? (<div>no places found</div>)
//   : (placesJsx)}

export default Places
