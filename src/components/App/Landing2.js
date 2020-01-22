import React from 'react'
import logo from '../assets/logo.png'
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchSuggestions } from './SearchSuggestions'
import useReactRouter from 'use-react-router'

function Landing2 () {
  const { history } = useReactRouter()

  function search (term, location) {
    const urlEncodedTerm = encodeURI(term)
    const urlEncodedLocation = encodeURI(location)
    history.push(`/search?find_desc=${urlEncodedTerm}&find_loc=${urlEncodedLocation}`)
  }

  return (
    <div className='landing'>
      <div className='search-area'>
        <img src={logo} className='logo' alt='logo'/>
        <SearchBar search={search} />
        <SearchSuggestions/>
      </div>
    </div>
  )
}
export default Landing2
