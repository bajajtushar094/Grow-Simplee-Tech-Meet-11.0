import React from "react";
import RightSideBarCard from "./RightSideBarCard";

const RightSideBar = () => {
  return (
    <div className="w-96 mr-6 fixed right-0">
      <br />
      <RightSideBarCard
        number="1"
        heading="Point Cloud Generation"
        description="Description"
      />
      <RightSideBarCard
        number="1"
        heading="Point Cloud Generation"
        description="Description"
      />
      <RightSideBarCard
        number="1"
        heading="Point Cloud Generation"
        description="Description"
      />
      <div className="mr-4">
        <button className="bg-black text-white ml-2 p-4 w-full rounded-lg">
          {"Go to Inventory ->"}
        </button>
      </div>
    </div>
  );
};

export default RightSideBar;
