import React from "react";
import GSLogo from "../Shared/Icons/GSLogo";
import RightArrow from "../Shared/Icons/RightArrow";
import BgMap from "../Shared/Images/BgMap.png"

const ManagerLogin = () => {
  return (
    <div className={`flex justify-center items-center h-screen bg-no-repeat bg-cover`} style={{backgroundImage:`url(${BgMap})`}}>
      <div className="w-1/3 h-3/4 p-20 bg-[#FFFFFF] flex flex-col justify-between">
        <div>
          <GSLogo />
          <h1 className="text-3xl font-semibold mt-1">Login</h1>
        </div>
        <div>
          <div className="mb-3">
            <label htmlFor="username" className="block font-bold text-md mb-1">
              Email ID / Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username or email id"
              className="w-full p-4 rounded-lg text-md font-normal text-[#272520] bg-[#F8F8F7]"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block font-bold text-md mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-4 rounded-lg text-md font-normal text-[#272520] bg-[#F8F8F7]"
            />
          </div>
          <div>
            <a href="#" className="text-blue-500 text-sm underline">
              Forgot password? Let’s reset it.
            </a>
          </div>
        </div>
        <div>
          <button className="w-full bg-black rounded-lg text-white text-center p-3">
            Let’s get started <RightArrow className="inline"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerLogin;
