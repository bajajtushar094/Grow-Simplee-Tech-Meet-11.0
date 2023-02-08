import React, { useEffect } from "react";
import scooter from "./scooter.svg";
import Icon from "./Icon.svg";
import Icon2 from "./Icon2.svg";
import plus from "./plus.svg";
import minus from "./minus.svg";
import SideProfile from '../Global/SideProfile'
import Boxsvg from "../Global/Box.svg";
import Box from "@mui/material/Box";
// import MapBox from '../Component/Global/MapBox'
import { useState } from "react";
import Modal from "@mui/material/Modal";
import arrow from "../Global/arrow.svg";
import DynamicPicups from "../Global/DynamicPicups";
import CancelOrder from "../Global/CancelOrder";
import Map from "../Mobile/Map";

const Rider = [
  {
    image: "",
    name: "Rider 1",
    status: "ontime",
    time: "10:00 AM",
    location: "bangalore",
    adress: "palace road",
    customer: "customer 1",
  },
  {
    image: "",
    name: "Rider 2",
    status: "ontime",
    time: "11:00 AM",
    location: "Kathmandu",
    adress: "cubbon park",
    customer: "Customer 1",
  },
  {
    image: "",
    name: "Rider 3",
    status: "ontime",
    time: "10:00 AM",
    location: "Kathmandu",
    adress: "sankey tank",
    customer: "Customer 1",
  },
  {
    image: "",
    name: "Rider 4",
    status: "delayed",
    time: "10:00 AM",
    location: "Kathmandu",
    adress: "iskon temple",
    customer: "Customer 1",
  },
  {
    image: "",
    name: "Rider 5",
    status: "delayed",
    time: "10:00 AM",
    location: "Kathmandu",
    adress: "lumbini garden",
    customer: "Customer 1",
  },
  {
    image: "",
    name: "Rider 6",
    status: "ontime",
    time: "10:00 AM",
    location: "Kathmandu",
    adress: "play arena",
    customer: "Customer 1",
  },
];

const data = [
  {
    name: "Guwahati",
    fillColor: "#7FC9FF",
    id: 1,
    position: {
      lat: 26.148043,
      lng: 91.731377,
    },
  },
  {
    name: "Amingaon",
    fillColor: "#7FC9FF",
    id: 2,
    position: {
      lat: 26.1847,
      lng: 91.6672,
    },
  },
  {
    name: "Silchar",
    fillColor: "#7FC9FF",
    id: 3,
    position: {
      lat: 24.8333,
      lng: 92.7789,
    },
  },
  {
    name: "Khokhrajhar",
    fillColor: "#7FC9FF",
    id: 4,
    position: {
      lat: 26.4014,
      lng: 90.2667,
    },
  },
  {
    name: "Paris",
    fillColor: "#7FC9FF",
    id: 5,
    position: {
      lat: 27.4705,
      lng: 94.9125,
    },
  },
];

const RiderMapContainer = ({riderData, orders}) => {
  const [sideprofile,setSideprofile] = useState(false);
  const [selectedRider, setSelectedRider] = useState({})
  const [open, setOpen] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenCancelModal = () => setOpenCancelModal(true);
  const handleCloseCancelModal = () => setOpenCancelModal(false);
  const [rider, setRider] = useState({
    image: "",
    name: "",
    status: "",
    time: "",
    location: "",
    adress: "",
    customer: "",
  });
  const [routeDetails, setRouteDetails] = useState({
    distance: 0,
    time_required: "",
    time_to_reach: "",
  });

  const [isseleted, setIsSelected] = useState(false);
  const [dynamicPicups, setdynamicPicups] = useState(false);
  const [cancelOrder, setCancelOrder] = useState(false);

  const handleClick = (e) => {
    setRider(Rider[e.target.id]);
    setIsSelected(true);
  };
  const toggleSidebar = ()=>{
        setSideprofile(!sideprofile)
  }

  console.log(rider);

  useEffect(() => {}, [rider]);

  const coordinates = [
    { latitude: "", longitude: "", status: "delivery" },
    { latitude: "", longitude: "", status: "pickup" },
    //{latitude: 25.5119243264636, longitude: 92.73516653680502}
  ];
  const s = (routeSummary) => {};

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    p: 4,
  };
 console.log(selectedRider)
  return (
    <>
      <div
        className="w-full flex-col px-5"
        id="mapbox_div"
        style={{ height: "700px" }}
      >
        {/* <MapBox/> */}
        <Map
          coordinates={coordinates}
          setRouteDetails={setRouteDetails}
          data={data}
          riderData={riderData}
          orders={orders}
          toggleSidebar={toggleSidebar}
          setSelectedRider = {setSelectedRider}
          className="flex-grow z-0 h-full]"
        ></Map>
        <div
        onClick={handleOpenCancelModal}
          style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            height: "44px",
            width: "174px",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            top: "200px",
            marginLeft: "20px",
          }}
          className='cursor-pointer'
        >
          <p style={{ color: "white", fontSize: "14px", margin: "10px" }}>
            Cancel Orders
          </p>
          <img style={{ height: "15px", margin: "10px" }} src={arrow} alt="" />
        </div>

        <div
          onClick={handleOpen}
          className="cursor-pointer"
          style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            height: "44px",
            width: "230px",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            top: "150px",
            marginLeft: "20px",
          }}
        >
          <p style={{ color: "white", fontSize: "14px", margin: "10px" }}>
            Add Dynamic Pickups
          </p>
          <img style={{ height: "15px", margin: "10px" }} src={arrow} alt="" />
        </div>
      </div>
      { sideprofile && 
      <div
        style={{
          position: "absolute",
          zIndex: "99",
          right: "0",
        }}
      >
        <SideProfile borderRadius='10px' selectedRider={selectedRider} {...rider}/>
      </div> }

    

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DynamicPicups />
        </Box>
      </Modal>
      <Modal
        open={openCancelModal}
        onClose={handleCloseCancelModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <CancelOrder />
        </Box>
      </Modal>
      {/* { dynamicPicups &&
          <div style={{position:'absolute'}}>
              <DynamicPicups/>
          </div>
         } */}
      {/* {cancelOrder && (
        <div style={{ position: "absolute" }}>
          <CancelOrder />
        </div>
      )} */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          width: "893px",
          height: "86px",
          justifyContent: "space-between",
          padding: "15px",
          borderRadius: "12px",
          marginTop: "500px",
          marginLeft: "370px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={scooter} alt="" />
          <div
            style={{ display: "flex", flexDirection: "column", margin: "10px" }}
          >
            <p style={{ fontWeight: "600" }}>16</p>
            <p style={{ fontSize: "12px" }}>Riders Dispatched</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={Boxsvg} alt="" />
          <div
            style={{ display: "flex", flexDirection: "column", margin: "10px" }}
          >
            <p style={{ fontWeight: "600" }}>52%</p>
            <p style={{ fontSize: "12px" }}>Delivered</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={Icon} alt="" />
          <div
            style={{ display: "flex", flexDirection: "column", margin: "10px" }}
          >
            <p style={{ fontWeight: "600" }}>14</p>
            <p style={{ fontSize: "12px" }}>On Route</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={Icon2} alt="" />
          <div
            style={{ display: "flex", flexDirection: "column", margin: "10px" }}
          >
            <p style={{ fontWeight: "600", color: "red" }}>2</p>
            <p style={{ fontSize: "12px" }}>Not on route</p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "474px",
          position: "absolute",
          marginLeft: "1300px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px",
            borderRadius: "10px",
          }}
        >
          <img src={plus} alt="" />
        </div>
        <div
          style={{
            backgroundColor: "white",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px",
            borderRadius: "10px",
          }}
        >
          <img src={minus} alt="" />
        </div>
      </div>
    </>
  );
};

export default RiderMapContainer;
