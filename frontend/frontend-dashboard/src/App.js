import React from 'react';
import { BrowserRouter, Routes, Route,  Switch, } from "react-router-dom";
import Inventory from './Pages/Inventory';
import Layout, { InventoryLayout } from './Component/Layout'



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Inventory />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
