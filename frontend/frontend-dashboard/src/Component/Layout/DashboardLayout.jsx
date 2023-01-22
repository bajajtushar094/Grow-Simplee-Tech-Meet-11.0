import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import cx from "classnames";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
import ListViewBar from "./ListViewBar";
import RightSideBar from "./RightSidebar";
import ProgressBar from "./ProgressBar";
import UploadZip from "./UploadZip";
import AddFilesBtn from "./AddFilesBtn";
import WebcamCapture from "./Webcam";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const lhsTabs = [
    { id: 1, value: "Home" },
    { id: 2, value: "Ride" },
  ];
  const lhsBottomTabs = [{ id: 1, value: "Support" }];

  const [activeTab, setActiveTab] = useState(lhsTabs[0].value);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [leftSidebar, hideLeftSidebar] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleTabChange = (option) => {
    setActiveTab(option.value);
    navigate(option.value);
    window.__RHS_CONTENT_BOX_NODE.scrollTop = 0;
  };

  return (
    <div>
      <TopBar />
      <div className="bottom-0 flex-col">
        {/* <LeftSidebar /> */}
        {children}
      </div>
      {/* <ProgressBar progress="2" /> */}
    </div>
  );
};

export default Layout;
