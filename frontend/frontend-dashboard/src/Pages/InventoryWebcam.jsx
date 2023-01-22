import React from "react";
import Layout from "../Component/Layout";
import Webcam from "../Component/Layout/Webcam";
import RightSideBar from "../Component/Layout/RightSidebar";

const App = () => {
  return (
    <Layout>
      <Webcam />
      <RightSideBar />
    </Layout>
  );
};

export default App;
