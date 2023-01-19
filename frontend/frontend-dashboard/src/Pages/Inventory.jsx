import React from 'react'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import Table from '../Component/Global/Table'
import Layout from '../Component/Layout'
import PlayListAddCheckIcon from '../Shared/Icons/PlayListAddCheckIcon';
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined';


const Inventory = () => {
  return (
      <Layout>
        <div className='w-full flex-col'>
          <div className='flex justify-end w-full space-x-8'>
            <div className='flex py-3 space-x-8 border-solid border-2 border-[#EDECE9] px-8 bg-[#FAFAFA] rounded-tl-sm'>
            <KeyboardDoubleArrowRightOutlinedIcon className='cursor-pointer'/>
            <button className='text-gs-black text-sm font-semibold'><FileDownloadIcon fontSize='medium' /> Download</button>
            <button className='text-gs-black text-sm font-semibold'><ContentCopyOutlinedIcon fontSize='small'/> Download</button>
            <button className='text-gs-black text-sm font-semibold'><FileDownloadIcon fontSize='medium'/> Download</button>
            <button className='text-gs-black text-sm font-semibold'><ContentCopyOutlinedIcon fontSize='small'/> Download</button>
            </div>
          </div>
          <div className='bg-white rounded-tl-3xl'>
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
                <button className='text-gs-text-gray text-sm font-semibold'><MopedOutlinedIcon fontSize='small' className='mr-1'/>History</button>
                <button className='text-gs-text-gray text-sm font-semibold'><MopedOutlinedIcon fontSize='small' className='mr-1'/>Inhouse</button>
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
            <Table />
          </div>
        </div>
       </Layout>
  )
}

export default Inventory