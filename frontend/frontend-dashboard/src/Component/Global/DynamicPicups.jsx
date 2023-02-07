import React from "react";
import arrow from "./arrow.svg";
import { useState } from "react";
import { LOCAL_SERVER_URL_IP } from "../../constants/config";
import axios from "axios";

function DynamicPicups() {
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    const addDynamicPickup = async () => {
      try {
        const address = {address:inputs.location}
        const latLong = await axios.post(`${LOCAL_SERVER_URL_IP}/geocode/`, address);
        const resp = await axios.post(`${LOCAL_SERVER_URL_IP}/orders/add`, {latitude:latLong.data[0],longitude:latLong.data[1],...inputs});
            console.log(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    addDynamicPickup();
  };

  return (
    <div>
      <form>
        <div
          style={{
            padding: "100px",
            backgroundColor: "white",
            width: "616px",
            display: "flex",
            flexDirection: "column",
            zIndex: "100",
          }}
          className='overflow-hidden'
        >
          <div>
            <p style={{ fontWeight: "700", fontSize: "48px" }}>
              Dynamic Pickups
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "40px",
            }}
          >
            <p style={{ fontWeight: "600" }}>Add location</p>
            <input
              
              className='p-4 bg-[#F8F8F7] mt-2'
              type="text"
              placeholder="Enter location as string"
              name="location"
              value={inputs.location || ""}
              onChange={handleChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <p style={{ fontWeight: "600" }}>Person Name</p>
            <input
              
              type="text"
              className='p-4 bg-[#F8F8F7] mt-2'
              placeholder="Enter location as string"
              name="name"
              value={inputs.name || ""}
              onChange={handleChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <p style={{ fontWeight: "600" }}>AWB Number</p>
            <input
             
              type="text"
              className='p-4 bg-[#F8F8F7] mt-2'
              placeholder="Enter"
              name="awbNumber"
              value={inputs.awbNumber || ""}
              onChange={handleChange}
            />
          </div>
          <div
            style={{ marginTop: "20px" }}
            className='flex space-x-2 justify-between'

          >
            <div style={{ display: "flex", flexDirection: "column" }} className='w-[196px]'>
              <p style={{ fontWeight: "600" }}>SKU ID</p>
              <input
                
                type="text"
                className='p-4 bg-[#F8F8F7] mt-2'
                placeholder="EG SKU"
                name="skuID"
                value={inputs.skuID || ""}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }} className='w-[196px]'>
              <p style={{ fontWeight: "600" }}>VOLUME</p>
              <input
                
                type="text"
                className='p-4 bg-[#F8F8F7] mt-2 text-base'
                placeholder="In Liters"
                name="volume"
                value={inputs.volume || ""}
                onChange={handleChange}
              />
            </div>
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
                Add multiple places
              </p>
              <img style={{ color: "red" }} src={arrow} alt="" />
            </div>
            <input
            
              type="text"
              className='p-4 bg-[#F8F8F7] mt-2 text-base'
              placeholder="Enter location as string"
            />
          </div>
          <div onClick={handleSubmit} style={{height:"44px",width:'416px', backgroundColor:'black', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:"50px", borderRadius:'8px'}}>
                 <p style={{color:"white", fontSize:"16px"}}>Add Pickup</p>
                 <img style={{height:"12px", marginLeft:'10px'}} src={arrow} alt="" />
              </div>
        </div>
      </form>
    </div>
  );
}

export default DynamicPicups;
