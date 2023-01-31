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
import UpcomingDelivery from "./Pages/Mobile/UpcomingDelivery";
import DroneManagement from "./Component/Layout/Droneview/DroneManagement";
import Ridermanagement from "./Pages/Ridermanagement";
import MapBox from "./Component/Global/MapBox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/warehouse/:warehouseTab" element={<Inventory />} />
        <Route path="/ridersList" element={<Riders />} />
        <Route path="/volumeestimation" element={<InventoryWebcam />} />
        <Route path="/about" element={<Dashboard />} />
        {/* <Route path="/listview" element={<InventoryImages />} /> */}
        <Route path="/scanQR" element={<ScanQR />} />
        <Route path="/uploadzip" element={<UploadZip />} />
        <Route path="/createBag" element={<CreateBag />} />
        <Route path="/upcomingDelivery" element={<UpcomingDelivery />} />
        <Route path="/drone" element={<DroneManagement />} />
        <Route path="/rider" element={<Ridermanagement/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
