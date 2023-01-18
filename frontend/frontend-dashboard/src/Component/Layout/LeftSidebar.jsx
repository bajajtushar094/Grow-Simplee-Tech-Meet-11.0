import React from 'react'

const LeftSidebar = () => {
  return (
    <div className='max-w-[224px] w-full p-6'>
      <div className='text-2xl font-semibold pb-5'>
        Inventory
      </div>
      <div>
      <div className='text-gs-text-gray font-semibold '>All Drones</div>
      <div className=''>
      <div className='w-full text-gs-text-gray p-[14px]'>
        Inventory
      </div>
      <div className='w-full text-gs-text-gray p-[14px]'>
        Repository
      </div>
      </div>
      </div>
      <div>
      <div className='text-gs-text-gray font-semibold '>Support</div>
      <div className=''>
      <div className='w-full text-gs-text-gray p-[14px]'>
        Inventory
      </div>
      <div className='w-full text-gs-text-gray p-[14px]'>
        Repository
      </div>
      </div>
      </div>
    </div>
  )
}

export default LeftSidebar