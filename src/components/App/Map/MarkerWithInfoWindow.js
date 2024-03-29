import React from 'react'
import placeTypes from '../PlaceTypes'
import CloseIcon from '@material-ui/icons/Close'
// import IconButton from '@material-ui/core/IconButton'
import './MarkerStyle.css'

const markerStyle = {
  fontFamily: 'sans-serif'
  // color: 'red',
  // background: 'grey',
  // padding: '15px 10px',
  // display: 'inline-flex',
  // textAlign: 'center',
  // alignItems: 'center',
  // justifyContent: 'center',
  // borderRadius: '100%',
  // transform: 'translate(-50%, -50%)'
}
const markerStyleHover = {
  // border: '1px solid white',
  // borderRadius: '50%',
  // height: 10,
  // width: 10,
  // backgroundColor: 'red',
  // cursor: 'pointer',
  // zIndex: 10
}

class MarkerWithInfoWindow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.onToggleOpen = this.onToggleOpen.bind(this)
  }

  onToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render (props) {
    // console.log(this.props)
    // const style = this.props.$hover ? markerStyleHover : markerStyle
    const style = this.state.isOpen ? markerStyleHover : markerStyle

    return (
      <div style={style} onClick={this.onToggleOpen}>
        {placeTypes.map((placeType) => {
          if (placeType.placeType === this.props.type) {
            return <div key={placeType.id}> <img src={placeType.img} style={{ height: '40px' }}/></div>
          }
        })}
        {this.state.isOpen &&
          <InfoWindow place={this.props.place} />
        }
      </div>
    )
  }
}
// <div style={style} onClick={this.onToggleOpen}>
//   <h5 key={this.props.id}>{this.props.emoji}</h5>
//   {this.state.isOpen &&
//     <InfoWindow place={this.props.place} />
//   }
// </div>
// <div style={style} onClick={this.onToggleOpen}>
//   {placeTypes.map((placeType) => {
//     if (placeType.placeType === this.props.type) {
//       return <div key={placeType.id}> <img src={placeType.img} /></div>
//     }
//   })}
//   {this.state.isOpen &&
//     <InfoWindow place={this.props.place} />
//   }
// </div>
// <div onCloseClick={this.onToggleOpen}>
//   <h5>{this.props.name}</h5>
// </div>}
const InfoWindow = (props) => {
  const { place } = props

  // const infoWindowStyle = {
  // position: 'relative',
  // bottom: 150,
  // left: '-45px',
  // width: 220,
  // backgroundColor: 'white',
  // boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
  // padding: 10,
  // fontSize: 14,
  // zIndex: 100
  // }
  // const infoWindowStyle2 = {
  //   paddingRight: '0px',
  //   paddingBottom: '0px',
  //   position: 'absolute',
  //   boxSizing: 'border-box',
  //   overflow: 'hidden',
  //   top: 0,
  //   left: 0,
  //   transform: 'translate3d(-50%,-100%,0)',
  //   backgroundColor: 'white',
  //   borderRadius: '8px',
  //   padding: '12px',
  //   boxShadw: '0 2px 7px 1px rgb(0 0 0 /30%)',
  //   fontWeight: '300',
  //   fontSize: '13px'
  // }
  console.log(place)
  return (
    <div className="InfoWindow" >
      <CloseIcon className="xButton"/>
      <div style={{ fontSize: 16 }}>
        {place.name}
      </div>
      <div style={{ fontSize: 13 }}>
        <span style={{ color: 'lightgrey' }}>
          {place.longName}
          {' '}
        </span>
      </div>
      <span style={{ color: 'orange' }}>
        {place.type}
      </span>
      <span style={{ color: 'green' }}>
        {place.type}
      </span>
      <span style={{ color: 'purple' }}>
        {place.type}
      </span>
      <span style={{ color: 'lightgreen' }}>
        {place.type}
      </span>
    </div>
  )
}
// <Marker
//   key={this.props.key}
//   position={this.props.position}
//   name={this.props.name}
//   icon={this.props.icon}
//   onClick={this.onToggleOpen}>
// </Marker>
// {this.state.isOpen &&
//     <InfoWindow visible={this.state.isOpen}
//       marker={this.props.place}
//       onCloseClick={this.onToggleOpen}>
//       <h3>{this.props.place.name}</h3>
//     </InfoWindow>}
// export default GoogleApiWrapper({
//   apiKey: process.env.REACT_APP_API_KEY
// })(MarkerWithInfoWindow)

export default MarkerWithInfoWindow
