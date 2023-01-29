import React from "react";

const RightSideBarCard = (props) => {
  return (
    <div className={"rounded-lg border-2 border-stone-300 my-4 mx-2 p-4 " + props.border}>
      <p className={"text-xs font-semibold mb-3 text-green-600 " + props.color} style={{color:"#98A2B3"}}>STEP {props.number}/3</p>
      <h1 className="text-md text-gray-500 font-bold">{props.heading}</h1>
      <p className="text-sm text-gray-500 font-medium">{props.description}</p>
    </div>
  );
};

export default RightSideBarCard;
