import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Tooltip from '@material-ui/core/Tooltip'
// import CenterPlace from './CenterPlace'
import AddCenterPlaceDialog from './AddCenterPlaceDialog'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
// import Fab from '@material-ui/core/Fab'
// import FormControl from 'react-bootstrap/FormControl'
// import Button from '@material-ui/core/Button'
// import AddIcon from '@material-ui/icons/Add'
// import Row from 'react-bootstrap/Row'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import MoreVertIcon from '@material-ui/icons/MoreVert'
// import Spinner from 'react-bootstrap/Spinner'

class CenterPlaces extends Component {
  constructor (props) {
    super(props)

    this.state = {
      centerPlaces: [],
      // userCenterPlaces: [],
      isLoading: true,
      filtered: false
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
    }
  }
  // handleSubmit = event => {
  //   event.preventDefault()
  //   axios({
  //     method: 'POST',
  //     url: `${apiUrl}/centerPlaces`,
  //     headers: {
  //       'Authorization': `Token token=${this.props.user.token}`
  //     },
  //     data: {
  //       centerPlace: {
  //         name: this.props.name,
  //         latitude: this.props.latitude,
  //         longitude: this.props.longitude
  //       }
  //     }
  //   })
  //     .then(response => {
  //       this.props.history.push('/centerPlaces')
  //     })
  //     .then(() => this.props.history.push('/centerPlaces'))
  //     .catch(err => this.setState({ error: err.message }))
  // }

  // handleFilter = event => {
  //   event.preventDefault()
  //   this.setState({ filtered: !this.state.filtered })
  // }
  // handleChange = event => {
  //   const searchString = event.target.value.toLowerCase()
  //   const queryLength = searchString.length
  //   const prevQueryLength = this.state.queryLength || 0
  //   const genres = queryLength > prevQueryLength ? this.state.userGenres : this.state.genres
  //   const searchResults = genres.filter(genre => genre.name.toLowerCase().includes(searchString))
  //   this.setState({ userGenres: searchResults, queryLength: queryLength })
  // }

  render (props) {
    const { centerPlaces } = this.state
    const centerPlacesJSX = centerPlaces.map(centerPlace => (
      <Card key={centerPlace._id} className="card-style">
        <CardActionArea href={`#/centerPlaces/${centerPlace._id}`} style={{ color: 'inherit', textDecoration: 'none' }} >
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={centerPlace.name}
          />
          <CardContent>
          </CardContent>
          <br/>
          <CardActions>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </CardActions>
        </CardActionArea>
      </Card>
    ))
    console.log(this.state)
    return (
      <div className="layout-style">
        <Fragment>
          <h2 className="title-style">Your genres</h2>
          <div>
            <div>
              <Tooltip title="New Genre">
                <span>
                  <AddCenterPlaceDialog user={this.props.user} />
                </span>
              </Tooltip>
            </div>
            <Tooltip title="Edit">
              <EditIcon />
            </Tooltip>
          </div>
          <div>
            {centerPlacesJSX}
          </div>
        </Fragment>
      </div>
    )
  }
}
export default CenterPlaces
// <IconButton aria-label="edit" href={`#centerPlaces/${centerPlace._id}/edit`}>
//   <EditIcon />
// </IconButton>
// <Fab href="#creategenre" to="/creategenre" style={fabStyle2} size="small" className='hidden-button floating waves-effect waves-light' color="grey" aria-label="add" >
//   <Tooltip title="New Genre">
//     <AddIcon />
//   </Tooltip>
// </Fab>
// <Fab style={fabStyle3} size="small" className='hidden-button floating waves-effect waves-light' color="grey" aria-label="edit" >
//   <Tooltip title="Edit">
//     <EditIcon />
//   </Tooltip>
// </Fab>
