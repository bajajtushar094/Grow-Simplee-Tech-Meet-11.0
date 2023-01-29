import React from "react";
import Layout from "../Component/Layout";
import Webcam from "../Component/VolumeEstimation/Webcam";
import RightSideBar from "../Component/Layout/RightSidebar";
import ProgressBar from "../Component/Layout/ProgressBar";

const App = () => {
  return (
    <Layout isLeftSidebarPresent={true}>
      <RightSideBar />
      <ProgressBar progress="1"/>
    </Layout>
  );
};

export default App;
