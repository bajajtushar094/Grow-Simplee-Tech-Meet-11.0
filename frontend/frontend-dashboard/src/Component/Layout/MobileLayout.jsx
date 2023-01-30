//import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import BackArrowIcon from '../../Shared/Icons/BackArrow'
import HomeIcon from '../../Shared/Icons/HomeIcon'

const MobileLayout = ({children,photoURL='',subHeading=''}) => {
  
  return (
    <div className='flex flex-col h-screen'>
        <div className='flex justify-between bg-white px-4 py-3 items-center border-b border-[#D2D1CC]'>
          <BackArrowIcon/>
          <h4 className='text-sm text-gs-text-gray font-semibold'>{subHeading}</h4>
          {/* <Link to='/checklist'><Avatar fontSize='small' src={photoURL} alt='Profile-Img'/></Link> */}
          <Link to='/checklist'><HomeIcon/></Link>
        </div>
        <div className='flex flex-col flex-grow relative bg-[#F8F8F7]'>
        {children}
        </div>
     
    </div>
  )
}

export default MobileLayout