import { React, useState } from "react";
import MobileLayout from "../../Component/Layout/MobileLayout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useSelector, useDispatch } from "react-redux";
import {
  getPackages,
  getIsBagScanned,
  setIsDelivered,
  setIsFailed,
  getLoggedIn,
} from "../../features/rider/riderSlice";

const Verification = (props) => {
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedIn = useSelector(getLoggedIn);
  if (!loggedIn) {
    navigate("/login");
  }

  const packages = useSelector(getPackages);
  const location = useLocation();
  const isBagScanned = useSelector(getIsBagScanned);

  const orderId = location.state.orderId;
  let item = null;

  if (!isBagScanned) {
    navigate("/login");
  }

  //if(orderId){
  item = packages.find((p) => p.orderId === orderId);
  /* }else{
        dispatch(setIsAtWarehouse(true));
        navigate('/checklist');
    } */

  const updateOtp = async (otp) => {
    setOtp(otp);
    if (otp.length === 4) {
      if (otp === "1234") {
        dispatch(setIsDelivered({ orderId: item.orderId, isDelivered: false }));
        const response = await fetch(
          "http://127.0.0.1:8000/core/orders/update/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              order_id: item.orderId,
              is_delivered: true,
              is_failed: false,
            }),
          }
        );
        const data = await response.json();
        console.log(data);

        navigate("/singleRoute");
      } else {
        alert("Wrong OTP");
      }
    }
  };

  const skip = async () => {
    dispatch(setIsDelivered({ orderId: item.orderId, isDelivered: true }));
    dispatch(setIsFailed({ orderId: item.orderId, isFailed: true }));

    const response = await fetch("http://127.0.0.1:8000/core/orders/update/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: item.orderId,
        is_delivered: "true",
        is_failed: "true",
      }),
    });
    const data = await response.json();
    console.log(data);

    navigate("/singleRoute");
  };

  return (
    <MobileLayout subHeading="Delivery Verification">
      <>
        <div className="px-4 py-6 bg-[#F8F8F7] flex-col flex-grow relative">
          <h2 className="text-2xl mb-10 font-semibold px-1">
            Enter the verification code
          </h2>
          <div className="flex w-full align-center justify-center">
            <OtpInput
              value={otp}
              onChange={updateOtp}
              numInputs={4}
              separator={<span></span>}
              inputStyle={{
                width: "40px",
                height: "52px",
                borderRadius: "12px",
                border: "1px solid #D2D1CC",
                fontSize: "20px",
                textAlign: "center",
                margin: "0 6px",
              }}
            />
          </div>
          <div className="flex-col mx-4 my-10 text-center text-[#2F2E36] text-[14px]">
            <Link to="/verification">Resend verification code</Link>
          </div>
          <div className="flex-grow"></div>
          <div
            onClick={skip}
            className="text-[20px] text-black border border-[#777777] rounded-xl text-center py-2 font-medium mx-4 my-8 absolute bottom-0 left-0 right-0 px-10"
          >
            Skip
          </div>
        </div>
      </>
    </MobileLayout>
  );
};

export default Verification;
