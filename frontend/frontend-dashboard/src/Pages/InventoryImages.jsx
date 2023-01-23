import React from "react";
import dummy from "./img1.jpg";
import Layout from "../Component/Layout";
import "./InventoryImages.css";
import RightOrderDetails from "../Component/Layout/RightOrderDetails";

const App = () => {
  return (
    <>
      <div className="flex">
        <Layout isLeftSidebarPresent={false}>
          <img width={"150px"} height={"100px"} src={dummy} />
          <img width={"150px"} src={dummy} />
          <img width={"150px"} src={dummy} />
          <img width={"150px"} src={dummy} />
          <img width={"150px"} src={dummy} />
        <RightOrderDetails />
        </Layout>
      </div>
    </>
  );
};

export default App;
