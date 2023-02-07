import React, { useEffect, useState } from "react";
import UploadFileSharpIcon from "@mui/icons-material/UploadFileSharp";
import ListIcon from "../../Shared/Icons/ListIcon";
import axios from "axios";
import Layout from "../Layout";
import ImageGroup from "./ImageGroup";
import OrderList from "../Global/TableOrders";
import RightArrow from "../../Shared/Icons/RightArrow";
import { LOCAL_SERVER_URL_IP } from "../../constants/config";

const UploadZip = () => {
  const [zip, setZip] = useState("");
  const [images, setImages] = useState([]);
  const [fetchedDataObj, setFetchedDataObj] = useState("");

  useEffect(() => {
    console.log(zip);
    const formData = new FormData();
    formData.append("myfile", zip);
    formData.append("order_name", zip.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const url = "http://localhost:8000/core/upload/";
    axios
      .post(url, formData, config)
      .then((res) => {
        // console.log(res);
        const responseDataObj = JSON.parse(res.data);
        setFetchedDataObj(responseDataObj);
        console.log(responseDataObj);
      })
      .catch((err) => console.log(err));
  }, [zip]);

  const handleZipUpload = () => {
    const files = document.getElementById("myfile").files;
    if (files) {
      const myfile = files[0];
      console.log(myfile);
      setZip(myfile);
    }
  };

  // const data = {
  //   folders: [
  //     {
  //       folder1: {
  //         files: ["file1", "file2", "file3"],
  //       },
  //     },
  //   ],
  // };

  const handleImagesUpload = (e) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const startEstimation = () => {
    axios
      .get(`${LOCAL_SERVER_URL_IP}/start-process/`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout isLeftSidebarPresent={false}>
      <div className={`flex flex-row w-full px-20 justify-between`}>
        {/* upload Zip and imgs component */}
        <div className="w-1/2">
          <div>
            <div>
              <h1 className="font-bold w-full text-center mb-10 text-lg">
                Image Volume Estimation
              </h1>
              <div className="bg-white h-fit rounded-xl py-4 w-full flex flex-col items-center align-center">
                <div>
                  <label
                    for="myfile"
                    className="cursor-pointer rounded-full bg-[#C2E7FF] flex justify-center items-center p-4"
                  >
                    <UploadFileSharpIcon style={{ color: "#3544B6" }} />
                  </label>
                  <input
                    id="myfile"
                    name="myfile"
                    type="file"
                    onChange={handleZipUpload}
                    accept=".zip, .rar, .7zip"
                    hidden
                  />
                </div>
                <h2 className="mt-3">
                  <span className="text-sky-500 font-bold">
                    Upload 'Zip' File
                  </span>{" "}
                  to add members in bulk
                </h2>
                <p>
                  .zip supported{" "}
                  <span style={{ textDecoration: "underline" }}>
                    View Sample File
                  </span>
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
                Upload a zip file with the images of packages to get volume
                estimates and to add entry of packages to database
              </p>
            </div>
          </div>
          {fetchedDataObj && fetchedDataObj.folders && (
            <div className="w-full">
              <OrderList data={fetchedDataObj.folders} />
              <button
                onClick={startEstimation}
                className="bg-black text-white p-4 rounded-xl"
              >
                Start Estimation <RightArrow className="inline" />
              </button>
            </div>
          )}
        </div>

        {fetchedDataObj && fetchedDataObj.folders && (
          <div className="max-w-fit">
            <ImageGroup data={fetchedDataObj.folders} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UploadZip;
