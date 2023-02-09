import { borderColor } from "@mui/system";
import React from "react";
import SideProfile from "../Component/Global/SideProfile";
import SideProfile2 from "../Component/Global/SideProfile2";
import Topbar from "../Component/Layout/TopBar";
import Layout from "../Component/Layout/Layout";
import Table2 from "../Component/Global/Table2";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import arrow from "../Component/Layout/Droneview/arrow.svg";
import Open from "../Component/Layout/Droneview/Open.svg";
import Drone from "../Component/Layout/Droneview/Drone.svg";
import view from "../Component/Layout/Droneview/view.svg";
import TV from "../Component/Layout/Droneview/TV.svg";
import sus from "../Component/Layout/Droneview/sus.svg";
import delivered from "../Component/Layout/Droneview/Icon.svg";
import distance from "../Component/Layout/Droneview/Icon.png";
import delay from "../Component/Layout/Droneview/icon2.svg";
import { TOP_TABS } from "../constants/sidebarconst";

function RiderDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  //const riderId = location.state.id;

  const [orders, setOrders] = useState([]);
  const [rider, setRider] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);

  const riderId = "2";

  const fetchData = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/core/rider/" + riderId
    );
    const data = await response.json();
    console.log(data);


    setCompletedOrders(data.completed_orders);

    setUpcomingOrders(data.upcoming_orders);

    setCurrentOrders(data.current_orders);

    if(currentOrders.length>0)
    {setOrders(data.current_orders);}
    else
    {setOrders(data.completed_orders);}

    //console.log("current orders : ", data.current_orders)

    setRider(data.rider);

    return;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isHover, setIsHover] = useState(false);
  //const [overview,setOverview] = useState(true);
  //const [delivery,setDelivery] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  /* const handleOverview = () => {
      setOverview(true);
      if(delivery){
         setDelivery(false);
      }
   }

   const handleDelivery = () => {
      setDelivery(true);
      if(overview){
         setOverview(false);
      }
   } */

  const sidePanel = () => {
    console.log('orders', orders)
    if (orders.length > 0 && rider.id) {
      return <SideProfile2 display="none" selectedRider={rider} orders={orders} />;
    } else {
      return null;
    }
  };

  return (
    <div>
      <Topbar topTabs={TOP_TABS} />

      <div style={{ backgroundColor: "white" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "16px",
            marginLeft: "16px",
            alignItems: "center",
          }}
        >
          <img src={arrow} alt="" />
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "gray",
              margin: "5px",
            }}
          >
            Rider Management
          </p>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "gray",
              margin: "5px",
            }}
          >
            /
          </p>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "gray",
              margin: "5px",
            }}
          >
            Rider Details
          </p>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "gray",
              margin: "5px",
            }}
          >
            /
          </p>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "gray",
              margin: "5px",
            }}
          >
            {rider.name}
          </p>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            marginTop: "45px",
          }}
        >
          {sidePanel()}
          <div
            style={{
              width: "1000px",
              borderRadius: "24px 0px 0px 0px",
              borderColor: "black",
              border: " 1px solid #EDECE9",
              padding: "16px",
              borderRight: "none",
              borderBottom: "none",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              {/* <p style={{margin:'12px', fontSize:'12px', color:overview?'blue':'#706D64',fontWeight:'600',opacity:'0.8',cursor:'pointer'}}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleOverview}>Overview</p> */}
              <p
                style={{
                  margin: "12px",
                  fontSize: "12px",
                  color: /* delivery? */ "blue" /* :'#706D64' */,
                  fontWeight: "600",
                  opacity: "0.8",
                  cursor: "pointer",
                }} /* onClick={handleDelivery} */
              >
                Deliveries
              </p>
            </div>
            {
              /* delivery &&  */
              <div>
                <div>
                  {/* deliveries */}
                  <p
                    style={{
                      margin: "5px",
                      fontSize: "26px",
                      fontWeight: "bold",
                    }}
                  >
                    Deliveries
                  </p>
                </div>
                <div>
                  {/* status para */}
                  <p
                    style={{
                      marginTop: "-10px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#706D64",
                      marginLeft: "5px",
                      opacity: "0.8",
                    }}
                  >
                    {" "}
                    Get status of all theprevious and current deliveries
                  </p>
                </div>
                <div style={{ padding: "16px" }}>
                  <div>
                    {/* table one */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          margin: "5px",
                          fontWeight: "600",
                          color: "#5F5D59",
                          fontSize: "14px",
                        }}
                      >
                        Current
                      </p>
                      <div
                        style={{
                          border: "2px solid #EDECE9",
                          borderRadius: "4px",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img src={Open} alt="" />
                      </div>
                    </div>
                    <Table2 orders={currentOrders} />
                  </div>
                  <div>
                    {/* table two */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          margin: "5px",
                          fontWeight: "600",
                          color: "#5F5D59",
                          fontSize: "14px",
                        }}
                      >
                        Upcoming
                      </p>
                      <div
                        style={{
                          border: "2px solid #EDECE9",
                          borderRadius: "4px",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img src={Open} alt="" />
                      </div>
                    </div>
                    <Table2 orders={upcomingOrders} />
                  </div>
                  <div>
                    {/* table three */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          margin: "5px",
                          fontWeight: "600",
                          color: "#5F5D59",
                          fontSize: "14px",
                        }}
                      >
                        Completed
                      </p>
                      <div
                        style={{
                          border: "2px solid #EDECE9",
                          borderRadius: "4px",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img src={Open} alt="" />
                      </div>
                    </div>
                    <Table2 orders={completedOrders} />
                  </div>
                </div>
              </div>
            }

            {/* { overview && 

            <div>
              
               <div>

                  <p style={{margin:'5px',fontSize:'26px',fontWeight:'bold'}}>Overview</p>
               </div>
               <div>

                  <p style={{marginTop:'-10px',fontSize:'12px',fontWeight:'600',color:'#706D64',marginLeft:'5px',opacity:'0.8'}}> Get status of all theprevious and current deliveries</p>
               </div>

               <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', margin:"20px"}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                      <img src={delivered} alt="" />
                      <div style={{display:'flex', flexDirection:'column',margin:'10px'}}>
                         <p style={{fontSize:'24px', fontWeight:'bold'}}> 20000</p>
                         <p style={{fontSize:'12px', fontWeight:'600', color:'gray'}}> Order Delivered</p>
                      </div>
                      
                    </div>

                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}} >
                      
                       <img style={{height:'40px'}} src={distance} alt="" />
                       <div style={{display:'flex', flexDirection:'column',margin:'10px'}}>
                         <p style={{fontSize:'24px', fontWeight:'bold'}}> 20000</p>
                         <p style={{fontSize:'12px', fontWeight:'600', color:'gray'}}> distance Covered</p>
                      </div>
                    </div>

                    <div style={{display:'flex', flexDirection:'row'}}>
                       
                       <img src={delay} alt="" />
                       <div style={{display:'flex', flexDirection:'column',margin:'10px'}}>
                         <p style={{fontSize:'24px', fontWeight:'bold', color:'red'}}> 20000</p>
                         <p style={{fontSize:'12px', fontWeight:'600', color:'gray'}}> packages Delayed</p>
                      </div>
                    </div>
              </div>
               <div style={{display:'flex', flecDirection:'row', marginTop:'20px',padding:"8px"}}>
                   <div>

                        <div style={{display:'flex', flexDirection:'column', width:'388px', height:'128px', border:'1px solid #EDECE9', borderRadius:'8px', padding:'20px'}}>
                           <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                               <img style={{height:'15px'}} src={Drone} alt="" />
                               <p  style={{fontSize:'12px', fontWeight:'600',margin:'5px'}}>Drone Type</p>
                           </div>
                           <p style={{marginTop:'15px',fontWeight:'bold',fontSize:'16px'}}> Drone Type</p>
                        </div>
                        <div style={{display:'flex', flexDirection:'column', width:'388px', height:'128px', border:'1px solid #EDECE9', borderRadius:'8px',padding:'20px',marginTop:'10px'}}>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <img style={{height:'15px'}} src={sus} alt="" />
                                <p style={{fontSize:'12px', fontWeight:'600',margin:'5px'}}>Order Size Support</p>
                            </div>
                            <p style={{marginTop:'15px',fontWeight:'bold',fontSize:'16px'}}>Medium / Small</p>
                        </div>
                   </div>

                   <div style={{display:'flex', flexDirection:'column', width:"592px", height:'417px', border:'1px solid #EDECE9', borderRadius:'8px',padding:'20px', marginLeft:'10px'}}>

                        <div style={{display:'flex', flexDirection:'row', alignItems:"center"}}>
                           <img style={{height:'15px'}} src={TV} alt="" />
                           <p style={{fontSize:'12px', fontWeight:'600',margin:'5px'}}>Live Feed</p>
                        </div>
                        <div>
                          <img style={{marginLeft:'-10px',marginTop:'10px'}} src={view} alt="" />
                        </div>
                   </div>
               </div>

             </div>} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderDetails;
