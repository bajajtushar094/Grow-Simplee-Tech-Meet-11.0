import React from "react";
import { useLocation } from "react-router-dom";
import CubeDimensionsIcon from "../../Shared/Icons/CubeDimensionsIcon";
import CubeIcon from "../../Shared/Icons/CubeIcon";
import DeliveryTruckIcon from "../../Shared/Icons/DeliveryTruckIcon";
import ScaleIcon from "../../Shared/Icons/ScaleIcon";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

const RightOrderDetails = (props) => {
  const location = useLocation();
  // {volume: 228.6639557559244, dimensions: Array(0), shape: 'Cuboid'}
  return (
    <>
      <div>
        <div className="flex justify-end w-full space-x-8 rounded-tl-3xl">
          <div
            className={`flex py-3 space-x-8 border-solid border-l-2 border-t-2 px-8 rounded-tl-sm ${
              props.showDeletePanel === "hide" ? "hidden" : null
            }`}
          >
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

        <div
          className={`flex items-center m-4 ${
            props.orderID === "hide" ? "hidden" : null
          }`}
        >
          <CubeIcon />
          <div className={`ml-2`}>
            <h1 className="text-lg font-bold">34GT23</h1>
            <p style={{ color: "#706D64" }} className="text-xs font-semibold">
              Order ID
            </p>
          </div>
          <hr className="border-stone-300 border-1" />
        </div>
        <div className="flex items-center m-4 ">
          <DeliveryTruckIcon />
          <div className="ml-2">
            <h1 className="text-lg font-bold">{props.details.shape}</h1>
            <p style={{ color: "#706D64" }} className="text-xs font-semibold">
              Shape
            </p>
          </div>
        </div>
        <hr className="border-stone-300 border-1" />
        <div className="flex items-center m-4 ">
          <ScaleIcon />
          <div className="ml-2">
            <h1 className="text-lg font-bold">
              {props.details.volume}
            </h1>
            <p style={{ color: "#706D64" }} className="text-xs font-semibold">
              Volume Estimate ml{" "}
            </p>
          </div>
        </div>
        <hr className="border-stone-300 border-1" />
        <div className="flex items-center m-4 ">
          <CubeDimensionsIcon />
          <div className="ml-2">
            <h1 className="text-lg font-bold">
              {props.details.dimensions.length === 3
                ? props.details.dimensions[0] +
                  "x" +
                  props.details.dimensions[1] +
                  "x" +
                  props.details.dimensions[2]
                : "-- x -- x --"}
            </h1>
            <p style={{ color: "#706D64" }} className="text-xs font-semibold">
              LxBxH cm{" "}
            </p>
          </div>
        </div>
        <hr className="border-stone-300 border-1" />
      </div>
    </>
  );
};

export default RightOrderDetails;
