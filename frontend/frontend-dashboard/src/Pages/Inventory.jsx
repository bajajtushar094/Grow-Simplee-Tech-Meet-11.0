import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import PlayListAddCheckIcon from "../Shared/Icons/PlayListAddCheckIcon";
import BoxesIcon from "../Shared/Icons/BoxesIcon";
import Table from "../Component/Global/Table";
import DeliveryIcon from "../Shared/Icons/DeliveryIcon";
import Layout from "../Component/Layout";
import { Link, useParams, useLocation } from "react-router-dom";
import cx from "classnames";
import { LOCAL_SERVER_URL_IP } from "../constants/config";
import { inventoryConstant } from "../constants/inventoryConst";
import CubeWithArrowIcon from "../Shared/Icons/CubeWithArrowIcon";
import TruckIcon from "../Shared/Icons/TruckIcon";

const Inventory = () => {
  let { warehouseTab } = useParams();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [inventoryHeading, setInventoryHeading] = useState(
    inventoryConstant[0]
  );

  useEffect(() => {
    if (warehouseTab === "inhouse") setInventoryHeading(inventoryConstant[1]);
    else if (warehouseTab === "history")
      setInventoryHeading(inventoryConstant[2]);
    else setInventoryHeading(inventoryConstant[1]);
  }, [warehouseTab]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`${LOCAL_SERVER_URL_IP}/orders/all`);
      setOrders(res.data.orders);
    };
    fetchOrders();
  }, []);
  const checkRoute = (order) => {
    const { delivery_action, order_status } = order;
    const currentLocation = location.pathname.split("/")[2];
    if (currentLocation === "inhouse")
      return (
        (delivery_action === "pickup" && order_status === "delivered") ||
        (delivery_action === "drop" && order_status === "failed")
      );
    else if (currentLocation === "history")
      return order_status === "delivered" || order_status === "fail";
    else
      return (
        delivery_action === "drop" &&
        (order_status === "delayed" || order_status === "undelivered")
      );
  };
  const displayedList = orders.filter(checkRoute);
  console.log(orders);
  console.log(displayedList);
  return (
    <Layout>
      <div className="w-full flex-col">
        {warehouseTab === "inventory" && (
          <div className="flex justify-between my-6 px-12">
            <div className="flex items-center pl-4 border-l-2">
              <div>
                <BoxesIcon />
              </div>
              <div className="ml-4">
                <h2 className={cx("text-4xl font-bold")}>
                  {displayedList.length}
                </h2>
                <h4 className="text-sm text-gs-text-gray font-semibold">
                  Packages in inventory
                </h4>
              </div>
            </div>
            <div className="flex items-center pl-4 border-l-2">
              <div>
                <TruckIcon />
              </div>
              <div className="ml-4">
                <h2 className={cx("text-4xl font-bold")}>12/02/23</h2>
                <h4 className="text-sm text-gs-text-gray font-semibold">
                  Upcoming Shipments
                </h4>
              </div>
            </div>
            <div className="flex items-center pl-4 border-l-2">
              <div>
                <CubeWithArrowIcon />
              </div>
              <div className="ml-4">
                <h2 className={cx("text-4xl font-bold")}>
                  {
                    displayedList.filter(
                      (order) => order.delivery_action === "pickup"
                    ).length
                  }
                </h2>
                <h4 className="text-sm text-gs-text-gray font-semibold">
                  Pickups in inventory
                </h4>
              </div>
            </div>
            {/* <div className="flex items-center pl-4 border-l-2">
            <div><BoxesIcon /></div>
            <div className="ml-4">
              <h2 className={cx("text-4xl font-bold",
                { 'text-[#F04438]': data?.flag, }
              )}>{data.value}</h2>
              <h4 className="text-sm text-gs-text-gray font-semibold">Damaged in inventory</h4>
            </div>
          </div> */}
          </div>
        )}

        {/* <div className='flex justify-end w-full space-x-8 rounded-tl-3xl'>
          <div className='flex py-3 space-x-8 border-solid border-l-2 border-t-2  px-8 rounded-tl-sm '>
            <KeyboardDoubleArrowRightOutlinedIcon className='cursor-pointer' />
            <button className='text-gs-black text-sm font-semibold'><FileDownloadIcon fontSize='medium' /> Download</button>
            <button className='text-gs-black text-sm font-semibold'><ContentCopyOutlinedIcon fontSize='small' /> Delete</button>
            <button className='text-gs-black text-sm font-semibold'><FileDownloadIcon fontSize='medium' />Move</button>
            <button className='text-gs-black text-sm font-semibold'><ContentCopyOutlinedIcon fontSize='small' />Copy</button>
          </div>
        </div> */}
        <div className="bg-white rounded-tl-3xl border-2 ">
          <div className="flex pb-4 pt-6 px-8">
            <div>
              <PlayListAddCheckIcon />
            </div>
            <div className="pl-4 w-full">
              <div className="flex justify-between w-full">
                <h4 className="text-gs-blue text-sm font-semibold">Packages</h4>
                {/* <div className='flex space-x-6'>
                  <Link to='/warehouse/repository-history' className={cx('py-2 px-3 rounded text-gs-text-gray text-sm font-semibold flex items-center', { '!text-gs-blue bg-[#F8F8F7]': location.pathname.split('/')[2].split('-')[1] == 'history' })}><DeliveryIcon className={cx('mr-2', { '!stroke-gs-blue stroke-[0.4]': location.pathname.split('/')[2].split('-')[1] == 'history' })} />History</Link>
                  <Link to='/warehouse/repository-inhouse' className={cx('py-2 px-3 rounded text-gs-text-gray text-sm font-semibold flex items-center', { '!text-gs-blue bg-[#F8F8F7]': location.pathname.split('/')[2].split('-')[1] == 'inhouse' })}><DeliveryIcon className={cx('mr-2', { '!stroke-gs-blue stroke-[0.4]': location.pathname.split('/')[2].split('-')[1] == 'inhouse' })} />Inhouse</Link>
                </div> */}
              </div>
              <h2 className="text-xl font-semibold mt-2">
                {inventoryHeading.InventoryHeading}
              </h2>
              <h4 className="text-md text-[#5F5D59] font-semibold mt-1">
                {inventoryHeading.InventorySubHeading}
              </h4>
            </div>
          </div>
          <Table tab={warehouseTab} displayedList={displayedList} />
        </div>
      </div>
    </Layout>
  );
};

export default Inventory;
