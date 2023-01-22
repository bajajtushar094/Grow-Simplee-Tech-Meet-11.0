import React from 'react'
import cx from 'classnames'
import InventoryIcon from '../../Shared/Icons/InventoryIcon';
import RepositoryIcon from '../../Shared/Icons/RepositoryIcon';

const LeftSidebar = (props) => {
  const {lhsOptions,
  bottomTabs,
  activeTab,
  onTabClick,
  location,
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
          <div key={index} className={cx('w-full text-gs-text-gray font-semibold p-[14px] text-sm flex cursor-pointer',{'!text-gs-blue':(options.value.indexOf(location.pathname.split('/')[2].split('-')[0])> -1)})} onClick={()=>{onTabClick(options)}}>
          <InventoryIcon  className={cx('mr-2',{'!stroke-gs-blue':(options.value.indexOf(location.pathname.split('/')[2].split('-')[0]) > -1)})}/>
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
             return <div key={index} className='w-full text-gs-text-gray font-semibold p-[14px] text-sm flex'>
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