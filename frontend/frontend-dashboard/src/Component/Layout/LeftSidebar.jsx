import React from 'react'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import InventoryIcon from '../../Shared/Icons/InventoryIcon';
import RepositoryIcon from '../../Shared/Icons/RepositoryIcon';

const LeftSidebar = (props) => {
  const {lhsOptions,
  bottomTabs,
  activeTab,
  onTabClick,
  isSideBarOpen,
  toggleSideBar} = props
  return (
    <div className='max-w-[224px] w-full p-6'>
      <div className='text-2xl font-bold pb-5'>
        Inventory
      </div>
      <div>
      <div className='text-gs-text-gray font-semibold '>ALL DRONES</div>
      <div className=''>
      {lhsOptions.map((options,index)=> {
          return (
          <div className='w-full text-gs-text-gray font-semibold p-[14px] text-sm flex'>
          <InventoryIcon  className='mr-2'/>
            {options.label}
          </div>)
        })}
      </div>
      </div>
      <div>
      <div className='text-gs-text-gray font-semibold mt-6'>SUPPORT</div>
      <div className=''>
        {
          bottomTabs.map((options,index)=>{
             return <div className='w-full text-gs-text-gray font-semibold p-[14px] text-sm flex'>
              <RepositoryIcon className='mr-2'/>
               {options.label}
             </div>
          })
        }
      </div>
      </div>
    </div>
  )
}

export default LeftSidebar