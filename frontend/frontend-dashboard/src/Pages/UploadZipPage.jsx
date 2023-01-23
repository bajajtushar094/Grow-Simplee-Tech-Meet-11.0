import React from "react";
import Layout from "../Component/Layout";
import RightOrderDetails from "../Component/Layout/RightOrderDetails";
import UploadZip from "../Component/Task1_web/UploadZip";
const UploadZipPage = () => {
  return (
    <div>
      <Layout isLeftSidebarPresent={false}>
        <div className="flex w-full justify-between">
          <UploadZip />
          <RightOrderDetails />
        </div>
      </Layout>
    </div>
  );
};

export default UploadZipPage;
