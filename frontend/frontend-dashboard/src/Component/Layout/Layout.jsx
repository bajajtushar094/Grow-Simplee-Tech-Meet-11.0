import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const Layout = ({children, isLeftSidebarPresent=true}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTopTab, setActiveTopTab] = useState(TOP_TABS[2].value);
  const [activeTab, setActiveTab] = useState(LHS_TABS[0].value);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const handleTopTabChange =(option)=>{
    setActiveTopTab(option.value)
    navigate(option.value)
  }
  const handleTabChange = (option) => {
    setActiveTab(option.value);
    navigate(option.value);
  };

  return (
    <div>
        <TopBar 
        topTabs = {TOP_TABS}
        activeTab={activeTopTab}
        onTopTabClick={handleTopTabChange}
        location={location}
        />
        <div className='flex'>
          {
            isLeftSidebarPresent && <LeftSidebar 
            lhsOptions={LHS_TABS}
            bottomTabs={LHS_BOTTOM_TABS}
            activeTab={activeTab}
            onTabClick={handleTabChange}
            isSideBarOpen={isSideBarOpen}
            toggleSideBar={toggleSideBar}
            location={location}
            />
          }
        {children}
      </div>
      {/* <ProgressBar progress="2" /> */}
    </div>
  );
};

export default Layout;
