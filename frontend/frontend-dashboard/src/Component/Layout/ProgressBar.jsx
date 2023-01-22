import React from "react";

const ProgressBar = (props) => {
  return (
    <div className="flex justify-center fixed bottom-0 w-full">
      <div
        className={
          " flex flex-col justify-between h-24 w-2/3 p-2 border-2 border-stone-300 rounded-lg"
        }
      >
        <div className={"flex"}>
          {props.progress === "0" ? (
            <>
              <div className={"w-1/3 rounded-xl h-4 bg-stone-500"} />
              <div className={"w-1/3 rounded-xl h-4 bg-stone-500"} />
              <div className={"w-1/3 rounded-xl h-4 bg-stone-500"} />
            </>
          ) : null}
          {props.progress === "1" ? (
            <>
              <div className={"w-1/3 rounded-xl h-4 bg-green-500"} />
              <div className={"w-1/3 rounded-xl h-4 bg-stone-500"} />
              <div className={"w-1/3 rounded-xl h-4 bg-stone-500"} />
            </>
          ) : null}
          {props.progress === "2" ? (
            <>
              <div className={"w-1/3 rounded-xl h-4 bg-green-500"} />
              <div className={"w-1/3 rounded-xl h-4 bg-green-500"} />
              <div className={"w-1/3 rounded-xl h-4 bg-stone-500"} />
            </>
          ) : null}
          {props.progress === "3" ? (
            <>
              <div className={"w-1/3 rounded-xl h-4 bg-green-500"} />
              <div className={"w-1/3 rounded-xl h-4 bg-green-500"} />
              <div className={"w-1/3 rounded-xl h-4 bg-green-500"} />
            </>
          ) : null}
        </div>
        <div className="flex justify-between">
          <div className="self-end">
            <h1>STEP {props.progress}/3</h1>
            <p>Calculating Volume</p>
          </div>
          <div className="self-end">
            <button className="bg-black text-white rounded-xl py-2 px-4">
              {`Next >`}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
