import React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Inventory from "./Pages/Inventory";
import InventoryWebcam from "./Pages/InventoryWebcam";
// import InventoryImages from "./Pages/InventoryImages";
import Riders from "./Pages/Riders"
import Layout, { InventoryLayout } from "./Component/Layout";
import Dashboard from "./Pages/Dashboard";
import ScanQR from "./Pages/Mobile/ScanQR"
import UploadZip from "./Pages/UploadZipPage";
import CreateBag from "./Pages/Mobile/CreateBag";
import TripRoute from "./Pages/Mobile/TripRoute";
import SingleRoute from "./Pages/Mobile/SingleRoute";
import Verification from "./Pages/Mobile/Verification";
import Login from "./Pages/Mobile/Login";
import Checklist from "./Pages/Mobile/Checklist";
import DestinationReached from "./Pages/Mobile/DestinationReached";
import DroneManagement from "./Component/Layout/Droneview/DroneManagement";
import Ridermanagement from "./Pages/Ridermanagement";
import MapBox from "./Component/Global/MapBox";
import Demo from "./Pages/Demo";
import Mapmarker from "./Component/Global/Marker/Mapmarker.jsx";
// import RiderDetails from "./Pages/RiderDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/warehouse/:warehouseTab" element={<Inventory />} />
        <Route path="/ridersList" element={<Riders />} />
        <Route path="/volumeestimation" element={<InventoryWebcam />} />
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/listview" element={<InventoryImages />} /> */}
        <Route path="/uploadzip" element={<UploadZip />} />
        <Route path="/scanQR" element={<ScanQR />} />
        <Route path="/createBag" element={<CreateBag />} />
        <Route path="/tripRoute" element={<TripRoute />} />
        <Route path="/singleRoute" element={<SingleRoute />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/destinationReached" element={<DestinationReached />} />
        <Route path="/drone" element={<DroneManagement />} />
        <Route path="/rider" element={<Ridermanagement/>}/>
        <Route path="/demo" element={<Demo/>}/>
        {/* <Route path="/riderDetails" element={<RiderDetails/>}/> */}
        <Route path="/marker" element={<Mapmarker/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;





