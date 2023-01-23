import React from "react";
import Layout from "../Component/Layout";
import RightSideBar from "../Component/Layout/RightSidebar";
import UploadZip from "../Component/Layout/UploadZip";
const UploadZipPage = () => {
  return (
    <div>
      <Layout isLeftSidebarPresent={false}>
        <UploadZip />
        <RightSideBar />
      </Layout>
    </div>
  );
};

export default UploadZipPage;
