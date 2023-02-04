import React from "react";

const ImageGroup = (props) => {
  // const data = [
  //   {
  //     folderName: "order1",
  //     files: ["building", "design", "drone", "forest", "ocean"],
  //   },
  //   {
  //     folderName: "order2",
  //     files: ["building", "design", "drone", "forest", "ocean"],
  //   },
  // ];
  const data = props.data;

  return data.map((folder, index) => {
    return (
        <div className="mb-8">
          <h1 className="ml-4">{folder.folderName}</h1>
          <div className="flex">
            {folder.files.map((image) => {
              return (
                <img
                  key={image}
                  width={"60px"}
                  className="h-12 m-4"
                  // src={require(`./images/${folder.folderName}/${image}.jpg`)}
                  src = {image}
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
