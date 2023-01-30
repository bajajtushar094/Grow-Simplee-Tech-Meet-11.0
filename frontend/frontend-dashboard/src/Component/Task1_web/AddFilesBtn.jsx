import React from "react";
import ListIcon from "../../Shared/Icons/ListIcon";

const AddFilesBtn = () => {
  return (
    <div>
      <button className="border-1 border-stone-300 bg-white px-4 py-3 rounded flex items-center justify-between w-1/3 font-semibold text-[#344054]">
        <ListIcon />
        Choose files to add
        <input id="input-file" type="file" />
      </button>
      <p className="mt-2 text-sm">
        You can only add from integrated chargepoints on ChargeConnect
      </p>
    </div>
  );
};

export default AddFilesBtn;
