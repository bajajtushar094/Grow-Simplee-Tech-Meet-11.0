import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../Component/Global/Table";
import Layout from "../Component/Layout";
import PlayListAddCheckIcon from "../Shared/Icons/PlayListAddCheckIcon";
import RiderMapContainer from "../Component/RiderManagement/RiderMapContainer";
import { LOCAL_SERVER_URL_IP } from "../constants/config";
import axios from "axios";

const Riders = () => {
  let { riderManagementTab } = useParams();
  const [riders, setRiders] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchRiders = async () => {
      const res = await axios.get(`${LOCAL_SERVER_URL_IP}/riders/all`);
      console.log(res.data.riders);
      setRiders(res.data.riders);
    };
    const fetchOrders = async () => {
      const res = await axios.get(`${LOCAL_SERVER_URL_IP}/orders/all`);
      setOrders(res.data.orders);
    };
    fetchRiders();
    fetchOrders();
  }, []);
  const displayedList = [
    {
      id: "1232",
      rider: {
        name: "Kathryn Murphy",
        photoURL:
          "https://images.unsplash.com/photo-1674238924120-a9d9a0425d28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      },
      range: "6 KM",
      latestLocation: "4140 Parker Rd. Allentown, New Mexico 31134",
      progress: "25%",
      status: "On Route",
    },
    {
      id: "12522",
      rider: {
        name: "Wade Warren",
        photoURL:
          "https://images.unsplash.com/photo-1674238924120-a9d9a0425d28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      },
      range: "9 KM",
      latestLocation: "2464 Royal Ln. Mesa, New Jersey 45463",
      progress: "65%",
      status: "On Route",
    },
    {
      id: "123322",
      rider: {
        name: "Courtney Henry",
        photoURL:
          "https://images.unsplash.com/photo-1674238924120-a9d9a0425d28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      },
      range: "17 KM",
      latestLocation: "3517 W. Gray St. Utica, Pennsylvania 57867",
      progress: "34%",
      status: "Delayed",
    },
  ];
  return (
    <Layout>
      {riderManagementTab === "listView" ? (
        <div className="bg-white rounded-tl-3xl border-2 w-full">
          <div className="flex pb-4 pt-6 px-8">
            <div>
              <PlayListAddCheckIcon />
            </div>
            <div className="pl-4 w-full">
              <div className="flex justify-between w-full">
                <h4 className="text-gs-blue text-sm font-semibold">Riders</h4>
                <div className="flex space-x-6"></div>
              </div>
              <h2 className="text-xl font-semibold mt-2">List</h2>
              <h4 className="text-md text-[#5F5D59] font-semibold mt-1">
                List of all the riders in your network
              </h4>
            </div>
          </div>
          <Table
            tab={riderManagementTab}
            displayedList={riders}
            checkboxSelection={false}
            className="px-6"
          />
        </div>
      ) : (
        <RiderMapContainer riderData={riders} orders={orders} />
      )}
    </Layout>
  );
};

export default Riders;
