import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
// import ListGroup from 'react-bootstrap/ListGroup'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import AddPlaceDialog from './AddPlaceDialog'
// import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// import EditIcon from '@material-ui/icons/Edit'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import placeTypes from '../App/PlaceTypes'

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {},
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
    color: 'red'
  },
  secondaryHeading: {
    color: 'green'
  }
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiAccordionDetails)

// const style = {
//   margin: 50
// }

const headingStyle = {
  color: 'black',
  fontSize: '40px',
  margin: 'auto',
  textAlign: 'center'
}

class AccordionPlaces extends Component {
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
    console.log('state', this.state)
    console.log('props', this.props)
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

    this.setState({ userRecipes: searchResults, queryLength: queryLength })
  }
  findEmjoji = (type) => {
    // const found = this.state.placeTypes.find(placeType => placeType === type)
    // this.state.placeTypes.find(placeType => placeType === type)
    console.log(type)
    // return found
    // console.log(placeType)
    // return placeType === type
    return this.state.placeTypes.find((placeType, index) => {
      if (placeType.id === type) {
        return <h5>{placeType.id}</h5>
      }
    })
    // return this.state.placeTypes.find(function (placeType) {
    //   return placeType === type
    // })
  }

  render (props) {
    const { placeTypes } = this.state
    let placesStatus
    if (!this.state.places.length) {
      placesStatus = (
        <div>
          <div className="noPlaces">No places added yet. get started! </div>
        </div>
      )
    }
    const placesJsx = this.state.places.map(place => (
      <Accordion key={place._id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div>
            {placeTypes.map((placeType) => {
              if (placeType.placeType === place.type) {
                return <h5>{placeType.emoji}</h5>
              }
            })}
          </div>
          <FormControlLabel
            aria-label="Edit"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<MoreVertIcon />}
            // label="I acknowledge that I should stop the click event propagation"
            title="edit"
          />
          <Typography>{place.name}</Typography>
          <Typography variant="secondary">I am an accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {placeTypes.map((placeType) => {
            if (placeType.placeType === place.type) {
              return <h5>{placeType.emoji}</h5>
            }
          })}
          <Typography>
            <br/>
            {place.latitude}{place.longitude}
            <br/>
            {place.type}
            <br/>
            <Link to={`/places/${place._id}`}>{place.name}</Link>
          </Typography>
        </AccordionDetails>
      </Accordion>
    ))
    // {placeTypes[0].emoji}

    // {find(this.findEmoji, place.type)}
    // {this.findEmoji(place.type)}
    // {placeTypes.find(placeType => placeType === place.type)}
    // {placeTypes.find((placeType) => {
    //   if (placeType.placeType === place.type) {
    //     return <h5>hi</h5>
    //   }
    // })}
    if (this.state.isLoading) {
      return (
        <div className="text-center">
        </div>
      )
    }
    return (
      <div className="Search2-layout">
        <h1 style={headingStyle}>Saved Places</h1>
        <AddPlaceDialog user={this.props.user} />
        <div>
          {this.state.places.length
            ? placesJsx
            : <div>{placesStatus}</div>
          }
        </div>
      </div>
    )
  }
}
export default AccordionPlaces
// export default withStyles(AccordionPlaces)
// export default withStyles({ withTheme: true })(AccordionPlaces)
