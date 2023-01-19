import React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Inventory from "./Pages/Inventory";
import InventoryWebcam from "./Pages/InventoryWebcam";

import Layout, { InventoryLayout } from "./Component/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/vol" element={<InventoryWebcam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
