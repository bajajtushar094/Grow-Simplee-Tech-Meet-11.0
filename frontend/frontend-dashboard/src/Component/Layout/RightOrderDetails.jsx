import React from "react";
import { useLocation } from "react-router-dom";
import CubeDimensionsIcon from "../../Shared/Icons/CubeDimensionsIcon";
import CubeIcon from "../../Shared/Icons/CubeIcon";
import DeliveryTruckIcon from "../../Shared/Icons/DeliveryTruckIcon";
import ScaleIcon from "../../Shared/Icons/ScaleIcon";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

const RightOrderDetails = () => {
  const location = useLocation();
  return (
    <>
      <div className="w-1/5 mr-10">
        <div className="flex justify-end w-full space-x-8 rounded-tl-3xl">
          <div className="flex py-3 space-x-8 border-solid border-l-2 border-t-2  px-8 rounded-tl-sm ">
            <KeyboardDoubleArrowRightOutlinedIcon className="cursor-pointer" />
            <button className="text-gs-black text-sm font-semibold">
              <FileDownloadIcon fontSize="medium" /> Download
            </button>
            <button className="text-gs-black text-sm font-semibold">
              <ContentCopyOutlinedIcon fontSize="small" /> Delete
            </button>
            <button className="text-gs-black text-sm font-semibold">
              <FileDownloadIcon fontSize="medium" />
              Move
            </button>
            <button className="text-gs-black text-sm font-semibold">
              <ContentCopyOutlinedIcon fontSize="small" />
              Copy
            </button>
          </div>
        </div>

        <div className="flex items-center m-4 ">
          <CubeIcon />
          <div className="ml-2">
            <h1 className="text-lg font-bold">34GT23</h1>
            <p style={{ color: "#706D64" }} className="text-xs font-semibold">
              Order ID
            </p>
          </div>
        </div>
        <hr className="border-stone-300 border-1" />
        <div className="flex items-center m-4 ">
          <DeliveryTruckIcon />
          <div className="ml-2">
            <h1 className="text-lg font-bold">15/01/23</h1>
            <p style={{ color: "#706D64" }} className="text-xs font-semibold">
              Expected Date of Delivery
            </p>
          </div>
        </div>
        <hr className="border-stone-300 border-1" />
        <div className="flex items-center m-4 ">
          <ScaleIcon />
          <div className="ml-2">
            <h1 className="text-lg font-bold">45</h1>
            <p style={{ color: "#706D64" }} className="text-xs font-semibold">
              Volume Estimate ml{" "}
            </p>
          </div>
        </div>
        <hr className="border-stone-300 border-1" />
        <div className="flex items-center m-4 ">
          <CubeDimensionsIcon />
          <div className="ml-2">
            <h1 className="text-lg font-bold">34x34x23</h1>
            <p style={{ color: "#706D64" }} className="text-xs font-semibold">
              LxBxH cm{" "}
            </p>
          </div>
        </div>
        <hr className="border-stone-300 border-1" />
        <button className="bg-black text-white mt-12 p-4 w-full rounded-lg">
          {location.pathname === "/uploadzip"
            ? "View in detail ->"
            : "Go to Inventory ->"}
        </button>
      </div>
    </>
  );
};

export default RightOrderDetails;
