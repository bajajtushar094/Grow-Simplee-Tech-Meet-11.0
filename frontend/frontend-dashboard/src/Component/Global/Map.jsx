import React from 'react'
import ReactMap from 'react-map-gl'
import { useState } from 'react'

function Map() {
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        width: '100vw',
        height: '100vh',
        zoom: 8
    })
  return (
    <div>
        <ReactMap {...viewport} mapboxApiAccessToke='pk.eyJ1Ijoic2NvdGhpcyIsImEiOiJjaWp1Y2ltYmUwMDBicmJrdDQ4ZDBkaGN4In0.sbihZCZJ56-fsFNKHXF8YQ'>

        </ReactMap>
    </div>
  )
}

export default Map