import React from "react";
import "./UploadZip.css";
import UploadFileSharpIcon from "@mui/icons-material/UploadFileSharp";
import AddFilesBtn from "./AddFilesBtn";

const UploadZip = () => {
  return (
    <div className="ml-10">
      <div className="bg-white h-fit rounded-xl py-4 px-40 w-full flex flex-col items-center align-center">
        <div class="file">
          <label for="input-file">
            <UploadFileSharpIcon style={{ color: "#3544B6" }} />
          </label>
          <input id="input-file" type="file" />
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
      <AddFilesBtn style={{marginTop:"40px"}} />
    </div>
  );
};

export default UploadZip;
