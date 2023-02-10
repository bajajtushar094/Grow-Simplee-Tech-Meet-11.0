import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  let waypoints = [];
  for (let i = 0; i < props.coordinates.length; i++) {
    waypoints.push(
      L.latLng(props.coordinates[i].latitude, props.coordinates[i].longitude)
    );
  }
  const instance = L.Routing.control({
    waypoints: waypoints,
    lineOptions: {
      styles: [{ color: "#5499FF", weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  instance.on("routesfound", function (e) {
    var routes = e.routes;
    var summary = routes[0].summary;
    props.setRouteSummary(summary);
    //alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
