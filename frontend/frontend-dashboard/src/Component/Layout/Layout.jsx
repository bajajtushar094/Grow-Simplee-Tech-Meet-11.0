import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import cx from "classnames";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
// import ListViewBar from "./ListViewBar";
// import RightSideBar from "./RightSidebar";
// import ProgressBar from "./ProgressBar";
// import UploadZip from "./UploadZip";
// import AddFilesBtn from "./AddFilesBtn";
// import * as SIDEBARCONSTANT from '/constants/sidebarconst.js'
import { LHS_TABS } from "../../constants/sidebarconst";
import { LHS_BOTTOM_TABS } from "../../constants/sidebarconst";
import { TOP_TABS } from "../../constants/sidebarconst";
import { routePaths } from "../../constants/sidebarconst";

const Layout = ({children}) => {
  const navigate = useNavigate();
  const [activeTopTab, setActiveTopTab] = useState(TOP_TABS[0].value);
  const [activeTab, setActiveTab] = useState(LHS_TABS[0].value);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [leftSidebar, hideLeftSidebar] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const handleTopTabChange =(option)=>{
    setActiveTab(option.value)
    navigate(option.value)
  }
  const handleTabChange = (option) => {
    setActiveTab(option.value);
    navigate(option.value);
    window.__RHS_CONTENT_BOX_NODE.scrollTop = 0;
  };

  return (
    <div>
        <TopBar 
        topTabs = {TOP_TABS}
        activeTab={activeTopTab}
        onTopTabClick={handleTopTabChange}
        />
        <div className='flex'>
        <LeftSidebar 
        lhsOptions={LHS_TABS}
        bottomTabs={LHS_BOTTOM_TABS}
        activeTab={activeTab}
        onTabClick={handleTabChange}
        isSideBarOpen={isSideBarOpen}
        toggleSideBar={toggleSideBar}
        />
        {children}
      </div>
      {/* <ProgressBar progress="2" /> */}
    </div>
  );
};

export default Layout;
