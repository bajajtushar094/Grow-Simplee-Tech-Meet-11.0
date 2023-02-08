import React from 'react'
import mapboxgl from 'mapbox-gl';
import { useRef, useEffect, useState } from 'react';

const MapBox = (markerLocations=[]) => {
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX
const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);
useEffect(()=>{
  if(markerLocations.length!=0){
    var sum_lat = 0, sum_long = 0
    for(var i=0; i<markerLocations.length; i+=1){
      sum_lat = sum_lat+parseFloat(markerLocations[i][0])
      sum_long = sum_long+ parseFloat(markerLocations[i][0])
    }
    var avg_lat = sum_lat/markerLocations.length 
    var avg_long = sum_long/markerLocations.length 
    setLat(avg_lat)
    setLng(avg_long)
  }
}, [])

useEffect(() => {
    
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom
    });
    

    for(var i =0;i<markerLocations.length;i+=1){
      var coor = [parseFloat(markerLocations[i][1]), parseFloat(markerLocations[i][2])]
      console.log("Coordinates: ", coor)
      new mapboxgl.Marker().setLngLat(coor).addTo(map)
    }

    });
  return (
    <div ref={mapContainer} className="h-[300px]" />
  )
}

export default MapBox