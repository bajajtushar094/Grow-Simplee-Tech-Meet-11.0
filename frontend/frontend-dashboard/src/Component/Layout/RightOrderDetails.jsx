import React from "react";
import CubeDimensionsIcon from "../../Shared/Icons/CubeDimensionsIcon";
import CubeIcon from "../../Shared/Icons/CubeIcon";
import DeliveryTruckIcon from "../../Shared/Icons/DeliveryTruckIcon";
import ScaleIcon from "../../Shared/Icons/ScaleIcon";

const RightOrderDetails = () => {
  return (
    <div className="w-1/5">
      <div className="flex items-center m-2 ">
        <CubeIcon />
        <div className="ml-2">
          <h1 className="text-lg font-bold">34GT23</h1>
          <p style={{ color: "#706D64" }} className="text-xs font-semibold">
            Order ID
          </p>
        </div>
      </div>
      <hr className="border-stone-400 border-1" />
      <div className="flex items-center m-2 ">
        <DeliveryTruckIcon />
        <div className="ml-2">
          <h1 className="text-lg font-bold">15/01/23</h1>
          <p style={{ color: "#706D64" }} className="text-xs font-semibold">
            Expected Date of Delivery
          </p>
        </div>
      </div>
      <hr className="border-stone-400 border-1" />
      <div className="flex items-center m-2 ">
        <ScaleIcon />
        <div className="ml-2">
          <h1 className="text-lg font-bold">45</h1>
          <p style={{ color: "#706D64" }} className="text-xs font-semibold">
            Volume Estimate ml{" "}
          </p>
        </div>
      </div>
      <hr className="border-stone-400 border-1" />
      <div className="flex items-center m-2 ">
        <CubeDimensionsIcon />
        <div className="ml-2">
          <h1 className="text-lg font-bold">34x34x23</h1>
          <p style={{ color: "#706D64" }} className="text-xs font-semibold">
            LxBxH cm{" "}
          </p>
        </div>
      </div>
      <hr className="border-stone-400 border-1" />
      <button className="bg-black text-white mt-2 p-4 w-full rounded-lg">
        Go to Inventory {"->"}
      </button>
    </div>
  );
};

export default RightOrderDetails;
