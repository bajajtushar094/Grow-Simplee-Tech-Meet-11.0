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

const Dashboard = () => {
  const [manager, setManager] = useState({})
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch("http://localhost:8000/core/manager")
      const response = await res.json()
      console.log(response)
      setManager(response.manager[0])
    }
    fetchData()
  }, [])
  return (
    <Layout isLeftSidebarPresent={false} flex_dir={"col"}>
      <div className="w-full px-10 py-4 border-b-4">
        <div className='text-3xl font-bold pb-5'>
          Welcome Captain Station {manager.name}
        </div>
        <div className='text flex font-bold pb-5 px-4'>
          <TickedWindowIcon  border-radius= "50%" border= "5px solid red" padding=" 5px" font-size= "30px"/>
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
                Dashboard
              </div>
              <h4 className="text-md text-[#5F5D59] font-semibold">
                  List of items currently in warehouse
                </h4>
                <div className='text-2xl font-bold py-4'>
                  12
                </div>
            </div>
            <div className="w-full px-5">
            <DroneIcon/>
              <div className='text-2xl font-bold'>
                Dashboard
              </div>
              <h4 className="text-md text-[#5F5D59] font-semibold">
                  List of items currently in warehouse
                </h4>
                <div className='text-2xl font-bold py-4'>
                  12
                </div>
            </div>
            <div className="w-full px-5">
            <DroneIcon/>
              <div className='text-2xl font-bold'>
                Dashboard
              </div>
              <h4 className="text-md text-[#5F5D59] font-semibold">
                  List of items currently in warehouse
                </h4>
                <div className='text-2xl font-bold py-4'>
                  12
                </div>
            </div>
        </div>
        
      </div>
      <div className="w-full px-10 py-10 border-b-4 bottom-0">
        
        <div className='text-3xl font-bold pb-5'>
          Stations
        </div>
        <div className='text flex font-bold py-5 m-3'>
          <div className="w-full px-5">
          <img src='./Left-Wrapper.png' alt="Image of map" />
            </div>
            <div className="w-full px-5">
            <div className="w-full px-5 py-3 border-b-4">
              <div className="text-2xl font-bold">
                    26
                </div>
                <h4 className="text-md text-[#5F5D59] font-semibold">
                    Riders Available
                  </h4>
              </div>
            
              <div className="w-full px-5 py-3 border-b-4">
                <div className="text-2xl font-bold">
                      26
                  </div>
                  <h4 className="text-md text-[#5F5D59] font-semibold">
                      Riders Available
                    </h4>
              </div>
            </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default Dashboard;
