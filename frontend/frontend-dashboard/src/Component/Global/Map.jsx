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
        <ReactMap {...viewport} mapboxApiAccessToke='pk.eyJ1IjoidmlnaG5lc2gzODAyIiwiYSI6ImNsY2h3M3p5cDBoc28zcHM1MnBiMXVhMDkifQ.6YjcmePA1iBnTocSx-Cysw'>
        
        </ReactMap>
    </div>
  )
}

export default Map