import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import AddMapDialog from './AddMap/AddMapDialog'
import CenterPlace from './CenterPlace'
import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
import Skeleton from '@material-ui/lab/Skeleton'

const titleStyle = {
  color: '#ffffff',
  margin: 'auto',
  textAlign: 'center'
}
const skeletonPlaceStyle = {
  marginTop: '2px',
  height: '64px',
  opacity: '.9'
}
const textStyle = {
  color: '#ffffff',
  margin: 'auto',
  // margin: '10px',
  opacity: '.6',
  textAlign: 'center'
}

class CenterPlaces extends Component {
  constructor (props) {
    super(props)

    this.state = {
      centerPlaces: [],
      isLoading: true,
      filtered: false,
      mapCenter: '',
      mapSettings: props.mapSettings,
      centerPlace: '',
      map: '',
      loading: true
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
      this.setState({ centerPlaces: response.data.centerPlaces, isLoading: false, loading: false })
    } catch (error) {
    }
  }
  handleDelete = (props) => {
    event.preventDefault()
    axios.delete(`${apiUrl}/centerPlaces/${this.props.centerPlace.id}`,
      {
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        data: {
          centerPlace: this.props.centerPlace
        }
      })
      .then(() => this.setState({ deleted: true }))
      // .then(() => this.props.history.push('/saved'))
      // .then(() => this.props.history.push('/genres'))
      // .then(response => {
      //   this.props.history.goBack()
      // })
  }

  handleClick = (e) => {
    this.props.setMapCenter(e)
    // const newCenter = { lat: event.latitude, lng: e.longitude }
    // const centerObj = { ...e }

    this.setState({ mapCenter: e })
    // console.log(newCenter)
    // console.log(centerObj)
  }

  render (props) {
    const { centerPlaces, loading } = this.state
    // console.log('re render, centerPlaces', centerPlaces)
    const centerPlacesJSX = centerPlaces.map(centerPlace => (
      <CenterPlace loading={false} mapSettings={this.props.mapSettings} key={centerPlace._id} centerPlace={centerPlace} user={this.props.user} name={centerPlace.name} id={centerPlace._id} handleClick={this.handleClick} setMapCenter={this.props.setMapCenter}/>
    ))
    return (
      <div className="Search2-layout">
        <Fragment>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={titleStyle}>Saved Maps</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <AddMapDialog user={this.props.user} />
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
              : <div> { this.state.centerPlaces.length === 0 ? (
                <div style={textStyle}>You haven&apos;t saved any maps yet! Get started here.</div>)
                : (centerPlacesJSX)} </div>}
          </List>
        </Fragment>
        <br/>
      </div>
    )
  }
}
// {this.state.centerPlaces.length
//   ? centerPlacesJSX
//   : (
//     <div> <ListItem>No maps found</ListItem>
//       <Skeleton style={skeletonPlaceStyle} animation="wave" variant="rect" />
//       <Skeleton style={skeletonPlaceStyle} animation="wave" variant="rect" />
//       <Skeleton style={skeletonPlaceStyle} animation="wave" variant="rect" />
//       <Skeleton style={skeletonPlaceStyle} animation="wave" variant="rect" />
//       <Skeleton style={skeletonPlaceStyle} animation="wave" variant="rect" />
//       <br/>
//       <Skeleton style={skeletonPlaceStyle} animation={false} variant="rect" />
//     </div>
//   )
// }
export default CenterPlaces
// <Skeleton variant="circle" width={40} height={40}><Avatar /></Skeleton>

// <div>
//   { centerPlaces.map(centerPlace => (
//     <Card key={centerPlace._id} className="card-style"
//       value={centerPlace._id}
//       // onClick={this.handleClick}
//       onClick={(e) => this.handleClick(centerPlace)}
//       // onClick={(e) => this.props.setMapCenter({ lat: centerPlace.latitude, lng: centerPlace.longitude })}
//     >
//       <CardActionArea style={{ color: 'inherit', textDecoration: 'none' }} >
//         <CardHeader
//           action={
//             <EditCenterPlaceMenu user={this.props.user} deleteCenterPlace={this.handleDelete} title="more" {...centerPlace} centerPlace={centerPlace} id={centerPlace._id} name={centerPlace.name} />
//           }
//           title={centerPlace.name}
//           subheader={`last updated: ${centerPlace.updatedAt.split('T').shift()}`}
//         />
//         <CardActions>
//           <Tooltip title="add to favorites">
//             <IconButton aria-label="add to favorites" variant="contained" disableRipple>
//               <FavoriteIcon />
//             </IconButton>
//           </Tooltip>
//           <IconButton aria-label="edit" disableRipple>
//             <EditIcon />
//           </IconButton>
//         </CardActions>
//       </CardActionArea>
//     </Card>
//   ))}
// </div>
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
