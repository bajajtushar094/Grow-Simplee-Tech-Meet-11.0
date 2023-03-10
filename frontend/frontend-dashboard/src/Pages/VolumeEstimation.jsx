import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
import axios from "axios";
import { LOCAL_SERVER_URL_IP, LOCALHOST_URL } from "../constants/config";
import RightArrow from "../Shared/Icons/RightArrow";
import RightOrderDetails from "../Component/Layout/RightOrderDetails";
import RaiseIssueIcon from "../Shared/Icons/RaiseIssueIcon";
import IssueStatusIcon from "../Shared/Icons/IssueStatusIcon";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [src, setSrc] = useState("");
  const [src2, setSrc2] = useState("");
  const [currentFolder, setCurrentFolder] = useState(0);

  const [orderDetails, setOrderDetails] = useState({
    volume: "-----",
    dimensions: Array(0),
    shape: "-----",
  });
  let howManyOrders;

  const updateImg = (currentFolder) => {
    const temp_src1 = `${LOCALHOST_URL}/static/folder${currentFolder}/color_image.png/`;
    const temp_src2 = `${LOCALHOST_URL}/static/folder${currentFolder}/depth_image.png/`;
    setSrc(temp_src1);
    setSrc2(temp_src2);
  };
  const startEstimation = () => {
    if (currentFolder >= 1) setCurrentFolder(() => 0);
    axios
      .get(`${LOCAL_SERVER_URL_IP}/start-process/`)
      .then((res) => {
        console.log(res);
        setCurrentFolder(() => 2);
        console.log(currentFolder);
        updateImg(currentFolder + 1);
        howManyOrders = res.data.howManyOrders;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${LOCAL_SERVER_URL_IP}/orders/json/` + 1)
      .then((res) => {
        console.log(res.data);
        setOrderDetails(res.data.details);
        setCurrentFolder((currentFolder) => {
          return currentFolder + 1;
        });
        updateImg(currentFolder + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nextFolder = () => {
    const nextFolder = parseInt(currentFolder) + 1;
    axios
      .get(`${LOCAL_SERVER_URL_IP}/orders/json/` + nextFolder)
      .then((res) => {
        console.log(res.data);
        setOrderDetails(res.data.details);
        setCurrentFolder((currentFolder) => {
          return currentFolder + 1;
        });
        updateImg(nextFolder);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout isLeftSidebarPresent={false}>
      {/* <RightSideBar /> */}
      <div className="absolute left-0 w-1/4">
        <div className="ml-10 mt-20">
          <h4 className="text-sm font-semibold text-[#706D64]">ACTIONS</h4>
          <button
            onClick={() => {
              console.log("process started");
              startEstimation();
            }}
            className={`bg-green-500 block mt-4 mb-4 text-white px-4 py-2 rounded-xl w-32`}
          >
            {currentFolder === 0 ? "Start" : "Restart"}{" "}
            <RightArrow className="inline" />
          </button>
          {currentFolder !== 0 ? (
            <button
              className="bg-black text-white px-4 py-2 rounded-xl w-32"
              onClick={nextFolder}
            >
              {/* Next {currentFolder + 1} */}
              Next
              <RightArrow className="inline ml-2" />
            </button>
          ) : null}
        </div>
        {/* <div className="ml-10 mt-20">
          <h4 className="text-sm font-semibold text-[#706D64]">SUPPORT</h4>
          <button className="block mt-6 ml-4 text-sm text-[#706D64] flex">
            {" "}
            <RaiseIssueIcon style={{ marginRight: "6px" }} /> Raise Issue
          </button>
          <button className="block mt-6 ml-4 text-sm text-[#706D64] flex justify-between">
            {" "}
            <IssueStatusIcon style={{ marginRight: "6px" }} /> Issue Status
          </button>
        </div> */}
      </div>

      <div className="absolute right-10 w-1/5">
        <RightOrderDetails
          details={orderDetails}
          showDeletePanel="hide"
          orderID="hide"
        />
      </div>
      <div className="absolute w-1/2" style={{ marginLeft: "250px" }}>
        <div className="w-1/2 max-h-16 flex justify-between"></div>
        {src && src2 && (
          <>
            <h1 className="text-2xl font-bold">8954DS</h1>
            <h1 className="text-sm font-semibold text-[#706D64]">Object ID</h1>
            <div className="flex w-full justify-between my-10">
              <div style={{ width: "360px", height: "auto" }}>
                <h1 className="font-bold">RGB Image</h1>
                <div className="flex items-center">
                  <img
                    alt="Depth Image"
                    src={src}
                    style={{ width: "auto", maxHeight: "340px" }}
                    className="rounded-2xl"
                  />
                </div>
              </div>
              <div style={{ width: "360px", height: "auto" }} className="ml-2">
                <h1 className="font-bold">Heat Map</h1>
                <img
                  alt="Depth Image"
                  src={src2}
                  style={{ width: "auto", maxHeight: "340px" }}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </>
        )}
        {currentFolder !== 0 ? (
          <div style={{position:"absolute", marginLeft:"70vw"}}>
          <button
            className="bg-black text-white px-4 py-2 rounded-xl w-40"
            onClick={()=>{
              navigate('/dashboard')
            }}
          >
            {/* Next {currentFolder + 1} */}
            Dashboard
            <RightArrow className="inline ml-2" />
          </button>
          </div>
        ) : null}
      </div>

      {/* <ProgressBar progress="1"/> */}
    </Layout>
  );
};

export default App;
