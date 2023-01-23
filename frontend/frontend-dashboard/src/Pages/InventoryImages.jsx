import React from "react";
import dummy from "./img1.jpg";
import Layout from "../Component/Layout";
import "./InventoryImages.css";
import RightOrderDetails from "../Component/Layout/RightOrderDetails";

const App = () => {
  return (
    <>
      <div>
        <Layout isLeftSidebarPresent={false}>
          <div className="flex w-full justify-between">
            <div className="flex">
              <img width={"150px"} src={dummy} />
              <img width={"150px"} src={dummy} />
              <img width={"150px"} src={dummy} />
              <img width={"150px"} src={dummy} />
              <img width={"150px"} src={dummy} />
            </div>
            <RightOrderDetails />
          </div>
        </Layout>
      </div>
    </>
  );
};

export default App;
