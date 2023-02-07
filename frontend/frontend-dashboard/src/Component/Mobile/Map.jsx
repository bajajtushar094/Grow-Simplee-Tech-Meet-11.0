import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import * as L from "leaflet"
import RoutineMachine from "./RoutineMachine";
import { useState } from "react";
import delivery from './delivery.svg'
import Pins from './Pins.svg'
import Mapmarker from "../Global/Marker/Mapmarker";
import ReactDOMServer from 'react-dom/server';
import R from './R.svg';

function createIcon(url) {
  return new L.Icon({
    iconUrl: url,
  });
}

// const rider=L.divIcon({ className: "custom icon", html: ReactDOMServer.renderToString( <Mapmarker image = {}/> ) })

function rider(img){
      return L.divIcon({ className: "custom icon", html: ReactDOMServer.renderToString( <Mapmarker image={img}/> ) })
}
var latCenter = 26.148043
var lonCenter = 91.731377
const Map = ({setRouteDetails,riderData,orders, ...props}) => {

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [coordinates, setCoordinates] = useState(props.coordinates);
  const pickupArray = orders!=undefined?orders.filter(order => order.delivery_action ==="pickup"):[];
  function handleClick(e) {
    setSelectedIndex(e.target.options.index)
  }

  
  const changeCoordinates = (coordinates) => {
    setCoordinates(coordinates);
 }

  function getMarkerIcon() {
       return Mapmarker;
  }


  const setRouteSummary = (summary) => {
    let distance = Math.round(summary.totalDistance / 100)/10;
    let time_required = '';
    if(Math.round(summary.totalTime / (60*60)) !== 0){
        time_required = Math.round(summary.totalTime / (60*60)) + ' h ' + Math.round(summary.totalTime % 3600 / 60) + ' min'; 
    }else{
        time_required = Math.round(summary.totalTime % 3600 / 60) + ' min';
    }
    let date = new Date();
    date = new Date(date.getTime() + (summary.totalTime * 1000));

    setRouteDetails({
        distance: distance,
        time_required: time_required,
        time_to_reach: date.toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true })
    });
}

  let latCenter = 26.148043;
  let lonCenter = 91.731377;
  for(let i = 0; i < props.coordinates.length; i++) {
    latCenter += props.coordinates[i].latitude;
    lonCenter += props.coordinates[i].longitude;
  }
  latCenter /= props.coordinates.length;
  lonCenter /= props.coordinates.length;

  let route = null;
  let zoom = 9;
  if(props.coordinates.length > 1) {
    route = <RoutineMachine coordinates={props.coordinates} onChange={changeCoordinates} setRouteSummary = {setRouteSummary}/>
  }else{
    route = <Marker position={[latCenter,lonCenter]}></Marker>;
    zoom = 9;
  }


  console.log(coordinates)

  

  return (
    <MapContainer
      doubleClickZoom={false}
      className="flex-grow z-0 w-full h-full"
      zoom={zoom}
      center={[latCenter, lonCenter]} 
    >
      <TileLayer
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://api.mapbox.com/styles/v1/triangulum66/cldh9spaw00a201r00lpktwhy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHJpYW5ndWx1bTY2IiwiYSI6ImNsZGV6ZGxncjBpcDgzbnBmemYzOWVrOXQifQ.BpyXvqLPQHOBy_-qJJr2Vw"
      />
      {props.coordinates && route}

         { riderData && riderData.map((item, index) => (
        <Marker
          key={index}
          index={index}
          position={[item.current_address.latitude,item.current_address.longitude]}
          icon={rider(R)}
          // icon={item.type==='pickup'?createIcon(delivery):rider(R)}
          // icon = {sus}
          onclick={handleClick}
        />
      ))}
      { pickupArray && pickupArray.map((item, index) => (
        <Marker
          key={index}
          index={index}
          position={[item.address.latitude,item.address.longitude]}
          icon={createIcon(delivery)}
          // icon = {sus}
          onclick={handleClick}
        />
      ))}

    </MapContainer>
  );
};

export default Map;
