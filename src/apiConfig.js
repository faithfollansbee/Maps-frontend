let apiUrl
const apiUrls = {
  production: 'https://maps-app-04gr.onrender.com',
  // production: 'https://agile-reaches-15888.herokuapp.com',
  development: 'http://localhost:4741'
}
// https://aqueous-atoll-85096.herokuapp.com
if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
