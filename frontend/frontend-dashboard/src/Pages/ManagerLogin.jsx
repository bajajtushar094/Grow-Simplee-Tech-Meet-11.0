import React from "react";
import GSLogo from "../Shared/Icons/GSLogo";
import RightArrow from "../Shared/Icons/RightArrow";
import BgMap from "../Shared/Images/BgMap.png";
import axios from "axios";
import { LOCAL_SERVER_URL_IP } from "../constants/config";
import setAuthorizationToken, { parseJwt } from "../Component/Auth/setAuthorizationToken";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/actions/auth";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const ManagerLogin = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const navigate = useNavigate();
  const login = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    axios
      .post(`${LOCAL_SERVER_URL_IP}/auth/token/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        const token = res.data.access;
        localStorage.setItem("authTokens", token);
        setAuthorizationToken(token);
        console.log(token);
        console.log(parseJwt(token));
        dispatch(setCurrentUser(parseJwt(token)));
        navigate('/volumeestimation');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className={`flex justify-center items-center h-screen bg-no-repeat bg-cover`}
      style={{ backgroundImage: `url(${BgMap})` }}
    >
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
          <button
            onClick={login}
            className="w-full bg-black rounded-lg text-white text-center p-3"
          >
            Let’s get started <RightArrow className="inline" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerLogin;
