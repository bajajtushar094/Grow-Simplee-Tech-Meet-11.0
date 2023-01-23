import React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Inventory from "./Pages/Inventory";
import InventoryWebcam from "./Pages/InventoryWebcam";
import InventoryImages from "./Pages/InventoryImages";

import Layout, { InventoryLayout } from "./Component/Layout";
import Dashboard from "./Pages/Dashboard";
import ScanQR from "./Pages/Mobile/ScanQR";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/warehouse/:warehouseTab" element={<Inventory />} />
        <Route path="/vol" element={<InventoryWebcam />} />
        <Route path="/about" element={<Dashboard />} />
        <Route path="/img" element={<InventoryImages />} />
        <Route path="/scan" element={<ScanQR />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
