import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
// import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import CardContent from '@material-ui/core/CardContent'
// import CardHeader from '@material-ui/core/CardHeader'
import EditCenterPlaceMenu from './EditCenterPlace/EditCenterPlaceMenu'
import Tooltip from '@material-ui/core/Tooltip'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import styles from './CenterPlaceStyles'
// import Typography from '@material-ui/core/Typography'
import GradeIcon from '@material-ui/icons/Grade'
// import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Skeleton from '@material-ui/lab/Skeleton'

const style = {
  marginTop: '1px',
  opacity: '.9'
}
class UserMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      centerPlace: props.centerPlace,
      deleted: false,
      filtered: false,
      latitude: [],
      longitude: [],
      LatLng: '',
      mapCenter: '',
      loading: props.loading
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
  // if this centerPlace matches the map id, apply style to differentiate
  // className={ classNames(classes.lightClass, {
  //   [classes.darkClass]: mapSettings._id === centerPlace._id
  // })}

  render () {
    const { centerPlace, deleted } = this.state
    const { mapSettings, classes, loading } = this.props
    // const { loading = false } = props;

    if (deleted) {
      return <Redirect to={
        {
          pathname: this.props.location.pathname
        }
      }/>
    }
    // if (centerPlace) {
    return (
      <Paper style={style}>
        {loading ? (
          <Skeleton width="100%" style={{ height: '30px' }}>
            <ListItem>Henlo </ListItem>
          </Skeleton>
        ) : (
          <ListItem button key={centerPlace._id} disableRipple variant="outlined">
            <Tooltip title="use this map">
              <ListItemAvatar className={ classNames(classes.lightClass, {
                [classes.darkClass]: mapSettings._id === centerPlace._id
              })}>
                <GradeIcon onClick={(e) => this.props.handleClick(centerPlace)}/>
              </ListItemAvatar>
            </Tooltip>
            <ListItemText primary={centerPlace.name}/>

            <Tooltip title="use this map">
              <IconButton disableRipple className={ classNames(classes.lightClass, {
                [classes.darkClass]: mapSettings._id === centerPlace._id
              })}>
                <GradeIcon fontSize="medium" onClick={(e) => this.props.handleClick(centerPlace)}/>
              </IconButton>
            </Tooltip>

            <ListItemSecondaryAction className={ classNames(classes.lightClass, {
              [classes.darkClass]: mapSettings._id === centerPlace._id
            })}>
              <EditCenterPlaceMenu id={this.state.centerPlace._id} clickStarIcon={this.props.handleClick} centerPlace={this.state.centerPlace} user={this.props.user} deleteCenterPlace={this.handleDelete} />
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </Paper>
    )
    // }
    // return (
    //   <p>no centerPlace found</p>
    // )
  }
}
// <Card
//   variant="outlined"
// >
//   <CardActionArea style={{ textDecoration: 'none' }}>
//     <CardHeader
//       id="CardHeader"
//       style={{ padding: '12px 16px 2px' }}
//       action={
//         <EditCenterPlaceMenu id={this.state.centerPlace._id} clickStarIcon={this.props.handleClick} centerPlace={this.state.centerPlace} user={this.props.user} deleteCenterPlace={this.handleDelete} />
//       }
//       title={centerPlace.name}
//     />
//     <CardActions style={{ padding: '0px 12px 4px' }} className={ classNames(classes.lightClass, {
//       [classes.darkClass]: mapSettings._id === centerPlace._id
//     })}>
//       <Tooltip title="use this map">
//         <GradeIcon fontSize="small" onClick={(e) => this.props.handleClick(centerPlace)}/>
//       </Tooltip>
//     </CardActions>
//   </CardActionArea>
// </Card>
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
export default withRouter((withStyles(styles)(UserMap)))
// export default withStyles(styles, { withTheme: true })(CenterPlace)

// export default withRouter(CenterPlace)
