import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import CardHeader from '@material-ui/core/CardHeader'
import EditCenterPlaceMenu from './EditCenterPlace/EditCenterPlaceMenu'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
// import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import styles from './CenterPlaceStyles'
import Typography from '@material-ui/core/Typography'

// import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

// import EditCenterPlaceMenu from './EditCenterPlaceMenu'
class CenterPlace extends Component {
  constructor (props) {
    super(props)
    this.state = {
      centerPlace: props.centerPlace,
      deleted: false,
      filtered: false,
      latitude: [],
      longitude: [],
      LatLng: '',
      mapCenter: ''
    }
  }

  handleRefresh = async () => {
    const response = await axios(`${apiUrl}/centerPlace/${this.props.match.params.id}`)
    this.setState({
      centerPlace: response.data.centerPlace
    })
  }
  // async componentDidMount () {
  //   const response = await axios(`${apiUrl}/cookbooks/${this.props.match.params.id}`)
  //
  //   this.setState({
  //     cookbook: response.data.cookbook
  //   })
  // }
  // async componentDidMount () {
  //   try {
  //     const response = await axios({
  //       url: `${apiUrl}/centerPlaces/${this.props.match.params.id}`,
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Token token=${this.props.user.token}`
  //       }
  //     })
  //     this.setState({ centerPlace: response.data.centerPlace })
  //     this.setState({ latitude: response.data.centerPlace.latitude })
  //     this.setState({ longitude: response.data.centerPlace.longitude })
  //     this.setState({ LatLng: { lat: this.state.latitude, lng: this.state.longitude } })
  //   } catch (error) {
  //   }
  // }

  handleFilter = event => {
    event.preventDefault()
    this.setState({ filtered: !this.state.filtered })
  }
  // setPlace = event => {
  //   console.log(this.state)
  //   this.props.setMapCenter(event)
  //   console.log('done')
  // }

  // handleChange = event => {
  //   const searchString = event.target.value.toLowerCase()
  //   const queryLength = searchString.length
  //   const prevQueryLength = this.state.queryLength || 0
  //   const movies = queryLength > prevQueryLength ? this.state.userMovies : this.state.movies
  //   const searchResults = movies.filter(movie => movie.name.toLowerCase().includes(searchString))
  //   this.setState({ userMovies: searchResults, queryLength: queryLength })
  // }

  // handleSubmit = event => {
  //   event.preventDefault()
  //   axios({
  //     method: 'POST',
  //     url: `${apiUrl}/movies`,
  //     headers: {
  //       'Authorization': `Token token=${this.props.user.token}`
  //     },
  //     data: {
  //       movie: {
  //         // name: this.state.movie.name,
  //         title: this.state.movie.name,
  //         description: this.state.movie.description,
  //         released: this.state.movie.released,
  //         image: this.state.movie.image,
  //         genre: this.props.match.params.id,
  //         owner: this.props.user._id
  //       }
  //     }
  //   })
  //     .then(response => {
  //       this.props.history.push(`/genres/${this.props.match.params.id}/`)
  //       this.props.alert({
  //         heading: 'Success',
  //         message: 'You created a movie'
  //       })
  //     })
  //     .catch(() => {
  //       this.props.alert({
  //         heading: 'Failed',
  //         message: 'Did not create'
  //       })
  //     })
  //     .catch(err => this.setState({ error: err.message }))
  // }

  handleDelete = () => {
    console.log(this.props)
    event.preventDefault()
    axios.delete(`${apiUrl}/centerPlaces/${this.props.id}`,
      {
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        data: {
          centerPlace: this.state.centerPlace
        }
      })
      .then(() => this.setState({ deleted: true }))
      .then(() => this.props.history.push('/centerPlaces'))
  }
  editGenre = () => {
    console.log('edit eventually')
  }

  render () {
    const { centerPlace, deleted } = this.state
    const { mapSettings, classes } = this.props
    if (deleted) {
      return <Redirect to={
        {
          pathname: this.props.location.pathname
        }
      }/>
    }
    if (centerPlace) {
      return (
        <Card
          variant="outlined"
          // if this centerPlace matches the map id, apply style to differentiate
          className={ classNames(classes.lightClass, {
            [classes.darkClass]: mapSettings._id === centerPlace._id
          })}
          // onClick={this.handleClick}
          // onClick={(e) => this.handleClick(centerPlace)}
          // onClick={(e) => this.props.setMapCenter({ lat: centerPlace.latitude, lng: centerPlace.longitude })}
        >
          <CardActionArea style={{ color: 'inherit', textDecoration: 'none' }} >
            <CardHeader
              style={{ padding: '12px 16px 2px' }}
              action={
                <EditCenterPlaceMenu id={this.state.centerPlace._id} centerPlace={this.state.centerPlace} user={this.props.user} deleteCenterPlace={this.handleDelete} />
              }
              title={centerPlace.name}
            />
            <CardContent style={{ padding: '2px 18px' }}>
              <Typography>
                <span style={{ color: 'orange' }}>
                  {centerPlace.name} {' '}
                </span>
                <span style={{ color: 'grey' }}>
                  {centerPlace.name} {' '}
                </span>
                <span style={{ color: 'green' }}>
                  {centerPlace.name} {' '}
                </span>
                <span style={{ color: 'lightgrey' }}>
                  {centerPlace.name}
                </span>
              </Typography>
            </CardContent>
            <CardActions style={{ padding: '0px 12px 4px' }}>
              <Tooltip title="edit">
                <IconButton aria-label="edit" size="small" variant="contained" disableRipple>
                  <EditIcon fontSize="small"/>
                </IconButton>
              </Tooltip>
              <Button onClick={(e) => this.props.handleClick(centerPlace)}> Set Map Center</Button>
            </CardActions>
          </CardActionArea>
        </Card>
      )
    }
    return (
      <p>no centerPlace found</p>
    )
  }
}
// if (centerPlace) {
//   return (
//     <div className="">
//       { centerPlace && (
//         <div>
//           <Card className="card-style"
//             // onClick={this.handleClick}
//             // onClick={(e) => this.handleClick(centerPlace)}
//             // onClick={(e) => this.props.setMapCenter({ lat: centerPlace.latitude, lng: centerPlace.longitude })}
//           >
//             <CardActionArea style={{ color: 'inherit', textDecoration: 'none' }} >
//               <CardHeader
//                 action={
//                   <EditCenterPlaceMenu id={this.state.centerPlace._id} centerPlace={this.state.centerPlace} user={this.props.user} deleteCenterPlace={this.handleDelete} />
//                 }
//                 title={centerPlace.name}
//                 subheader={`last updated: ${centerPlace.updatedAt.split('T').shift()}`}
//               />
//               <CardActions>
//                 <Tooltip title="add to favorites">
//                   <IconButton aria-label="add to favorites" variant="contained" disableRipple>
//                     <FavoriteIcon />
//                   </IconButton>
//                 </Tooltip>
//                 <IconButton aria-label="edit" disableRipple>
//                   <EditIcon />
//                 </IconButton>
//                 <Button onClick={(e) => this.props.handleClick(centerPlace)} > Set Map Center</Button>
//               </CardActions>
//             </CardActionArea>
//           </Card>
//         </div>
//       )}
//     </div>
//   )
// }

// <Card className="card-style" variant="outlined">
//   <CardContent>
//     <div>
//       <CardHeader
//         action={
//           <EditCenterPlaceMenu id={this.state.centerPlace._id} centerPlace={this.state.centerPlace} user={this.props.user} deleteCenterPlace={this.handleDelete} />
//         }
//         title={centerPlace.name}
//         subheader={`last updated: ${centerPlace.updatedAt.split('T').shift()}`}
//       />
//     </div>
//     <div className="row">
//       <h6 > {this.state.centerPlace.latitude} </h6>
//       <h6 > {this.state.centerPlace.longitude} </h6>
//       <h6 > {this.state.latitude} </h6>
//       <h6 > {this.state.longitude} </h6>
//     </div>
//   </CardContent>
//   <CardActions>
//     <IconButton href={'#centerPlaces/'} aria-label="Back">
//       <ArrowBackIosIcon />
//     </IconButton>
//     <Button onClick={(e) => this.props.handleClick(centerPlace)} > Set Map Center</Button>
//   </CardActions>
// </Card>
export default withRouter((withStyles(styles)(CenterPlace)))
// export default withStyles(styles, { withTheme: true })(CenterPlace)

// export default withRouter(CenterPlace)
