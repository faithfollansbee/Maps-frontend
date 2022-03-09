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
  expanded: {}
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
      filtered: false
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

    this.setState({ userRecipes: searchResults, queryLength: queryLength })
  }

  render (props) {
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
          <Typography>{place.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
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

    if (this.state.isLoading) {
      return (
        <div className="text-center">
        </div>
      )
    }
    return (
      <div className="Search2-layout">
        <h1 style={headingStyle}>Saved Places</h1>
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
