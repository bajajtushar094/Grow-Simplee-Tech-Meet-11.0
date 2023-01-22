import React from "react";

const RightSideBarCard = (props) => {
  return (
    <div className="rounded border-2 border-stone-400 m-2 p-4 ">
      <p>STEP {props.number}/3</p>
      <h1>{props.heading}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default RightSideBarCard;
