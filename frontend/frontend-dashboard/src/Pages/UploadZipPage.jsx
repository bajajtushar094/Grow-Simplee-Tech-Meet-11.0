import React from "react";
import Layout from "../Component/Layout";
import ImageGroup from "../Component/VolumeEstimation/ImageGroup";
import UploadZip from "../Component/VolumeEstimation/UploadZip";
const UploadZipPage = () => {
  return (
        <div>
          <UploadZip />
          <div>
            <ImageGroup />
          </div>
        </div>

  );
};

export default UploadZipPage;
