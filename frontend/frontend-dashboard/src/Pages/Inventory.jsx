import React from "react";
import { useEffect, useState } from "react";
import axios from "axios"
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import PlayListAddCheckIcon from "../Shared/Icons/PlayListAddCheckIcon";
import BoxesIcon from "../Shared/Icons/BoxesIcon";
import Table from "../Component/Global/Table";
import DeliveryIcon from "../Shared/Icons/DeliveryIcon";
import Layout from "../Component/Layout";
import { Link, useParams, useLocation } from 'react-router-dom';
import cx from 'classnames'
import { LOCAL_SERVER_URL_IP } from "../constants/config";


const Inventory = () => {
  let { warehouseTab } = useParams();
  const location = useLocation();
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`${LOCAL_SERVER_URL_IP}/orders/all`);
      setOrders(res.data);
    };
    fetchOrders();
  }, []);
  const statisticaldata = [{
    key: 'Packages in inventory',
    value: '1,24,445',
    flag: false,
  },
  {
    key: 'Packages in inventory',
    value: '1,24,445',
    flag: false,
  },
  {
    key: 'Packages in inventory',
    value: '1,24,445',
    flag: false,
  },
  {
    key: 'Packages in inventory',
    value: '1,24,445',
    flag: true,
  },]
  return (
    <Layout>
      <div className='w-full flex-col'>
        <div className="flex justify-between my-6 px-2">
          <div className="flex items-center pl-4 border-l-2">
            <div><BoxesIcon /></div>
            <div className="ml-4">
              <h2 className={cx("text-4xl font-bold",
                { 'text-[#F04438]': data?.flag, }
              )}>{data.value}</h2>
              <h4 className="text-sm text-gs-text-gray font-semibold">Packages in inventory</h4>
            </div>
          </div>
          <div className="flex items-center pl-4 border-l-2">
            <div><BoxesIcon /></div>
            <div className="ml-4">
              <h2 className={cx("text-4xl font-bold",
                { 'text-[#F04438]': data?.flag, }
              )}>15/01/23</h2>
              <h4 className="text-sm text-gs-text-gray font-semibold">Upcoming Shipments</h4>
            </div>
          </div>
          <div className="flex items-center pl-4 border-l-2">
            <div><BoxesIcon /></div>
            <div className="ml-4">
              <h2 className={cx("text-4xl font-bold",
                { 'text-[#F04438]': data?.flag, }
              )}>{data.value}</h2>
              <h4 className="text-sm text-gs-text-gray font-semibold">Pickups in inventory</h4>
            </div>
          </div>
          <div className="flex items-center pl-4 border-l-2">
            <div><BoxesIcon /></div>
            <div className="ml-4">
              <h2 className={cx("text-4xl font-bold",
                { 'text-[#F04438]': data?.flag, }
              )}>{data.value}</h2>
              <h4 className="text-sm text-gs-text-gray font-semibold">Damaged in inventory</h4>
            </div>
          </div>
        </div>
        <div className='flex justify-end w-full space-x-8 rounded-tl-3xl'>
          <div className='flex py-3 space-x-8 border-solid border-l-2 border-t-2  px-8 rounded-tl-sm '>
            <KeyboardDoubleArrowRightOutlinedIcon className='cursor-pointer' />
            <button className='text-gs-black text-sm font-semibold'><FileDownloadIcon fontSize='medium' /> Download</button>
            <button className='text-gs-black text-sm font-semibold'><ContentCopyOutlinedIcon fontSize='small' /> Delete</button>
            <button className='text-gs-black text-sm font-semibold'><FileDownloadIcon fontSize='medium' />Move</button>
            <button className='text-gs-black text-sm font-semibold'><ContentCopyOutlinedIcon fontSize='small' />Copy</button>
          </div>
        </div>
        <div className='bg-white rounded-tl-3xl border-2 '>
          <div className='flex pb-4 pt-6 px-8'>
            <div>
              <PlayListAddCheckIcon />
            </div>
            <div className='pl-4 w-full'>
              <div className='flex justify-between w-full'>
                <h4 className='text-gs-blue text-sm font-semibold'>
                  Packages
                </h4>
                <div className='flex space-x-6'>
                  <Link to='/warehouse/repository-history' className={cx('py-2 px-3 rounded text-gs-text-gray text-sm font-semibold flex items-center', { '!text-gs-blue bg-[#F8F8F7]': location.pathname.split('/')[2].split('-')[1] == 'history' })}><DeliveryIcon className={cx('mr-2', { '!stroke-gs-blue stroke-[0.4]': location.pathname.split('/')[2].split('-')[1] == 'history' })} />History</Link>
                  <Link to='/warehouse/repository-inhouse' className={cx('py-2 px-3 rounded text-gs-text-gray text-sm font-semibold flex items-center', { '!text-gs-blue bg-[#F8F8F7]': location.pathname.split('/')[2].split('-')[1] == 'inhouse' })}><DeliveryIcon className={cx('mr-2', { '!stroke-gs-blue stroke-[0.4]': location.pathname.split('/')[2].split('-')[1] == 'inhouse' })} />Inhouse</Link>
                </div>
              </div>
              <h2 className='text-xl font-semibold'>
                Repository
              </h2>
              <h4 className='text-md text-[#5F5D59] font-semibold'>
                List of items currently in warehouse
              </h4>
            </div>
          </div>
          <Table tab={warehouseTab} />
        </div>
      </div>
      {/* <div className="bg-white rounded-tl-3xl">
          <div className="flex pb-4 pt-6 px-8">
            <div>
              <PlayListAddCheckIcon />
            </div>
            <div className="pl-4 w-full">
              <div className="flex justify-between w-full">
                <h4 className="text-gs-blue text-sm font-semibold">Packages</h4>
                <div className="flex space-x-6">
                  <button className="text-gs-text-gray text-sm font-semibold">
                    <MopedOutlinedIcon fontSize="small" className="mr-1" />
                    History
                  </button>
                  <button className="text-gs-text-gray text-sm font-semibold">
                    <MopedOutlinedIcon fontSize="small" className="mr-1" />
                    Inhouse
                  </button>
                </div>
              </div>
              <h2 className="text-xl font-semibold">Repository</h2>
              <h4 className="text-md text-[#5F5D59] font-semibold">
                List of items currently in warehouse
              </h4>
            </div>
          </div>
          <Table />
        </div> */}
    </Layout>
  );
};

export default Inventory;
