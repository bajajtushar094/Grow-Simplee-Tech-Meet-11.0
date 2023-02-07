import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
// import Webcam from "../Component/VolumeEstimation/Webcam";
import RightSideBar from "../Component/Layout/RightSidebar";
import ProgressBar from "../Component/Layout/ProgressBar";
import axios from "axios";
import { LOCAL_SERVER_URL_IP, LOCALHOST_URL } from "../constants/config";
import RightArrow from "../Shared/Icons/RightArrow";
import RightOrderDetails from "../Component/Layout/RightOrderDetails";

const App = () => {
  const [src, setSrc] = useState("");
  const [src2, setSrc2] = useState("");
  const [currentFolder, setCurrentFolder] = useState(1);

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
    // if (currentFolder >= 2) return;
    axios
      .get(`${LOCAL_SERVER_URL_IP}/start-process/`)
      .then((res) => {
        console.log(res);
        setCurrentFolder(() => 2);
        updateImg(currentFolder);
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
        updateImg(currentFolder);
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
          return parseInt(currentFolder) + 1;
        });
        updateImg(currentFolder);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout isLeftSidebarPresent={false}>
      {/* <RightSideBar /> */}
      <div className="absolute right-10 w-1/4">
        <RightOrderDetails
          details={orderDetails}
          showDeletePanel="hide"
          orderID="hide"
        />
      </div>
      <div className="absolute left-10 w-2/3">
        <div className="w-1/2 max-h-16 flex justify-between">
          <button
            onClick={() => {
              console.log("process started");
              startEstimation();
            }}
            className={`bg-black text-white p-4 rounded-xl w-48 ${
              currentFolder !== 1 ? "cursor-default" : null
            }`}
          >
            {currentFolder === 1 ? "Start Estimation" : "Restart"}{" "}
            <RightArrow className="inline" />
          </button>
          <button
            className="bg-black text-white p-4 rounded-xl w-32"
            onClick={nextFolder}
          >
            Next {currentFolder - 1}
          </button>
        </div>
        {src && src2 && (
          <div className="flex w-full justify-between my-10">
            <div style={{ width: "450px", height: "340px" }}>
              <h1>Color Image</h1>
              <div className="flex items-center">
                <img
                  alt="Depth Image"
                  src={src}
                  style={{ width: "auto", maxHeight: "340px" }}
                />
              </div>
            </div>
            <div style={{ width: "450px", height: "340px" }}>
              <h1>Depth Image</h1>
              <img
                alt="Depth Image"
                src={src2}
                style={{ width: "auto", maxHeight: "340px" }}
              />
            </div>
          </div>
        )}
      </div>
      {/* <ProgressBar progress="1"/> */}
    </Layout>
  );
};

export default App;
