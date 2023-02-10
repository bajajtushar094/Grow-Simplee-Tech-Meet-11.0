import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import R from "./R.svg";
import delivery from "./delivery.svg";
import pickup from "./pickup.svg";

// function createIcon(url) {
//   return new L.Icon({
//     iconUrl: url,
//   });
// }

const createRoutineMachineLayer = (props) => {
  let orders = props.orders;
  const warehouse = {
    latitude: 12.9716,
    longitude: 77.5946,
  };
  // add warehouse to the beginning and end of the array
  orders.unshift(warehouse);
  orders.push(warehouse);
  console.log(orders);

  let waypoints = [];
  for (let i = 0; i < orders.length; i++) {
    waypoints.push(L.latLng(orders[i].latitude, orders[i].longitude));
  }

  //generate an array of random colors in format #rrggbb
  const colors = Array.from(
    { length: 20 },
    () => "#" + Math.floor(Math.random() * 16777215).toString(16)
  );

  const randomColor = (key) => {
    let index = key % colors.length;
    return colors[index];
  };

  const instance = L.Routing.control({
    waypoints: waypoints,
    // plan: L.Routing.plan(waypoints, {
    //   createMarker: function (i, wp) {
    //     return L.marker(wp.latLng, {
    //       draggable: true,
    //       icon:,
    //     });
    //   },
    //   routeWhileDragging: true,
    // }),
    createMarker: function () {
      return null;
    },
    lineOptions: {
      styles: [{ color: randomColor(props.riderId), weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  /* instance.on("routesfound", function (e) {
    var routes = e.routes;
    var summary = routes[0].summary;
    props.setRouteSummary(summary);
    //alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
  }); */

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
