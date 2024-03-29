import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { withRouter, Redirect, Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import EditPlaceMenu from './EditPlace/EditPlaceMenu'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import placeTypes from '../App/PlaceTypes'

const style = {
  marginTop: '1px',
  marginBottom: '1px',
  opacity: '.9'
  // backgroundColor: 'white'
  // margin: 50
}

class Place extends Component {
  constructor (props) {
    super(props)
    this.state = {
      place: props.place,
      deleted: false,
      filtered: false
    }
  }
  // shouldComponentUpdate = (nextProps) => this.props.place.type !== nextProps.place.type
  // shouldComponentUpdate = (nextProps) => {
  //   this.props.id !== nextProps.id
  // }
  // async componentDidMount (props) {
  //   try {
  //     const response = await axios({
  //       url: `${apiUrl}/places/${this.props.match.params.id}`,
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Token token=${this.props.user.token}`
  //       }
  //     })
  //     this.setState({ place: response.data.place, loading: false })
  //     console.log(this.state.place.name)
  //   } catch (error) {
  //   }
  // }

    handleFilter = event => {
      event.preventDefault()
      this.setState({ filtered: !this.state.filtered })
    }

    handleDelete = () => {
    // event.preventDefault()
      axios.delete(`${apiUrl}/places/${this.state.place._id}`,
        {
          headers: {
            'Authorization': `Bearer ${this.props.user.token}`
          },
          data: {
            place: this.state.place
          }
        })
        // .then(() => this.setState({ deleted: true }))
      // console.log('location', this.props.location)
      // console.log('history', this.props.history)
      // console.log(this.props.match.url)
        // .then(response => {
        //   this.props.history.push(`/places/${response.data.place._id}`)
        // })
        .then(() => this.setState({ deleted: true }))
        // .then(response => {
        //   this.props.history.push('/places')
        // })
        .then(() => this.props.history.push('/places'))
    }

    render (props) {
      const { place, deleted } = this.state

      if (deleted) {
        return <Redirect to={
          {
            pathname: this.props.location.pathname
          }
        }/>
      }

      return (
        <Paper style={style}>
          <ListItem button key={place._id} disableRipple variant="outlined">
            <ListItemAvatar>
              {placeTypes.map((placeType) => {
                if (placeType.placeType === place.type) {
                  return <Fragment key={placeType.id}>
                    <h4 key={placeType.id} style={{ marginRight: '12px', marginBottom: '0' }}><img src={placeType.img} style={{ height: '37px' }} /></h4>
                  </Fragment>
                }
              })}
            </ListItemAvatar>
            <ListItemText primary={place.name} secondary={place.type}/>

            <Link to={`/places/${place._id}`} href={`/places/${place._id}`}>
              <Tooltip title="More">
                <IconButton disableRipple>
                  <KeyboardArrowRightIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            </Link>
            <ListItemSecondaryAction>
              <EditPlaceMenu user={this.props.user} deletePlace={this.handleDelete} title="more" {...place} place={place} type={place.type} id={place._id} name={place.name} />
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      )
    }
}

export default withRouter(Place)
// <img src={placeType.img} style={{ transform: 'scale(0.8)' }} />
/* <Paper style={style}>
    { place && (
      <ListItem button key={place._id} disableRipple variant="outlined">
        <ListItemAvatar>
          {placeTypes.map((placeType) => {
            if (placeType.placeType === place.type) {
              return <Fragment>
                <h4 key={placeType.id} style={{ marginRight: '12px', marginBottom: '0' }}><img src={placeType.img} style={{ height: '37px' }} /></h4>
              </Fragment>
            }
          })}
        </ListItemAvatar>
        <ListItemText primary={place.name} secondary={place.type}/>

        <Link to={`/places/${place._id}`} href={`/places/${place._id}`}>
          <Tooltip title="More">
            <IconButton disableRipple>
              <KeyboardArrowRightIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Link>
        <ListItemSecondaryAction>
          <EditPlaceMenu user={this.props.user} deletePlace={this.handleDelete} title="more" {...place} place={place} type={place.type} id={place._id} name={place.name} />
        </ListItemSecondaryAction>
      </ListItem>
    )}
  </Paper> */
