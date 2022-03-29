import React from 'react'
import { GoogleApiWrapper } from 'google-maps-react'

// ...

export class Container extends React.Component {}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_API_KEY}`
})(Container)

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyBOXkzxWxurGgpeo_KsLSs4LczoSS0InN8'
// })(Container)

// apiKey='AIzaSyBOXkzxWxurGgpeo_KsLSs4LczoSS0InN8'
