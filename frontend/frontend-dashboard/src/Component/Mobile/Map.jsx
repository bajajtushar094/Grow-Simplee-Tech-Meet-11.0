import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import * as L from "leaflet";
import RoutineMachine from "./RoutineMachine";
import { useState } from "react";
import delivery from "./delivery.svg";
import Pins from "./Pins.svg";
import Mapmarker from "../Global/Marker/Mapmarker";
import ReactDOMServer from "react-dom/server";
import R from "./R.svg";

function createIcon(url) {
  return new L.Icon({
    iconUrl: url,
  });
}

// const rider=L.divIcon({ className: "custom icon", html: ReactDOMServer.renderToString( <Mapmarker image = {}/> ) })

function rider(img) {
  return L.divIcon({
    className: "custom icon",
    html: ReactDOMServer.renderToString(<Mapmarker image={img} />),
  });
}
var latCenter = 26.148043
var lonCenter = 91.731377
const Map = ({setRouteSummary,riderData,orders,toggleSidebar,setSelectedRider, ...props}) => {

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [coordinates, setCoordinates] = useState(props.coordinates);

  let pickupArray = [];
  if (orders) {
    pickupArray = orders.filter((order) => order.delivery_action === "pickup");

    console.log(pickupArray);
  }
  function handleClick(e) {
    setSelectedIndex(e.target.options.index);
  }

  const changeCoordinates = (coordinates) => {
    setCoordinates(coordinates);
  };

  function getMarkerIcon() {
    return Mapmarker;
  }

  /*   const setRouteSummary = (summary) => {
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
} */
  // const position = [12.9716,77.5946]
  let latCenter = 0;
  let lonCenter = 0;
  for (let i = 0; i < props.coordinates.length; i++) {
    latCenter += props.coordinates[i].latitude;
    lonCenter += props.coordinates[i].longitude;
  }
  latCenter /= props.coordinates.length;
  lonCenter /= props.coordinates.length;

  let route = null;
  let zoom = 9;

  if (props.coordinates.length > 1) {
    route = (
      <RoutineMachine
        coordinates={props.coordinates}
        onChange={changeCoordinates}
        setRouteSummary={setRouteSummary}
      />
    );
  } else {
    route = (
      <Marker
        key={1}
        index={1}
        position={[
          props.coordinates[0].latitude,
          props.coordinates[0].longitude,
        ]}
        //icon={rider(R)}
        // icon={item.type==='pickup'?createIcon(delivery):rider(R)}
        // icon = {sus}
        onclick={() => {}}
      />
    );
    zoom = 12;
  }
    if (latCenter < 8.4 || latCenter > 37.6) {
    latCenter = 12.9716;
  }
  if (lonCenter < 68.7 || lonCenter > 97.25) {
    lonCenter = 77.5946;
  }

  return (
    <MapContainer
      doubleClickZoom={false}
      className="flex-grow z-0 w-full h-[100vh]"
      zoom={zoom}
      center={[latCenter, lonCenter]}
    >
      <TileLayer
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://api.mapbox.com/styles/v1/triangulum66/cldh9spaw00a201r00lpktwhy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHJpYW5ndWx1bTY2IiwiYSI6ImNsZGV6ZGxncjBpcDgzbnBmemYzOWVrOXQifQ.BpyXvqLPQHOBy_-qJJr2Vw"
      />

      {props.coordinates && route}

      {riderData &&
        riderData.map((item, index) => (
          <Marker
            key={index}
            index={index}
            position={[
              item.current_order.latitude,
              item.current_order.longitude,
            ]}
            icon={rider(R)}
            // icon={item.type==='pickup'?createIcon(delivery):rider(R)}
            // icon = {sus}
            onclick={handleClick}
            eventHandlers={{
              click: (e) => {
                setSelectedRider(item)
                toggleSidebar()
              },
            }}
          />
        ))}
      {pickupArray &&
        pickupArray.map((item, index) => (
          <Marker
            key={index}
            index={index}
            position={[item.latitude, item.longitude]}
            icon={createIcon(delivery)}
            // icon = {sus}
            onclick={handleClick}
          />
        ))}
    </MapContainer>
  );
};

export default Map;
