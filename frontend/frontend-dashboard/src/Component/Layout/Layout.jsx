import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cx from "classnames";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
import {
  LHS_RIDER_MANAGEMENT_TABS,
  LHS_TABS,
  LHS_TABS_VOL,
} from "../../constants/sidebarconst";
import { LHS_BOTTOM_TABS } from "../../constants/sidebarconst";
import { TOP_TABS } from "../../constants/sidebarconst";
import { routePaths } from "../../constants/sidebarconst";

const Layout = ({
  children,
  isLeftSidebarPresent = true,
  flex_dir = "row",
}) => {
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
    setActiveTopTab(option.value);
    navigate(option.value);
  };
  const handleTabChange = (option) => {
    setActiveTab(option.value);
    navigate(option.value);
  };
  const getLhsTabs = () => {
    if (location.pathname.split("/")[1] === "warehouse") return LHS_TABS;
    else if (location.pathname.split("/")[1] === "ridermanagement")
      return LHS_RIDER_MANAGEMENT_TABS;
    else if (location.pathname.split("/")[1] === "volumeestimation")
      return LHS_TABS_VOL;
  };

  return (
    <div>
      <TopBar
        topTabs={TOP_TABS}
        activeTab={activeTopTab}
        onTopTabClick={handleTopTabChange}
        location={location}
      />
      <div className={flex_dir == "row" ? "flex" : "flex-col"}>
        {isLeftSidebarPresent && (
          <LeftSidebar
            heading={
              location.pathname === "/volumeestimation" ? "Views" : "All drones"
            }
            lhsOptions={getLhsTabs()}
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
