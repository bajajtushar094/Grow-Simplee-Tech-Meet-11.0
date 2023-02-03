import React from 'react'
import mapboxgl from 'mapbox-gl';
import { useRef, useEffect, useState } from 'react';

const MapBox = () => {
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX
const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);
useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom
    });
    });
  return (
    <div ref={mapContainer} className="h-[650px]" />
  )
}

export default MapBox