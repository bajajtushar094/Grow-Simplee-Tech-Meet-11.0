import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import RoutineMachine from "./RoutineMachine";
import { useState } from "react";

function createIcon(url) {
  return new L.Icon({
    iconUrl: url,
  });
}
var latCenter = 26.148043
var lonCenter = 91.731377
const Map = ({setRouteDetails, ...props}) => {

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [coordinates, setCoordinates] = useState(props.coordinates);

  function handleClick(e) {
    setSelectedIndex(e.target.options.index)
  }

  
  const changeCoordinates = (coordinates) => {
    setCoordinates(coordinates);
 }

  function getMarkerIcon(index) {
    if(index === selectedIndex)
          return createIcon("https://user-images.githubusercontent.com/1596072/85960867-3baf9700-b9af-11ea-854e-7ef6e656d447.png");
    return createIcon("https://user-images.githubusercontent.com/1596072/85960806-0145fa00-b9af-11ea-91ab-a107d0a64b66.png");
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
    route = <RoutineMachine coordinates={props.coordinates} setRouteSummary = {setRouteSummary} />
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

         { props.data && props.data.map((item, index) => (
        <Marker
          key={index}
          index={index}
          position={item.position}
          icon={getMarkerIcon(index)}
          onclick={handleClick}
        />
      ))}

    </MapContainer>
  );
};

export default Map;
