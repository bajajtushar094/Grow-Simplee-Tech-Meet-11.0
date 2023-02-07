import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { TOP_TABS_ICON } from '../../constants/sidebarconst'

const Topbar = (props) => {

  const {topTabs,activeTab,onTopTabClick,location} = props
  
  return (
    <div className='bg-gs-gray py-3 px-8 flex justify-between items-center mb-6'>
      <div className=''>
        <ul className='flex space-x-10 '>
          {topTabs.map((option,index)=>{
            return (
              <div className='flex items-center'>
              {TOP_TABS_ICON(option)}
              <li key={index} onClick={()=>onTopTabClick(option)} className={cx('ml-2 text-gs-text-gray font-semibold cursor-pointer',{'!text-gs-blue':(option.value.indexOf(location?.pathname.split("/")[1]) > -1)})}>{option.label}</li>
              </div>
              )
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