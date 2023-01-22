import React from 'react'
import { Link } from 'react-router-dom'

const Topbar = () => {
  return (
    <div className='bg-gs-gray py-3 px-8 flex justify-between'>
      <div className=''>
        <ul className='flex space-x-10 '>
          <Link to='/about'><li className='text-gs-text-gray font-semibold'>Dashboard</li></Link>
          <Link to='/about'><li className='text-gs-text-gray font-semibold'>Rider Management</li></Link>
          <Link to='/about'><li className='text-gs-text-gray font-semibold'>Inventory</li></Link>
        </ul>
      </div>
      <div className='flex'>
        <div className='rounded-[100%] h-9 w-9 bg-black text-white text-lg items-center justify-center flex'>
           SS
        </div>
      </div>
    </div>
  )
}

export default Topbar