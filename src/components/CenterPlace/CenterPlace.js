import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import CardHeader from '@material-ui/core/CardHeader'
// import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

// import EditCenterPlaceMenu from './EditCenterPlaceMenu'

class CenterPlace extends React.Component {
  state = {
    centerPlace: '',
    deleted: false,
    latitude: [],
    longitude: [],
    LatLng: '',
    // userRecipes: [],
    filtered: false
    // addingMovie: false
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
  async componentDidMount () {
    try {
      const response = await axios({
        url: `${apiUrl}/centerPlaces/${this.props.match.params.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ centerPlace: response.data.centerPlace })
      this.setState({ latitude: response.data.centerPlace.latitude })
      this.setState({ longitude: response.data.centerPlace.longitude })
      this.setState({ LatLng: { lat: this.state.latitude, lng: this.state.longitude } })
    } catch (error) {
    }
  }

  handleFilter = event => {
    event.preventDefault()
    this.setState({ filtered: !this.state.filtered })
  }
  setPlace = event => {
    console.log(this.state)
    // geocodeByAddress(location.description)
    //   .then(results => getLatLng(results[0]))
    //   .then(LatLng => {
    //     this.setState({
    //       latitude: LatLng.lat,
    //       longitude: LatLng.lng
    //     })
    //     this.setState({ LatLng: LatLng })
    //     console.log(this.state.latitude)
    //     console.log(this.state.longitude)
    //     console.log('location', location)
    //     this.props.setMapCenter(this.state.LatLng)
    //   })
    // this.setState({ LatLng: `${this.state.latitude}${this.state.longitude}` })
    // this.setState({ LatLng: { lat: this.state.latitude, lng: this.state.longitude } })

    this.props.setMapCenter(this.state.LatLng)
    console.log('done')
  }

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
    event.preventDefault()
    axios.delete(`${apiUrl}/centerPlaces/${this.props.match.params.id}`,
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
    console.log(this.state)
    // console.log('genre movies', this.state.genre.movies)
    // console.log('genre length', this.state.genre)
    // console.log('number of movies', this.state.movies.length)
    // console.log(Object.keys(this.state.movies))

    const { centerPlace } = this.state
    if (centerPlace) {
      // console.log(genre.movies[0].released.substring(5).split('-').concat(genre.movies[0].released.substring(0, 4)).join('/'))
      // console.log(genre.updatedAt.split('T', 1)[0])
      // console.log(genre.updatedAt.substring(0, genre.updatedAt.indexOf('T')))
      // const deletebutton = (
      //   <Fragment>
      //     <IconButton onClick={this.handleDelete} aria-label="Delete">
      //       <DeleteIcon />
      //     </IconButton>
      //   </Fragment>
      // )
      return (
        <div className="layout-style my-5">
          { centerPlace && (
            <div>
              <Card onClick={this.setPlace} className="card-style" variant="outlined">
                <CardContent>
                  <div>
                    <CardHeader
                      // variant="h5"
                      // component="h3"
                      // subheader={movie.released.substring(5).split('-').concat(movie.released.substring(0, 4)).join('/')}
                      // subheader={genre.updatedAt.substring(5).split('-').concat(genre.updatedAt.substring(0, 4)).join('/')}
                      // action={
                      //   <EditCenterPlaceMenu id={this.state.centerPlace._id} centerPlace={this.state.centerPlace} user={this.props.user} deleteCenterPlace={this.handleDelete} />
                      // }
                      title={centerPlace.name}
                    />
                  </div>
                  <div className="row">
                    <h6 > {this.state.centerPlace.latitude} </h6>
                    <h6 > {this.state.centerPlace.longitude} </h6>
                    <h6 > {this.state.latitude} </h6>
                    <h6 > {this.state.longitude} </h6>
                  </div>
                </CardContent>
                <CardActions>
                  <IconButton href={'#centerPlaces/'} aria-label="Back">
                    <ArrowBackIosIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          )}
        </div>
      )
    }
    return (
      <p>no centerPlace found</p>
    )
  }
}

export default withRouter(CenterPlace)
