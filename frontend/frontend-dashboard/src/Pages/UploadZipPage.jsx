import React from "react";
import Layout from "../Component/Layout";
import ImageGroup from "../Component/Task1_web/ImageGroup";
import UploadZip from "../Component/Task1_web/UploadZip";
const UploadZipPage = () => {
  return (
    <div className="h-screen">
      <Layout isLeftSidebarPresent={false}>
        <div className="w-full flex justify-around h-full mt-10">
          <UploadZip />
          <div>
            <ImageGroup />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default UploadZipPage;
