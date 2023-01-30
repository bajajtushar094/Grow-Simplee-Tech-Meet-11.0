import React, { useState } from "react";
import UploadFileSharpIcon from "@mui/icons-material/UploadFileSharp";
import ListIcon from "../../Shared/Icons/ListIcon";

const UploadZip = () => {
  const [zip, setZip] = useState("");
  const [images, setImages] = useState([]);
  const handleZipUpload = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setZip(e.target.files[0])
    }
  };
  const handleImagesUpload = (e) => {
    if (e.target.files) {
      console.log(e.target.files);
      setImages(e.target.files);
    }
  };
  return (
    <div className="ml-5">
      <h1 className="font-bold w-full text-center my-10 text-lg">
        Image Volume Estimation
      </h1>
      <div className="bg-white h-fit rounded-xl py-4 px-40 w-full flex flex-col items-center align-center">
        <div class="file">
          <label
            for="input-file"
            className="cursor-pointer rounded-full bg-[#C2E7FF] flex justify-center items-center p-4"
          >
            <UploadFileSharpIcon style={{ color: "#3544B6" }} />
          </label>
          <input
            id="input-file"
            type="file"
            onChange={handleZipUpload}
            accept=".zip, .rar, .7zip"
            hidden
          />
        </div>
        <h2 className="mt-3">
          <span className="text-sky-500 font-bold">Upload 'Zip' File</span> to
          add members in bulk
        </h2>
        <p>
          .zip supported{" "}
          <span style={{ textDecoration: "underline" }}>View Sample File</span>
        </p>
      </div>
      <hr className="border-1 border-stone-300 my-10" />
      <button className="border-1 border-stone-300 bg-white px-4 py-3 rounded flex items-center justify-between w-1/3 font-semibold text-[#344054]">
        <ListIcon />
        <label for="input-file-img" className="cursor-pointer">
          Choose files to add
        </label>
        <input
          id="input-file-img"
          type="file"
          onChange={handleImagesUpload}
          accept=".jpg, .png"
          multiple
          hidden
        />
      </button>
      <p className="mt-2 text-sm">
        You can only add from integrated chargepoints on ChargeConnect
      </p>
    </div>
  );
};

export default UploadZip;
