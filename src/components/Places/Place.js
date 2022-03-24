import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Redirect, Link } from 'react-router-dom'
// import Card from 'react-bootstrap/Card'
// import CardDeck from 'react-bootstrap/CardDeck'
import apiUrl from '../../apiConfig'
// import Button from 'react-bootstrap/Button'
import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
// import AddPlaceDialog from './AddPlaceDialog'
// import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import CardContent from '@material-ui/core/CardContent'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import CardHeader from '@material-ui/core/CardHeader'
import EditPlaceMenu from './EditPlace/EditPlaceMenu'
import IconButton from '@material-ui/core/IconButton'
// import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
// import Button from '@material-ui/core/Button'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
// import { purple, blue, yellow, red } from '@material-ui/core/colors'

import placeTypes from '../App/PlaceTypes'

const style = {
  marginTop: '1px',
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

  // async componentDidMount (props) {
  //   try {
  //     const response = await axios({
  //       url: `${apiUrl}/places/${this.props.match.params.id}`,
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Token token=${this.props.user.token}`
  //       }
  //     })
  //     this.setState({ place: response.data.place })
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
        .then(() => this.setState({ deleted: true }))
      // console.log('location', this.props.location)
      // console.log('history', this.props.history)
      // console.log(this.props.match.url)
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
        <Paper style={style} >
          { place && (
            <ListItem button key={place._id} variant="outlined">
              <ListItemAvatar>
                {placeTypes.map((placeType) => {
                  if (placeType.placeType === place.type) {
                    return <h4 key={placeType.id} style={{ marginLeft: '12px', marginRight: '12px', marginBottom: '0' }}> {placeType.emoji} </h4>
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
        </Paper>
      )
    }
}

export default withRouter(Place)
