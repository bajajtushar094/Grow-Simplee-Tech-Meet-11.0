import React, { useState } from "react";
import axios from "axios";
import Map from "../Component/Mobile/Map";
import arrow from "../Component/Global/arrow.svg";
import { LOCAL_SERVER_URL_IP, LOCALHOST_URL } from "../constants/config";
import Layout from "../Component/Layout";
import Topbar from "../Component/Layout/TopBar";
import { routePaths, TOP_TABS } from "../constants/sidebarconst";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [pickupFile, setPickupFile] = useState();
  const [isImage, setIsImage] = useState(0);

  function handleChange(event) {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  }

  function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }
  function saveByteArray(reportName, byte) {
    // console.log(typeof(byte))
    var blob = new Blob([byte], { type: "application/zip" });
    // console.log(blob.keys())
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    console.log(1);
    link.download = fileName;
    link.click();
  }
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // const url = 'http://localhost:8000/core/demo/';
    const url = `${LOCAL_SERVER_URL_IP}/demo/`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response);
      var sampleArr = base64ToArrayBuffer(response.data);
      console.log(sampleArr);
      saveByteArray("FileName.zip", sampleArr);
      setIsImage(1);
    });
    navigate(routePaths.mapView);
  }

  function handlePickupChange(event) {
    setPickupFile(event.target.files[0]);
    console.log(event.target.files[0]);
  }

  function handlePickupSubmit(event) {
    event.preventDefault();
    // const url = 'http://localhost:8000/core/demo/';
    const url = `${LOCAL_SERVER_URL_IP}/demoPickup/`;
    const formData = new FormData();
    formData.append("file", pickupFile);
    formData.append("fileName", pickupFile.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response);
      // var sampleArr = base64ToArrayBuffer(response.data);
      // console.log(sampleArr)
      // saveByteArray("FileName.zip", sampleArr);
    });
  }
  const coordinates = [
    {
      latitude: 26.189605193409417,
      longitude: 91.69294796870521,
      status: "delivery",
    },
    {
      latitude: 26.166979228463582,
      longitude: 91.75049812487305,
      status: "pickup",
    },
    //{latitude: 25.5119243264636, longitude: 92.73516653680502}
  ];

  const [routeDetails, setRouteDetails] = React.useState({
    distance: 0,
    time_required: "",
    time_to_reach: "",
  });

  const [activeTopTab, setActiveTopTab] = useState(TOP_TABS[2].value);
  const [activeTab, setActiveTab] = useState(TOP_TABS[0].value);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
  const location = useLocation();
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const handleTopTabChange = (option) => {
    setActiveTopTab(option.value);
    navigate(option.value);
  };
  const handleTabChange = (option) => {
    setActiveTab(option.value);
    navigate(option.value);
  };

  return (
    <>
      <Topbar
        topTabs={TOP_TABS}
        activeTab={activeTopTab}
        onTopTabClick={handleTopTabChange}
        location={location}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="w-full" style={{ margin: "40px" }}>
          {isImage == 0 ? (
            <Map
              coordinates={coordinates}
              setRouteDetails={setRouteDetails}
              data={data}
              className="flex-grow z-0"
            ></Map>
          ) : (
            <img
              src={LOCALHOST_URL + "/static/Routes4.png"}
              alt="Route image"
            />
          )}
        </div>
        <div
          style={{
            margin: "40px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "5px",
          }}
        >
          <p className="text-base text-gs-text-gray">
            Upload Excel file for dispatch items:
          </p>
          <form onSubmit={handleSubmit} className="mt-6">
            <input
              // style={{ margin: "20px" }}
              type="file"
              onChange={handleChange}
            />
            <button
              className="w-full mt-4"
              style={{
                backgroundColor: "black",

                height: "40px",
                borderRadius: "5px",
                color: "white",
              }}
              type="submit"
            >
              <p style={{ fontSize: "14px" }}>Upload</p>
            </button>
          </form>
          {/* <p className="text-base text-gs-text-gray">
            Upload excel file for pickup values:
          </p>

          <form onSubmit={handlePickupSubmit}>
            <input type="file" onChange={handlePickupChange} />
            <button
              className="w-full mt-4"
              style={{
                backgroundColor: "black",
                height: "40px",
                borderRadius: "5px",
                color: "white",
              }}
              type="submit"
            >
              <p style={{ fontSize: "14px" }}>Upload</p>
            </button>
          </form> */}
          {/* <button
            style={{
              margin: "20px",
              backgroundColor: "black",
              width: "220px",
              height: "40px",
              borderRadius: "5px",
              color: "white",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            type="submit"
          >
            <p style={{ fontSize: "14px", marginRight: "5px" }}>
              Skip to first deliveries
            </p>{" "}
            <img src={arrow} alt="" />{" "}
          </button>

          <button
            style={{
              margin: "20px",
              backgroundColor: "black",
              width: "220px",
              height: "40px",
              borderRadius: "5px",
              color: "white",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            type="submit"
          >
            <p style={{ fontSize: "14px", marginRight: "5px" }}>
              Dynamic Delivries
            </p>{" "}
            <img src={arrow} alt="" />
          </button> */}
        </div>
      </div>
    </>
  );
}

export default App;
