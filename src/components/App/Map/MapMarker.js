// import React, { Component } from 'react'
import React from 'react'
import { Marker, InfoWindow } from 'google-maps-react'
import useToggle from './useToggleState'
const MapMarker = ({ place, index, key, name, id, position, icon }) => {
  const [showWindow, toggleShowWindow] = useToggle(false)

  return (
    <Marker
      onClick={toggleShowWindow}
      place={place} name={name} position={position} id={id} key={key}
      icon={icon}
    >
      <InfoWindow
        visible={showWindow}
        marker={place}
      >
        <div>{name}</div>
      </InfoWindow>
    </Marker>
  )
}
export default MapMarker
