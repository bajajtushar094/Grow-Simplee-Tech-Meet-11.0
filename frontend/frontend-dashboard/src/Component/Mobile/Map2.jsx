import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import * as L from "leaflet";
import RoutineMachine from "./RoutineMachine";
import { useState } from "react";
import Pins from "./Pins.svg";
import Mapmarker from "../Global/Marker/Mapmarker";
import ReactDOMServer from "react-dom/server";
import R from "./R.svg";
import delivery2 from "./delivery2.svg";
import warehouse from "./warehouse.svg";
import pickup2 from "./pickup2.svg";
import pickup from "./pickup.svg";
import delivery from "./delivery.svg";
import start from "./start.svg";
import destination from "./destination.svg";

function createIcon(url) {
  return new L.Icon({
    iconUrl: url,
    iconAnchor: [18, 18],
  });
}

function rider(img, progress) {
  return L.divIcon({
    className: "custom icon",
    html: ReactDOMServer.renderToString(
      <Mapmarker image={img} progress={progress} />
    ),
  });
}
//var latCenter = 26.148043;
//var lonCenter = 91.731377;
const Map = ({ setRouteSummary, ...props }) => {
  let latCenter = 0;
  let lonCenter = 0;

  let route = null;
  let zoom = 9;

  if (props.coordinates) {
    for (let i = 0; i < props.coordinates.length; i++) {
      latCenter += props.coordinates[i].latitude;
      lonCenter += props.coordinates[i].longitude;
    }
    latCenter /= props.coordinates.length;
    lonCenter /= props.coordinates.length;

    if (props.coordinates.length > 1) {
      route = (
        <RoutineMachine
          coordinates={props.coordinates}
          onChange={(e) => {}}
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
          icon={
            new L.Icon({
              iconUrl: destination,
              iconAnchor: [24, 36],
            })
          }
          //icon={rider(R)}
          // icon={item.type==='pickup'?createIcon(delivery):rider(R)}
          // icon = {sus}
          onclick={() => {}}
        />
      );
      zoom = 12;
    }
  }
  /* if (latCenter < 8.4 || latCenter > 37.6) {
    latCenter = 12.9716;
  }
  if (lonCenter < 68.7 || lonCenter > 97.25) {
    lonCenter = 77.5946;
  } */

  return (
    <MapContainer
      doubleClickZoom={false}
      className="flex-grow z-0 w-full"
      zoom={zoom}
      center={[latCenter, lonCenter]}
    >
      <TileLayer
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://api.mapbox.com/styles/v1/triangulum66/cldh9spaw00a201r00lpktwhy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHJpYW5ndWx1bTY2IiwiYSI6ImNsZGV6ZGxncjBpcDgzbnBmemYzOWVrOXQifQ.BpyXvqLPQHOBy_-qJJr2Vw"
      />

      {props.coordinates && route}

      {props.coordinates &&
        props.coordinates.length > 2 &&
        // create a marker for each each coordinate. Make the icon a custom icon based on the status of the item
        props.coordinates.map((item, index) => (
          <Marker
            key={index}
            index={index}
            position={[item.latitude, item.longitude]}
            icon={
              item.status === "warehouse"
                ? createIcon(warehouse)
                : item.status === "pickup"
                ? createIcon(pickup2)
                : createIcon(delivery2)
            }
            onclick={() => {}}
          />
        ))}
      {props.coordinates &&
        props.coordinates.length === 2 &&
        // create a marker for each each coordinate. Make the icon a custom icon based on the status of the item
        props.coordinates.map((item, index) => (
          <Marker
            key={index}
            index={index}
            position={[item.latitude, item.longitude]}
            icon={
              item.status === "warehouse"
                ? createIcon(warehouse)
                : index === 0
                ? createIcon(start)
                : item.status === "pickup"
                ? createIcon(pickup)
                : createIcon(delivery)
            }
            onclick={() => {}}
          />
        ))}
    </MapContainer>
  );
};

export default Map;
