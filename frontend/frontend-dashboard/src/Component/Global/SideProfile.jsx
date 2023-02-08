import React from "react";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import vector from "./Vector.svg";
import line from "./line.svg";
import arrow from "./arrow.svg";
import dot from "./Dot.svg";
import { useState } from "react";

function SideProfile({selectedRider}) {
  // const rider = props.rider;
  // const orders = props.orders;
  
  // const [show,setShow] = useState(false);

  // console.log(props);

  // const ordersOrder = rider.delievery_orders;
  // const ordersOrderArray = ordersOrder.split(",");
  // ordersOrderArray.shift();
  // ordersOrderArray.pop();

  // let UpcomingOrder = orders[0];
  // with the element of ordersOrderArray as the the 'id' of an order in the orders array, find the first order with order_status === 'Undelivered'
  // for (let i = 0; i < ordersOrderArray.length; i++) {
  //   const o = orders.find((order) => order.id === ordersOrderArray[i]);
  //   try {
  //     if (o.order_status === "Undelivered") {
  //       UpcomingOrder = o;
  //       break;
  //     }
  //   } catch {
  //     console.log("Could not find a undelivered order");
  //   }
  // }

  // const date_string = UpcomingOrder.edd;
  // var date = new Date(date_string);
  // //get the time in the format of 12:00 AM from date
  // const time = date.toLocaleTimeString("en-US", {
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: true,
  // });
const UpcomingOrder={}
const time= {}
const name =''
console.log(selectedRider)
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "900px",
        width: "464px",
        padding: "20px",
        // borderRadius: props.borderRadius ? props.borderRadius : "0px",
      }}
    >
      <h1>hello</h1>
    </div>
  );
}

export default SideProfile;



 