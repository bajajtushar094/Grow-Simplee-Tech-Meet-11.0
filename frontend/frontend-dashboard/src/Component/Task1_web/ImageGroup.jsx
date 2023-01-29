import React from "react";

const ImageGroup = () => {
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
        <div className="mb-8">
          <h1 className="ml-4">{folder.folderName}</h1>
          <div className="flex">
            {folder.array.map((image) => {
              return (
                <img
                  key={image}
                  width={"60px"}
                  className="h-12 m-4"
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
