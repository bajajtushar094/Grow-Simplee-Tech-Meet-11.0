import React, { useEffect } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import Table from "../Component/Global/Table";
import Layout from "../Component/Layout/Layout";
import TickedWindowIcon from "../Shared/Icons/TickedWindowIcon";
import DroneIcon from "../Shared/Icons/DroneIcon";
import MopedOutlinedIcon from "@mui/icons-material/MopedOutlined";
import ProgressBar from "../Component/Layout/ProgressBar";
import { useState } from "react";
import MapBox from "../Component/Global/MapBox";

const Dashboard = () => {
  const [manager, setManager] = useState({})
  const [upcomingCount, setUpcomingCount] = useState({})
  const [riderCount, setRiderCount] = useState(0)
  const [riderlocations, setriderlocations] = useState([])
  
  useEffect(()=>{


    const fetchManager = async () => {
      const res = await fetch("http://localhost:8000/core/manager")
      const response = await res.json()
      console.log(response)
      setManager(response.manager[0])
    }
    const fetchUpcomingCount = async () => {
      const res = await fetch("http://localhost:8000/core/orders/upcoming")
      const response = await res.json()
      console.log(response)
      setUpcomingCount(response)
    }
    const fetchRiderCount = async () => {
      const res = await fetch("http://localhost:8000/core/count/riders")
      const response = await res.json()
      console.log(response)
      setRiderCount(response['count'])
    }
    const fetchRiderLocations = async () => {
      const res = await fetch("http://localhost:8000/core/locations/rider")
      const response = await res.json()
      console.log(response)
      setriderlocations(response['locations'])
    }

    fetchManager()
    fetchUpcomingCount()
    fetchRiderCount()
    fetchRiderLocations()
  }, [])
  return (
    <Layout isLeftSidebarPresent={false} flex_dir={"col"}>
      <div className="w-full px-10 py-4 border-b-4">
        <div className='text-3xl font-bold pb-5'>
          Welcome Captain Station {manager.name}
        </div>
        <div className='text flex font-bold pb-5 px-4'>
          <TickedWindowIcon  border-radius= "50%" border= "5px solid red" padding=" 5px" fontSize= "30px"/>
          <div className="w-full px-5">
            <div className='text-gs-blue font-bold'>
              Analyze
            </div>
            <div className='text-2xl font-bold'>
              Dashboard
            </div>
            <h4 className="text-md text-[#5F5D59] font-semibold">
                List of items currently in warehouse
              </h4>

              
          </div>
        </div>
      </div>
      <div className="w-full px-10 py-4 border-b-4 bottom-0">
        
        <div className='text-2xl font-bold pb-5'>
          Performance
        </div>
        <div className='text flex font-bold py-5 m-3'>
          <div className="w-full px-5">
          <DroneIcon/>
              <div className='text-2xl font-bold'>
                Upcoming Deliveries
              </div>
              <h4 className="text-md text-[#5F5D59] font-semibold">
                  List of items to be delivered
                </h4>
                <div className='text-2xl font-bold py-4'>
                  {upcomingCount['Upcoming Count']}
                </div>
            </div>
            <div className="w-full px-5">
            <DroneIcon/>
              <div className='text-2xl font-bold'>
                Orders Delivered
              </div>
              <h4 className="text-md text-[#5F5D59] font-semibold">
                  List of items already delivered
                </h4>
                <div className='text-2xl font-bold py-4'>
                {upcomingCount['Delivered Count']}
                </div>
            </div>
            <div className="w-full px-5">
            <DroneIcon/>
              <div className='text-2xl font-bold'>
                Errors
              </div>
              <h4 className="text-md text-[#5F5D59] font-semibold">
                  Orders which faced issued during delivery
                </h4>
                <div className='text-2xl font-bold py-4'>
                  {upcomingCount['Error Count']}
                </div>
            </div>
        </div>
        
      </div>
      <div className="w-full px-10 py-10 border-b-4 bottom-0">
        
        <div className='text-3xl font-bold pb-5'>
          Stations
        </div>
        <div className='text flex font-bold py-5 m-3'>
          <div className="w-full px-5" style={{maxHeight:"100%"}} id="mapbox_div">
          <MapBox markerLocations={riderlocations}/>
          </div>
            <div className="w-full px-5">
            <div className="w-full px-5 py-3 border-b-4">
              <div className="text-2xl font-bold">
                    {riderCount}
                </div>
                <h4 className="text-md text-[#5F5D59] font-semibold">
                    Riders Available
                  </h4>
              </div>
            
              {/* <div className="w-full px-5 py-3 border-b-4">
                <div className="text-2xl font-bold">
                      26
                  </div>
                  <h4 className="text-md text-[#5F5D59] font-semibold">
                      Riders Available
                    </h4>
              </div> */}
            </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default Dashboard;
