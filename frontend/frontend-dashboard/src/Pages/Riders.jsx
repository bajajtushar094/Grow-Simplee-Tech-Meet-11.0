import React from "react";
import { useParams } from "react-router-dom";
import Table from "../Component/Global/TableRiders";
import Layout from "../Component/Layout";
import PlayListAddCheckIcon from "../Shared/Icons/CameraIcon";

const Riders = () => {
  let { riderTab } = useParams();

  return (
    <Layout isLeftSidebarPresent={false}>
      <div className="bg-white rounded-tl-3xl border-2 w-full">
        <div className="flex pb-4 pt-6 px-8">
          <div>
            <PlayListAddCheckIcon />
          </div>
          <div className="pl-4 w-full">
            <div className="flex justify-between w-full">
              <h4 className="text-gs-blue text-sm font-semibold">Riders</h4>
              <div className="flex space-x-6"></div>
            </div>
            <h2 className="text-xl font-semibold">List</h2>
            <h4 className="text-md text-[#5F5D59] font-semibold">
              List of all the riders in your network
            </h4>
          </div>
        </div>
        <Table tab={riderTab} />
      </div>
    </Layout>
  );
};

export default Riders;