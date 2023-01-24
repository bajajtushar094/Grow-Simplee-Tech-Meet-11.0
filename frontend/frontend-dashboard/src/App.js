import React from 'react';
import { BrowserRouter, Routes, Route,  Switch, } from "react-router-dom";
import Inventory from './Pages/Inventory';
import RiderManagement from './Pages/RiderManagement';
import Layout, { InventoryLayout } from './Component/Layout'
import SideProfile from './Component/Global/SideProfile';
import InventoryWebcam from './Pages/InventoryWebcam';
import Map from './Component/Global/Map';
import Drone from './Component/Layout/Droneview/DroneManagement';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Inventory />} />
      <Route path="/vol" element={<InventoryWebcam />} />
      <Route path="/drone" element={<Drone/>} />
      <Route path="/map" element={<Map/>} />
    </Routes>
    </BrowserRouter>
  );
}


export default App;
