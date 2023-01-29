import React from "react";
import Layout from "../Component/Layout";
import Webcam from "../Component/Task1_web/Webcam";
import RightSideBar from "../Component/Layout/RightSidebar";
import ProgressBar from "../Component/Layout/ProgressBar";

const App = () => {
  return (
    <Layout isLeftSidebarPresent={false}>
      <RightSideBar />
      <ProgressBar progress="1"/>
    </Layout>
  );
};

export default App;
