import { Avatar } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import BackArrowIcon from '../../Shared/Icons/BackArrow'

const MobileLayout = ({children,photoURL='',subHeading=''}) => {
  
  return (
    <div className='flex-col'>
        <div className='flex justify-between bg-white px-4 py-3 items-center'>
          <BackArrowIcon/>
          <h4 className='text-sm text-gs-text-gray font-semibold'>{subHeading}</h4>
          <Avatar fontSize='small' src={photoURL} alt='Profile-Img'/>
        </div>
        <div className='px-4 py-3 '>
        {children}
        </div>
     
    </div>
  )
}

export default MobileLayout