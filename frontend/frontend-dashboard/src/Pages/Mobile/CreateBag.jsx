import React, { useEffect, useState } from 'react'
import MobileLayout from '../../Component/Layout/MobileLayout'
import {Link, useNavigate} from 'react-router-dom'
import CreateBagBoxIcon from '../../Shared/Icons/CreateBagBoxIcon'
import ScanIcon from '../../Shared/Icons/ScanIcon'
import CorrectArrowIcon from '../../Shared/Icons/CorrectArrowIcon'
import cx from 'classnames'
import CrossIcon from '../../Shared/Icons/CrossIcon'
import { useSelector, useDispatch } from 'react-redux';
import {
  getLoggedIn,
  getPackages
} from '../../features/rider/riderSlice';

const CreateBag = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const loggedIn = useSelector(getLoggedIn);

  
  if(!loggedIn){
    navigate('/login');
  }

  
  const packages = useSelector(getPackages);

  useEffect(() => {
    const packagesInBag = packages.filter(item=>item.isInBag);
    console.log(packagesInBag.length, packages.length);
    if(packagesInBag.length === packages.length){
      navigate('/tripRoute');
    }
  });
  

  return (
    <MobileLayout className='text-sm' subHeading='Item Checklist'>
        <>
        <div className='px-4 py-6 bg-[#F8F8F7]'>
        <h2 className='text-2xl mb-6 font-semibold px-1'>Create your bag</h2>
        <div className='flex-col '>
          {
            packages.map((item,index)=>{
              return (
                <div key={index} className={cx('flex items-center p-3',
                  {'bg-white':item?.isInBag,'rounded-t-xl':index===0,'rounded-b-xl':index===item.size-1,'border-b border-[#C5C5C5]':!item?.isInBag}
                )}>
                  <div className='border border-solid p-[14px] rounded-xl border-[#C5C5C5]'><CreateBagBoxIcon/></div>
                  <div className='flex-col w-full px-3'>
                  <h4 className='text-[14px] font-semibold'>{item.name}</h4>
                  <h4 className='text-xs font-semibold text-gs-text-gray'>{item.orderId}</h4></div>
                  {
                    item?.isCancelled?
                      <div className='mx-[8px] my-[6px] w-[36px] h-[36px] rounded-[100%] text-sm p-[12px] items-center justify-center flex bg-[#ea5252]'><CrossIcon /></div>
                    :
                    item?.isInBag? 
                    <div className='mx-[8px] my-[6px] rounded-[100%] text-sm pt-[12px] pb-[13px] px-[10px] items-center justify-center flex bg-[#4CAF50]'><CorrectArrowIcon /></div>
                     : 
                    <Link to='/scanQR' 
                          state={{
                            orderId: item.orderId,
                            type: 'packageScan'
                          }}
                          className='border-2 border-solid p-[14px] rounded-xl border-[#C5C5C5]'><ScanIcon/>
                    </Link>
                  }
                </div>
              )
            })
          }
        </div>
        </div>
        </>
    </MobileLayout>
  )
}

export default CreateBag