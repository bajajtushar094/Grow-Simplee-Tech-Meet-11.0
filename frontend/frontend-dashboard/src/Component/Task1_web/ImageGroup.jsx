import { formHelperTextClasses } from "@mui/material";
import React from "react";

const ImageGroup = () => {
  const array = ["building", "design", "drone", "forest", "ocean"];
  const data = [
    {
      folderName: "order1",
      array: ["building", "design", "drone", "forest", "ocean"],
    },
    {
      folderName: "order2",
      array: ["building", "design", "drone", "forest", "ocean"],
    },
  ];

  return data.map((folder, index) => {
    return (
        <div>
          <h1>{folder.folderName}</h1>
          <div className="flex">
            {folder.array.map((image) => {
              return (
                <img
                  key={image}
                  width={"60px"}
                  className="h-12"
                  src={require(`./images/${folder.folderName}/${image}.jpg`)}
                />
              );
            })}
          </div>
        </div>
    );
  });
};

{
  /*  */
}

export default ImageGroup;
