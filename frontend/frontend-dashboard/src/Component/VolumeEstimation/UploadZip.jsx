import React, { useEffect, useState } from "react";
import UploadFileSharpIcon from "@mui/icons-material/UploadFileSharp";
import ListIcon from "../../Shared/Icons/ListIcon";
import axios from "axios";
import Layout from "../Layout";
import ImageGroup from "./ImageGroup";
import OrderList from "../Global/TableOrders";

const UploadZip = () => {
  const [zip, setZip] = useState("");
  const [images, setImages] = useState([]);
  const [fetchedDataObj, setFetchedDataObj] = useState();
  useEffect(() => {
    console.log(fetchedDataObj);
  }, [fetchedDataObj]);
  const handleZipUpload = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setZip(e.target.files[0]);

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
      console.log(e.target.files);
      setImages(e.target.files);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <Layout isLeftSidebarPresent={false}>
        <div className="w-full flex justify-around h-full mt-10">
          <div>
            <h1 className="font-bold w-full text-center my-10 text-lg">
              Image Volume Estimation
            </h1>
            <div className="bg-white h-fit rounded-xl py-4 px-40 w-full flex flex-col items-center align-center">
              <div class="file">
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
              You can only add from integrated chargepoints on ChargeConnect
            </p>
          </div>
          {fetchedDataObj && (
            <div>
              <ImageGroup data={fetchedDataObj.folders} />
            </div>
          )}
        </div>
      </Layout>
      <OrderList />
    </div>
  );
};

export default UploadZip;
