import React from 'react'
import Layout from './index'
import { useState } from 'react'
import LeftSidebar from './LeftSidebar'
import { useNavigate, Outlet } from "react-router-dom";

const InventoryLayout = ({children}) => {
    const navigate = useNavigate();
    const lhsTabs = [{id: 1, value: 'Home'}, {id:2, value: 'Ride'}]
    const lhsBottomTabs = [{id: 1, value: 'Support'}]

    const [activeTab, setActiveTab] = useState(lhsTabs[0].value)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    const handleTabChange = (option) => {
        setActiveTab(option.value)
        navigate(option.value)
        window.__RHS_CONTENT_BOX_NODE.scrollTop = 0
    }

    const leftSideNode = (
        <LeftSidebar
            lhsOptions={lhsTabs}
            bottomTabs={lhsBottomTabs}
            activeTab={activeTab}
            onTabClick={handleTabChange}
            isSideBarOpen={isSideBarOpen}
            toggleSideBar={toggleSideBar}
        />
    )
  return (
    <>
            <h1>Inventory Layout</h1>
            {children}
            {/* <Layout
                leftSideNode={leftSideNode}
                children={children}
                isSideBarOpen={isSideBarOpen}
                toggleSideBar={toggleSideBar}
            /> */}
        </>
  )
}

export default InventoryLayout