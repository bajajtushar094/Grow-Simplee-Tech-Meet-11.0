import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import * as L from "leaflet";
import RoutineMachine from "./RoutineMachine2";
import { useState } from "react";
import delivery from "./delivery.svg";
import Pins from "./Pins.svg";
import Mapmarker from "../Global/Marker/Mapmarker";
import ReactDOMServer from "react-dom/server";
import pickup from "./pickup.svg";
import R from "./R.svg";
import warehouse from "./warehouse.svg";

function createIcon(url) {
  return new L.Icon({
    iconUrl: url,
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

const Map = ({
  riderData,
  orders,
  toggleSidebar,
  setSelectedRider,
  ...props
}) => {
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

  let latCenter = 0;
  let lonCenter = 0;

  let route = null;
  let zoom = 9;

  if (orders.length > 0) {
    console.log(orders);
    for (let i = 0; i < orders.length; i++) {
      latCenter += orders[i].latitude;
      lonCenter += orders[i].longitude;
    }
    latCenter /= orders.length;
    lonCenter /= orders.length;
  }
  if (latCenter < 8.4 || latCenter > 37.6) {
    latCenter = 12.9716;
  }
  if (lonCenter < 68.7 || lonCenter > 97.25) {
    lonCenter = 77.5946;
  }

  console.log(orders);

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

      {/* {riderData[0].orders.length > 1 && (
        <RoutineMachine
          orders={orders}
          onChange={changeCoordinates}
          riderId={riderData[0].id}
          setRouteSummary={() => {}}
        />
      )} */}

      {orders &&
        orders.map((item, index) => (
          <Marker
            key={index}
            index={index}
            position={[parseFloat(item.latitude), parseFloat(item.longitude)]}
            icon={
              item.delivery_action === "pickup"
                ? createIcon(pickup)
                : createIcon(delivery)
            }
            // icon = {sus}
            onclick={handleClick}
          />
        ))}
      {riderData.map((rider, index) => {
        if (rider.orders.length > 1) {
          return (
            <RoutineMachine
              orders={rider.orders}
              onChange={changeCoordinates}
              riderId={rider.id}
              setRouteSummary={() => {}}
            />
          );
        } else {
          return null;
        }
      })}

      {riderData &&
        riderData.map(
          (item, index) =>
            item != undefined &&
            item.current_order != undefined && (
              <Marker
                key={index}
                index={index}
                position={[
                  parseFloat(item.current_order.latitude),
                  parseFloat(item.current_order.longitude),
                ]}
                icon={rider(R, item.progress)}
                zIndexOffset={10000}
                // icon={item.type==='pickup'?createIcon(delivery):rider(R)}
                // icon = {sus}
                onclick={handleClick}
                eventHandlers={{
                  click: (e) => {
                    setSelectedRider(item);
                    toggleSidebar();
                  },
                }}
              />
            )
        )}

      {/* warehouse */}
      <Marker
        position={[12.9716, 77.5946]}
        icon={createIcon(warehouse)}
        onclick={handleClick}
      />
    </MapContainer>
  );
};

export default Map;
