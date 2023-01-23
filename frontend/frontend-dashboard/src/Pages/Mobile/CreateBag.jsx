import React, { useState } from 'react'
import MobileLayout from '../../Component/Layout/MobileLayout'
import {Link} from 'react-router-dom'
import CreateBagBoxIcon from '../../Shared/Icons/CreateBagBoxIcon'
import ScanIcon from '../../Shared/Icons/ScanIcon'
import CorrectArrowIcon from '../../Shared/Icons/CorrectArrowIcon'
import cx from 'classnames'

const CreateBag = () => {
  const data =[{
    orderName:'Darrell Steward',
    orderId:'RO10-445-A65E2',
    isVerified:true,
  },
  {
    orderName:'Darrell Steward',
    orderId:'RO10-445-A65E2',
    isVerified:false,
  },]
  return (
    <MobileLayout className='text-sm' subHeading='Item Checklist'>
        <>
        <h2 className='text-2xl mb-8 font-semibold'>Create your bag</h2>
        <div className='flex-col'>
          {
            data.map((order,index)=>{
              return (<div key={index} className={cx('flex items-center p-3',{'bg-white':order?.isVerified,'rounded-t-xl':index===0,'rounded-b-xl':index===order.size-1})}>
              <div className='border-2 border-solid p-[14px] rounded-xl border-[#C5C5C5]'><CreateBagBoxIcon/></div>
              <div className='flex-col w-full px-3'>
              <h4 className='text-[14px] font-semibold'>{order.orderName}</h4>
              <h4 className='text-xs font-semibold text-gs-text-gray'>{order.orderId}</h4></div>
              {
                order?.isVerified? <div className='rounded-[100%] text-sm p-[10px] items-center justify-center flex bg-[#4CAF50]'><CorrectArrowIcon /></div> : <Link to='/scan' className='border-2 border-solid p-[14px] rounded-xl border-[#C5C5C5]'><ScanIcon/></Link>
              }
          </div>)
            })
          }
        </div>
        </>
    </MobileLayout>
  )
}

export default CreateBag