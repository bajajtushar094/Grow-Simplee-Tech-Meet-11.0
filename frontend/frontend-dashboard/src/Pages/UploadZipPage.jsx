import React from "react";
import Layout from "../Component/Layout";
import RightOrderDetails from "../Component/Layout/RightOrderDetails";
import UploadZip from "../Component/Layout/UploadZip";
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
