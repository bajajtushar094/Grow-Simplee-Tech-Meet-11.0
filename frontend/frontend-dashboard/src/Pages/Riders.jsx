import React from "react";
import { useParams } from "react-router-dom";
import Table from "../Component/Global/Table";
import Layout from "../Component/Layout";
import PlayListAddCheckIcon from "../Shared/Icons/PlayListAddCheckIcon";

import scooter from './scooter.svg'
import Icon from './Icon.svg'
import Icon2 from './Icon2.svg'
import plus from './plus.svg'
import minus from './minus.svg'
import MapBox from '../Component/Global/MapBox'
import SideProfile from '../Component/Global/SideProfile'
import Box from '../Component/Global/Box.svg'

const Riders = () => {
  let { riderManagementTab } = useParams();
  const displayedList = [
    {
      id: "1232",
      rider: {
        name: "Kathryn Murphy",
        photoURL:
          "https://images.unsplash.com/photo-1674238924120-a9d9a0425d28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      },
      range: "6 KM",
      latestLocation: "4140 Parker Rd. Allentown, New Mexico 31134",
      progress: "25%",
      status: "On Route",
    },
    {
      id: "12522",
      rider: {
        name: "Wade Warren",
        photoURL:
          "https://images.unsplash.com/photo-1674238924120-a9d9a0425d28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      },
      range: "9 KM",
      latestLocation: "2464 Royal Ln. Mesa, New Jersey 45463",
      progress: "65%",
      status: "On Route",
    },
    {
      id: "123322",
      rider: {
        name: "Courtney Henry",
        photoURL:
          "https://images.unsplash.com/photo-1674238924120-a9d9a0425d28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      },
      range: "17 KM",
      latestLocation: "3517 W. Gray St. Utica, Pennsylvania 57867",
      progress: "34%",
      status: "Delayed",
    },
  ];
  return (
    <Layout>
      {
        riderManagementTab === "listView"?<div className="bg-white rounded-tl-3xl border-2 w-full">
        <div className="flex pb-4 pt-6 px-8">
          <div>
            <PlayListAddCheckIcon />
          </div>
          <div className="pl-4 w-full">
            <div className="flex justify-between w-full">
              <h4 className="text-gs-blue text-sm font-semibold">Riders</h4>
              <div className="flex space-x-6"></div>
            </div>
            <h2 className="text-xl font-semibold mt-2">List</h2>
            <h4 className="text-md text-[#5F5D59] font-semibold mt-1">
              List of all the riders in your network
            </h4>
          </div>
        </div>
        <Table tab={riderManagementTab} displayedList={displayedList} checkboxSelection={false} className='px-6'/>
      </div>:
      <>
      <div className="w-full  px-5" id='mapbox_div' >
         <MapBox/>
        </div> 
      <div style={{position :'absolute', marginLeft:'1050px'}}>
         {/* <SideProfile borderRadius='10px'/> */}
      </div>

      <div style={{position:'absolute',display:'flex', flexDirection:'row', backgroundColor:'white', width:'893px', height:'86px', justifyContent:'space-between',padding:'10px', borderRadius:"12px",marginTop:'500px', marginLeft:'370px'}}>
         <div style={{display:'flex', flexDirection:'row', alignItems:"center"}}>
             <img src={scooter} alt="" />
             <div style={{display:'flex', flexDirection:'column'}}>
                 <p style={{fontWeight:'600'}}>16</p>
                 <p style={{fontSize:'12px'}}>Riders Dispatched</p>
             </div>
         </div>

         <div  style={{display:'flex', flexDirection:'row', alignItems:"center"}}>
              <img src={Box} alt="" />
              <div  style={{display:'flex', flexDirection:'column'}}>
                 <p style={{fontWeight:'600'}}>52%</p>
                 <p style={{fontSize:'12px'}}>Delivered</p>
             </div>
         </div>

         <div  style={{display:'flex', flexDirection:'row',alignItems:"center",}}>
             <img src={Icon} alt="" />
             <div  style={{display:'flex', flexDirection:'column'}}>
                 <p style={{fontWeight:'600'}}>14</p>
                 <p style={{fontSize:'12px'}}>On Route</p>
             </div>
         </div>
         <div  style={{display:'flex', flexDirection:'row',alignItems:"center"}}>
             <img src={Icon2} alt="" />
             <div  style={{display:'flex', flexDirection:'column'}}>
                 <p style={{fontWeight:'600', color:'red'}}>2</p>
                 <p style={{fontSize:'12px'}}>Not on route</p>
             </div>
         </div>
      </div>
       <div style={{display:'flex', flexDirection:'column',marginTop:'474px', position:'absolute', marginLeft:'1300px'}}>
           <div style={{backgroundColor:'white', width:'40px', height:'40px', display:'flex', alignItems:"center", justifyContent:'center', margin:"10px", borderRadius:'10px'}}>
              <img src={plus} alt="" />
           </div>
           <div style={{backgroundColor:'white', width:'40px', height:'40px', display:'flex', alignItems:"center", justifyContent:'center', margin:"10px", borderRadius:"10px"}}>
              <img src={minus} alt="" />
           </div>
       </div>
       </>
      }
    </Layout>
  );
};

export default Riders;
