import React, { useState } from "react";
import MobileLayout from "../../Component/Layout/MobileLayout";
import { Link, useNavigate } from "react-router-dom";
import Map2 from "../../Component/Mobile/Map2";
import DeliveryStatus from "../../Component/Mobile/DeliveryStatus";
import PickupStatus from "../../Component/Mobile/PickupStatus";
import { useSelector, useDispatch } from "react-redux";
import {
  getPackages,
  setIsAtWarehouse,
  getLoggedIn,
} from "../../features/rider/riderSlice";

const TripRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedIn = useSelector(getLoggedIn);
  if (!loggedIn) {
    navigate("/login");
  }

  const packages = useSelector(getPackages);
  console.log(packages);

  const [routeDetails, setRouteDetails] = React.useState({
    distance: 0,
    time_required: "",
    time_to_reach: "",
  });

  const setRouteSummary = (summary) => {
    let distance = Math.round(summary.totalDistance / 1000);
    let time_required = "";
    if (Math.round(summary.totalTime / (60 * 60)) !== 0) {
      time_required =
        Math.round(summary.totalTime / (60 * 60)) +
        " h " +
        Math.round((summary.totalTime % 3600) / 60) +
        " min";
    } else {
      time_required = Math.round((summary.totalTime % 3600) / 60) + " min";
    }
    let date = new Date();
    date = new Date(date.getTime() + summary.totalTime * 1000);

    setRouteDetails({
      distance: distance,
      time_required: time_required,
      time_to_reach: date.toLocaleString("en-IN", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    });
  };

  const startTrip = () => {
    //calculate the length of total packages with isDelivered = true
    const deliveredPackages = packages.filter((item) => {
      return item.isDelivered === true;
    });
    if (!deliveredPackages.length === packages.length) {
      dispatch(setIsAtWarehouse(false));
    }
    navigate("/singleRoute");
  };

  /* const coordinates = [
        {latitude: 26.189605193409417, longitude: 91.69294796870521, status:'delivery'},
        {latitude: 26.166979228463582, longitude: 91.75049812487305, status:'pickup'},
        {latitude: 26.177219357664082, longitude: 91.76409504583465, status:'delivery'},
    ]; */
  const coordinates = packages.map((item) => {
    return {
      latitude: item.latitude,
      longitude: item.longitude,
      status: item.type,
    };
  });

  const warehouse = {
    latitude: 12.9716,
    longitude: 77.5946,
    status: "warehouse",
  };
  coordinates.unshift(warehouse);
  coordinates.push(warehouse);

  return (
    <MobileLayout subHeading="Trip Route">
      <>
        <div className="absolute top-0 left-0 z-10 px-4 py-3">
          <DeliveryStatus className="pb-2" />
          <div className="h-1"></div>
          <PickupStatus />
        </div>
        <Map2
          coordinates={coordinates}
          setRouteSummary={setRouteSummary}
          className="flex-grow z-0"
        />
        <div className="bottom_bar rounded-t-[12px] bg-white px-4 py-6 border border-[#D2D1CC]">
          <div className="time_distance text-xl pb-1">
            <div className="time text-[#4CAF50] inline-block font-medium">
              {routeDetails.time_required} &nbsp;
            </div>
            <div className="distance inline-block font-normal">
              {routeDetails.distance} km
            </div>
          </div>
          <div className="info text-gs-text-gray text-[14px] pb-3 ">
            Fastest possible route, usual traffic
          </div>
          <div className="buttons flex text-center font-semibold">
            <div
              className="checklist_button rounded-full flex-1 py-3 border-[#2F2E36] border mr-2"
              onClick={() => {
                navigate("/checklist");
              }}
            >
              Checklist
            </div>
            <button
              className="start_button rounded-full flex-1 py-3 bg-[#2F2E36] text-white"
              onClick={startTrip}
            >
              Start Trip
            </button>
          </div>
        </div>
      </>
    </MobileLayout>
  );
};

export default TripRoute;
