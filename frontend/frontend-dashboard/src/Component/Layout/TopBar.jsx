import React from 'react'
import { Link } from 'react-router-dom'

const Topbar = (props) => {

  const {topTabs,activeTab,onTopTabClick} = props
  return (
    <div className='bg-gs-gray py-3 px-8 flex justify-between items-center mb-6'>
      <div className=''>
        <ul className='flex space-x-10 '>
          {topTabs.map((option)=>{
            return (<Link to={option.value}><li className='text-gs-text-gray font-semibold'>{option.label}</li></Link>)
          })}
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