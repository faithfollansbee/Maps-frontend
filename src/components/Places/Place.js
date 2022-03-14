import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Redirect, Link } from 'react-router-dom'
// import Card from 'react-bootstrap/Card'
// import CardDeck from 'react-bootstrap/CardDeck'
import apiUrl from '../../apiConfig'
// import Button from 'react-bootstrap/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
// import AddPlaceDialog from './AddPlaceDialog'
import EditPlaceMenu from './EditPlace/EditPlaceMenu'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import placeTypes from '../App/PlaceTypes'

const style = {
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
        <div style={style}>
          { place && (
            <ListItem button key={place._id}>
              <ListItemIcon>
                {placeTypes.map((placeType) => {
                  if (placeType.placeType === place.type) {
                    return <h4> {placeType.emoji} </h4>
                  }
                })}
              </ListItemIcon>
              <ListItemText>
                {place.name}
              </ListItemText>
              <Link to={`/places/${place._id}`} href={`/places/${place._id}`}>
                <Tooltip title="More">
                  <KeyboardArrowRightIcon />
                </Tooltip>
              </Link>
              <EditPlaceMenu user={this.props.user} deletePlace={this.handleDelete} title="more" {...place} place={place} type={place.type} id={place._id} name={place.name} />
            </ListItem>
          )}
        </div>
      )
    }
}

export default withRouter(Place)
// <div style={style}>
//   { place && (
//     <Fragment>
//       <CardDeck>
//         <Card>
//           <Card.Body>
//             <Card.Title>{place.name}</Card.Title>
//             <Card.Subtitle>{place.type}</Card.Subtitle>
//             <Card.Text>
//             </Card.Text>
//           </Card.Body>
//           <Card.Footer>
//             <div className="cardLink">
//               <Link to="/places" className="cardLink">Back to all</Link>
//             </div>
//             <div className="cardButton">
//               <Button onClick={this.deleteplace} className="cardButton" variant="dark" type="submit">
//                 Delete this place
//               </Button>
//             </div>
//           </Card.Footer>
//         </Card>
//       </CardDeck>
//     </Fragment>
//   )}
// </div>
