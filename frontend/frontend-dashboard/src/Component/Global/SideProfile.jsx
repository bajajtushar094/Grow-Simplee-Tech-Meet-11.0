import React from "react";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import vector from "./Vector.svg";
import line from "./line.svg";
import arrow from "./arrow.svg";
import dot from "./Dot.svg";

function SideProfile(props) {
  const rider = props.rider;
  const orders = props.orders;

  console.log(props);

  const ordersOrder = rider.delievery_orders;
  const ordersOrderArray = ordersOrder.split(",");
  ordersOrderArray.shift();
  ordersOrderArray.pop();

  let UpcomingOrder = orders[0];
  // with the element of ordersOrderArray as the the 'id' of an order in the orders array, find the first order with order_status === 'Undelivered'
  for (let i = 0; i < ordersOrderArray.length; i++) {
    const o = orders.find((order) => order.id === ordersOrderArray[i]);
    try {
      if (o.order_status === "Undelivered") {
        UpcomingOrder = o;
        break;
      }
    } catch {
      console.log("Could not find a undelivered order");
    }
  }

  const date_string = UpcomingOrder.edd;
  var date = new Date(date_string);
  //get the time in the format of 12:00 AM from date
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "900px",
        width: "464px",
        padding: "20px",
        borderRadius: props.borderRadius ? props.borderRadius : "0px",
      }}
    >
      <div
        style={{
          display: props.display ? props.display : "flex",
          flexDirection: " row",
          alignItems: "center",
          justifyContent: "center",
          margin: "5px",
        }}
      >
        {/* toplogo */}
        <CloseIcon sx={{ fontSize: "medium" }} />
        Close
      </div>

      <div>
        {/* profilePic */}
        <Avatar />
      </div>
      <div style={{}}>
        {/* name */}
        <p style={{ fontWeight: "600", fontSize: "23px" }}> {rider.name}</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "93px",
          height: "28px",
          backgroundColor: props.status == "ontime" ? "#12B76A" : "red",
          borderRadius: "16px",
          marginTop: "18px",
        }}
      >
        <img style={{ height: "8px", margin: "5px" }} src={dot} alt="" />
        <p style={{ fontSize: "14px" }}>{props.status}</p>
      </div>
      <div
        style={{
          marginTop: "20px",
          fontSize: "17px",
          fontWeight: "600",
          color: "gray",
        }}
      >
        {/* status  ontime and status*/}
        Rider Status
      </div>
      <div
        style={{
          display: "flex",
          flexDiretion: "row",
          justifyContent: "flex-start",
          marginTop: "30px",
          padding: "16px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginRight: "25px",
          }}
        >
          <ShoppingBagOutlinedIcon
            sx={{ fontSize: "large", margin: "10px", color: "gray" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "12px", color: "gray", fontWeight: "600" }}>
              Bag Level
            </p>
            <p style={{ fontSize: "10px", fontWeight: "bold" }}>
              {" "}
              {rider.bag_volume_used}%
            </p>
          </div>
          {/* bag */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <AccessTimeIcon
            sx={{ fontSize: "large", margin: "10px", color: "gray" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "12px", color: "gray", fontWeight: "600" }}>
              ETF
            </p>
            <p style={{ fontSize: "10px", fontWeight: "bold" }}>
              {UpcomingOrder.etf} mins
            </p>
          </div>
          {/* time */}
        </div>
      </div>
      <div>
        <p style={{ fontWeight: "bold" }}>Upcoming Delivery</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: "16px",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {/* delivery status */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "185px",
            height: "44px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <img
            style={{ height: "35", marginRight: "20px" }}
            src={vector}
            alt=""
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "13px" }}>AWB ID</p>
            <p style={{ fontSize: "13px" }} className="text-[16px] font-medium">
              {UpcomingOrder.id}{" "}
            </p>
          </div>
        </div>
        {/* <div style={{width:'97px', height:'28px',backgroundColor:' #EDECE9', borderRadius:'16px', textAlign:'center'}}>
                <p style={{fontSize:'14px', fontWeight:'500',textAlign:'center',marginTop:'3px'}}>ETA : 8 mins</p> 
            </div> */}
      </div>
      <div>
        <img src={line} alt="" />
      </div>

      <div
        style={{ display: "flex", flexDirection: "column", padding: "16px" }}
      >
        {/* imformation */}
        <div
          style={{
            width: "64px",
            height: "20px",
            backgroundColor: "#FAEDC2",
            borderRadius: "16px",
            borderColor: "#DFAC03",
            marginTop: "16px",
          }}
        >
          <p style={{ fontSize: "12px", textAlign: "center" }}>
            {UpcomingOrder.delivery_action}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "Column",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <p style={{ fontSize: "14px" }}>Name</p>
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>
            {UpcomingOrder.order_name}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "Column",
            justifyContent: "center",
            marginTop: "12px",
          }}
        >
          <p style={{ fontSize: "14px" }}>Address</p>
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>
            {UpcomingOrder.address}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "12px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "Column" }}>
            <p
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "500",
              }}
            >
              City
            </p>
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>Bangalore</p>
          </div>
          {/* <div style={{display:'flex',flexDirection:'Column'}}>
                     <p style={{fontSize:'14px'}}>Postal Code</p>
                     <p style={{fontWeight:'bold',fontSize:'16px'}}>726206</p>
                </div> */}
          <div style={{ display: "flex", flexDirection: "Column" }}>
            <p style={{ fontSize: "14px" }}>Time</p>
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>{time}</p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: props.display ? props.display : "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "432px",
          height: "44px",
          marginTop: "6px",
          backgroundColor: "#272520",
        }}
      >
        <p style={{ color: "white", margin: "8px" }}>Open Order List</p>
        <img style={{ height: "14" }} src={arrow} alt="" />
      </div>
    </div>
  );
}

export default SideProfile;
