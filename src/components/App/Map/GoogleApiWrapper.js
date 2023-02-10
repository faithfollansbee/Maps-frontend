import React from 'react'
import { GoogleApiWrapper } from 'google-maps-react'

// ...

export class Container extends React.Component {}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_API_KEY}`
})(Container)

// export default GoogleApiWrapper({
//   apiKey: `${process.env.REACT_APP_API_KEY}`
// })(Container)

// apiKey=`${process.env.REACT_APP_API_KEY}`
