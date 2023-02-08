import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GSLogo from "../../Shared/Icons/GSLogo";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoggedIn,
  getIsBagScanned,
  setLoggedIn,
  setUserId,
  setBagId,
  setTripId,
  setIsBagScanned,
  addPackages,
} from "../../features/rider/riderSlice";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedIn = useSelector(getLoggedIn);
  const isBagScanned = useSelector(getIsBagScanned);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    const response = await fetch(" http://127.0.0.1:8000/core/rider/" + id);
    const rider = await response.json();
    console.log(rider);
    if (rider.current_trip_id) {
      dispatch(setTripId(rider.current_trip_id));
      const response1 = await fetch(
        " http://127.0.0.1:8000/core/trip/" + rider.current_trip_id
      );
      const orders = await response1.json();
      console.log(orders);
      let packages = [];
      orders.forEach((order) => {
        const item = {
          name: order.owner_name,
          orderId: order.order_id,
          isInBag: false,
          isCancelled: false,
          isDelivered: false,
          isFailed: false,
          latitude: parseFloat(order.latitude),
          longitude: parseFloat(order.longitude),
          type: "delivery",
          textAddress: order.address_name,
          isNew: false,
        };
        packages.push(item);
      });
      dispatch(addPackages(packages));
    }
    dispatch(setLoggedIn({ loggedIn: true, id: id }));
    dispatch(setUserId(id));
    dispatch(setBagId("RO10-445"));
    dispatch(setIsBagScanned(false));
    navigate("/scanQR", {
      state: {
        //id: id,
        //bagId: 'RO10-445',
        type: "scanBag",
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "123") {
      login();
    } else {
      setError("Wrong Credentials!");
    }
  };

  if (loggedIn) {
    if (isBagScanned) {
      navigate("/createBag");
    } else {
      login();
    }
  }

  return (
    <div className="flex flex-col h-screen items-center bg-[#F8F8F7]">
      <div className="flex-row w-full justify-center bg-white px-4 py-5 items-center border-b border-[#D2D1CC]">
        <h4 className="text-sm text-gs-text-gray font-semibold text-center">
          Login
        </h4>
      </div>
      <div className="p-4">
        <GSLogo />
      </div>
      <form
        className="flex-col relative mx-4"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          onChange={(e) => {
            setId(e.target.value);
          }}
          value={id}
          name="id"
          type="text"
          placeholder="Employee ID / Contact Number"
          className="text-[12px] text-[#777777] w-full border border-solid border-[#D2D1CC] rounded-full px-5 py-[14px] mt-5 mb-3"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          name="password"
          type="password"
          placeholder="Password"
          className="text-[12px] text-[#777777] w-full border border-solid border-[#D2D1CC] rounded-full px-5 py-[14px] mb-3"
        />
        <button
          type="submit"
          className="text-[16px] font-semibold text-white w-full bg-[#2F2E36] rounded-full p-3 mb-3 mt-16"
        >
          Login
        </button>
      </form>
      <div className="text-[12px] text-[#2F2E36] text-center w-full p-1">
        <Link to="/login">Forgot Password?</Link>
      </div>
      <div className="text-center w-full py-6 text-[#aa0000] px-4 font-medium text-[14px]">
        {error}
      </div>
    </div>
  );
};

export default Login;
