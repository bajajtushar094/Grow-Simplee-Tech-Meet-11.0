import React from 'react';
import { BrowserRouter, Routes, Route,  Switch, } from "react-router-dom";
import Inventory from './Pages/Inventory';
import RiderManagement from './Pages/RiderManagement';
import Layout, { InventoryLayout } from './Component/Layout'
import SideProfile from './Component/Global/SideProfile';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Inventory />} />
      <Route path='/sideprofile' element={<SideProfile/>}/>
    </Routes>
    </BrowserRouter>
  );
}


export default App;
