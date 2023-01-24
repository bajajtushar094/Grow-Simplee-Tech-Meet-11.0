import { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import cx from "classnames";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
import { LHS_TABS, LHS_TABS_VOL } from "../../constants/sidebarconst";
import { LHS_BOTTOM_TABS } from "../../constants/sidebarconst";
import { TOP_TABS } from "../../constants/sidebarconst";
import { routePaths } from "../../constants/sidebarconst";

const Layout = ({ children, isLeftSidebarPresent = true, flex_dir="row" }) => {
  const navigate = useNavigate();
  const [activeTopTab, setActiveTopTab] = useState(TOP_TABS[2].value);
  const [activeTab, setActiveTab] = useState(LHS_TABS[0].value);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
  const location = useLocation();
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const handleTopTabChange = (option) => {
    setActiveTab(option.value);
    navigate(option.value);
  };
  const handleTabChange = (option) => {
    setActiveTab(option.value);
    navigate(option.value);
  };

  return (
    <div>
      <TopBar
        topTabs={TOP_TABS}
        activeTab={activeTopTab}
        onTopTabClick={handleTopTabChange}
        location={location}
      />
      <div className={flex_dir == "row"? "flex" : "flex-col"}>
        {isLeftSidebarPresent && (
          <LeftSidebar
            heading={location.pathname === "/vol" ? "Views" : "All drones"}
            lhsOptions={location.pathname === "/vol" ? LHS_TABS_VOL : LHS_TABS}
            bottomTabs={LHS_BOTTOM_TABS}
            activeTab={activeTab}
            onTabClick={handleTabChange}
            isSideBarOpen={isSideBarOpen}
            toggleSideBar={toggleSideBar}
            location={location}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Layout;
