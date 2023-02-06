import React, { useState } from "react";
import axios from 'axios'
import arrow from "./arrow.svg";
import { LOCAL_SERVER_URL_IP } from "../../constants/config";
function CancelOrder() {
   const [orderID, setorderID] = useState("");

   const handleCancelSubmit = (event)=>{
      event.preventDefault();
      const cancelOrder = async()=>{
         try{
            const res = await axios.post(`${LOCAL_SERVER_URL_IP}/orders/cancel`, {order_id:orderID});
            console.log(res.data);
         }catch(err){
            // Handle Error Here
            console.error(err);
         }
      }
      cancelOrder();
   }
  return (
    <form>
      <div
        style={{
          padding: "100px",
          backgroundColor: "white",
          height: "626px",
          width: "616px",
          display: "flex",
          flexDirection: "column",
          zIndex: "100",
        }}
      >
        <div>
          <p
            style={{ fontWeight: "700", fontSize: "48px" }}
            className="font-bold"
          >
            Cancel Order
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "40px",
          }}
        >
          <p style={{ fontWeight: "600" }}>AWB Number </p>
          <input
            className="p-4 bg-[#F8F8F7] mt-2"
            type="text"
            placeholder="Enter AWB Number"
            value={orderID}
          onChange={(e) => setorderID(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "40px",
          }}
        >
          <div>
            <p style={{ fontWeight: "600", color: "gray", opacity: "0.7" }}>
              Cancel multiple Orders{" "}
            </p>
            <img style={{ color: "red" }} src={arrow} alt="" />
          </div>
          <input
            className="p-4 bg-[#F8F8F7] mt-2"
            type="text"
            placeholder="Enter location as string"
          />
        </div>

        <div
         onClick={handleCancelSubmit}
          className="p-4 cursor-pointer"
          style={{
            height: "44px",
            width: "416px",
            backgroundColor: "black",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
            borderRadius: "8px",
          }}
        >
          <p className="text-base" style={{ color: "white" }}>
            Cancel Order
          </p>
          <img
            style={{ height: "12px", marginLeft: "10px" }}
            src={arrow}
            alt=""
          />
        </div>
      </div>
    </form>
  );
}

export default CancelOrder;
