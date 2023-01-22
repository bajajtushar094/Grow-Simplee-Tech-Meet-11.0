import React from "react";
import dummy from "./img1.jpg";
import Layout from "../Component/Layout";
import "./InventoryImages.css";

const App = () => {
  return (
    <>
      <Layout>
        <img width={"200px"} src={dummy} />
        <img width={"200px"} src={dummy} />
        <img width={"200px"} src={dummy} />
        <img width={"200px"} src={dummy} />
        <img width={"200px"} src={dummy} />
      </Layout>
    </>
  );
};

export default App;
