import { useState } from 'react'
import { useNavigate, Outlet } from "react-router-dom";
import cx from 'classnames'
import TopBar from './TopBar'
import LeftSidebar from './LeftSidebar'
import ListViewBar from './ListViewBar';

const Layout = ({children}) => {
    const navigate = useNavigate();
    const lhsTabs = [{id: 1, value: 'Home'}, {id:2, value: 'Ride'}]
    const lhsBottomTabs = [{id: 1, value: 'Support'}]

    const [activeTab, setActiveTab] = useState(lhsTabs[0].value)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const [leftSidebar, hideLeftSidebar] = useState(false)
    const [hideTopBar, setHideTopBar] = useState(false)

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    const handleTabChange = (option) => {
        setActiveTab(option.value)
        navigate(option.value)
        window.__RHS_CONTENT_BOX_NODE.scrollTop = 0
    }

  return (
    <div>
        <TopBar />
        <div className='flex'>
        <LeftSidebar />
        {children}
        </div>
        {/* <h1>Layout</h1>
        {props.children} */}
    </div>
    // <div className={cx('overflow-hidden w-screen h-screen')}>
    //             {children}
    //             <div className={cx('relative w-screen h-screen flex flex-row')}>
    //                 {isSideBarOpen && (
    //                     <div
    //                         className="h-full w-full absolute z-10 bg-black opacity-30"
    //                         onClick={toggleSideBar}
    //                     />
    //                 )}
    //                 {!hideLeftSidebar && (
    //                     <div
    //                         className={cx(
    //                             'sticky bottom-0 left-0 top-0 w-[298px] min-w-[298px] h-full bg-primary md:absolute md:-left-full z-20 transition-all duration-500 ease-in',
    //                             {
    //                                 'md:!left-0': isSideBarOpen,
    //                             }
    //                         )}
    //                     >
    //                         <LeftSidebar />
    //                     </div>
    //                 )}
    //                 <div
    //                     className={cx(
    //                         'sticky flex flex-col items-start right-0 left-0 flex-grow overflow-auto'
    //                     )}
    //                 >
    //                     {!hideTopBar && (
    //                         <TopBar/>
    //                     )}
    //                     <div
    //                         className={`no-scrollbar w-full h-full overflow-auto relative pb-32 pt-[78px] bg-[#f7f8fa] sm:pt-[99px] `}
                            
    //                     >
    //                         {children}
    //                     </div>
    //                 </div>
    //             </div>
    //             <Outlet />
    //         </div>
  )
}

export default Layout