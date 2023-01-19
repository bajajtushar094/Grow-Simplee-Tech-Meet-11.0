import React from "react";
import "./UploadZip.css";
import UploadFileSharpIcon from "@mui/icons-material/UploadFileSharp";

const UploadZip = () => {
  return (
    <div className="bg-white h-fit rounded-xl p-4 w-2/5 flex flex-col items-center align-center">
      <div class="file">
        <label for="input-file">
          <UploadFileSharpIcon style={{ color: "#3544B6" }} />
        </label>
        <input id="input-file" type="file" />
      </div>
      <h2 className="mt-3">
        <span className="text-sky-500 font-bold">Upload 'Zip' File</span> to add
        members in bulk
      </h2>
      <p>
        .zip supported{" "}
        <span style={{ textDecoration: "underline" }}>View Sample File</span>
      </p>
    </div>
  );
};

export default UploadZip;
