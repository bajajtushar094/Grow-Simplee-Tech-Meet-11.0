import React, { useState } from 'react'
import MobileLayout from '../../Component/Layout/MobileLayout'
import {Link} from 'react-router-dom'
import CreateBagBoxIcon from '../../Shared/Icons/CreateBagBoxIcon'
import ScanIcon from '../../Shared/Icons/ScanIcon'
import CorrectArrowIcon from '../../Shared/Icons/CorrectArrowIcon'
import cx from 'classnames'

import { Avatar } from '@mui/material'
import BackArrowIcon from '../../Shared/Icons/BackArrow'
import { gridSelectionStateSelector } from '@mui/x-data-grid'
import CallGreenIcon from '../../Shared/Icons/CallGreenIcon'
import IconChat from '../../Shared/Icons/IconChat'


const Order = ({order}) => {
  const [isClicked, setIsClicked] = useState(1);
  const handleClick = () => {
    setIsClicked(!isClicked);
  }

  return (
    <div onClick={handleClick}>
    {isClicked?<div className='flex items-center p-3 bg-white rounded-xl py-7'>
                  {/* <div className='border-2 border-solid p-[14px] rounded-xl border-[#C5C5C5]'><CreateBagBoxIcon/></div> */}
                  <div className='flex w-full px-3 items-center'>
                  <div className='px-2'><h4 className='text-[20px] font-semibold'>Order ID:</h4></div>
                  <h4 className='text font-semibold text-gs-text-gray'>{order.orderId}</h4></div>
                  <div className='px-2'><CallGreenIcon /></div>
                  <div className='px-2'><IconChat /></div>
              </div>:<div className='flex-col items-center p-3 bg-white rounded-xl py-7'>
          {/* <div className='border-2 border-solid p-[14px] rounded-xl border-[#C5C5C5]'><CreateBagBoxIcon/></div> */}
          <div className='flex items-center bg-white'>
            <div className='flex w-full px-3 items-center'>
              <div className='px-2'><h4 className='text-[20px] font-semibold'>Order ID:</h4></div>
              <h4 className='text font-semibold text-gs-text-gray'>{order.orderId}</h4>
            </div>
            <div className='px-2'><CallGreenIcon /></div>
            <div className='px-2'><IconChat /></div>
          </div>
          <div>
            <div className='flex w-full px-3 items-center'>
              <div className='px-2'><h4 className='text-[20px] font-semibold'>Name :</h4></div>
              <h4 className='text font-semibold text-gs-text-gray'>{order.orderName}</h4>
            </div>
            <div className='flex w-full px-3 items-center'>
              <div className='px-2'><h4 className='text-[20px] font-semibold'>Address :</h4></div>
              <h4 className='text font-semibold text-gs-text-gray'>{order.address}</h4>
            </div>
          </div>
      </div>}
      
    </div>
  ) ;
}



const UpcomingDelivery = () => {
  const current_order = {
    orderName: "Aditya",
    orderId:"123456",
    isVerified:false
  };
  const data =[{
    orderName:'Darrell Steward',
    orderId:'RO10-445-A65E2',
    address: "here",
    isVerified:true,
  },
  {
    orderName:'Darrell Steward',
    orderId:'RO10-445-A65E2',
    address: "here",
    isVerified:false,
  },
  {
    orderName:'Darrell Steward',
    orderId:'RO10-445-A65E2',
    address: "here",
    isVerified:false,
  },
  {
    orderName:'Darrell Steward',
    orderId:'RO10-445-A65E2',
    address: "here",
    isVerified:false,
  },
  {
    orderName:'Darrell Steward',
    orderId:'RO10-445-A65E2',
    address: "here",
    isVerified:false,
  },
  {
    orderName:'Darrell Steward',
    orderId:'RO10-445-A65E2',
    address: "here",
    isVerified:false,
  },]
  return (
    <div className='flex-col'>
        <div className='flex justify-between bg-white px-4 py-3 items-center'>
          <div className={"flex items-center"}>
          <BackArrowIcon/>
          <div className={"px-4"}><h3 className='text-sm text-gs font-semibold'>{current_order.orderId}</h3></div>
          
          </div>
          
          <Avatar fontSize='small' src={"../img1.jpg"} alt='Profile-Img'/>
        </div>
        <div className='px-4 py-3 rounded-xl'>
          <div className='rounded-lg my-2'>
            <h2 className='text-2xl mb-8 font-semibold'>Upcoming Deliveries</h2>
            <div className='flex-col px-3 overflow-scroll'>
              {
                data.map((order,index)=>{
                  return (
                    <div className="py-4 border-b-2">
                      <Order order={order} />
                    </div>
                    
                  )
                })
              }
            </div>
            <div className='flex bottom-0 py-4 justify-center'>
            <h2 className='text-2xl mb-8 font-semibold'>Current Order</h2>
          </div>
          </div>
          
        </div>
        
    </div>
        
  )
}

export default UpcomingDelivery