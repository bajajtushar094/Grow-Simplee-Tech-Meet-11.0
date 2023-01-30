import React, { useState } from "react";
import RightSideBarCard from "./RightSideBarCard";

const RightSideBar = () => {
  const [progress, setProgress] = useState(1);
  return (
    <div className="w-96 mr-6 fixed right-0">
      <br />
      <RightSideBarCard
        border="border-green-600"
        color="text-green-600"
        number="1"
        heading="Depth Map and Segmentation"
        description="View the masks for each object."
      />
      <RightSideBarCard
        number="2"
        heading="Point Cloud Generation"
        description="View the high resolution point cloud."
      />
      <RightSideBarCard
        number="3"
        heading="Volume Calculation"
        description="View the convex hull of the point cloud."
      />
      <div className="mr-4">
        <button
          className="bg-black text-white ml-2 p-4 w-full rounded-lg"
        >
          {"See all incoming items ->"}
        </button>
      </div>
    </div>
  );
};

export default RightSideBar;
