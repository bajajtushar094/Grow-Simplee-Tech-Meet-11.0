import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import RoutineMachine from "./RoutineMachine";

const Map = (props) => {

  let latCenter = 0;
  let lonCenter = 0;
  for(let i = 0; i < props.coordinates.length; i++) {
    latCenter += props.coordinates[i].latitude;
    lonCenter += props.coordinates[i].longitude;
  }
  latCenter /= props.coordinates.length;
  lonCenter /= props.coordinates.length;

  let route = null;
  let zoom = 9;
  if(props.coordinates.length > 1) {
    route = <RoutineMachine coordinates={props.coordinates} setRouteSummary = {props.setRouteSummary}/>
  }else{
    route = <Marker position={[latCenter,lonCenter]}></Marker>;
    zoom = 20;
  }

  return (
    <MapContainer
      doubleClickZoom={false}
      className="flex-grow z-0"
      zoom={zoom}
      center={[latCenter, lonCenter]}
    >
      <TileLayer
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://api.mapbox.com/styles/v1/triangulum66/cldh9spaw00a201r00lpktwhy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHJpYW5ndWx1bTY2IiwiYSI6ImNsZGV6ZGxncjBpcDgzbnBmemYzOWVrOXQifQ.BpyXvqLPQHOBy_-qJJr2Vw"
      />
      {route}
    </MapContainer>
  );
};

export default Map;
