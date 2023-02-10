import React from "react";
import cx from "classnames";
import InventoryIcon from "../../Shared/Icons/InventoryIcon";
import RepositoryIcon from "../../Shared/Icons/RepositoryIcon";
import { useLocation } from "react-router-dom";
import CameraIcon from "../../Shared/Icons/CameraIcon";
import { LHS_BOTTOM_TABS_ICON } from "../../constants/sidebarconst";

const LeftSidebar = (props) => {
  const {
    lhsOptions,
    bottomTabs,
    heading,
    activeTab,
    onTabClick,
    location = { pathname: "/inventory" },
    toggleSideBar,
  } = props;
  return (
    <div className="max-w-[224px] w-full p-6">
      <div className="text-2xl font-bold pb-5">Inventory</div>
      <div>
        <div className="text-gs-text-gray font-semibold ">ALL RIDERS</div>
        <div className="">
          {lhsOptions.map((options, index) => {
            return (
              <div
                key={index}
                className={cx(
                  "w-full text-gs-text-gray font-semibold p-[14px] text-sm flex cursor-pointer",
                  {
                    "!text-gs-blue":
                      options.value.indexOf(location?.pathname?.split("/")[2]) >
                      -1,
                  }
                )}
                onClick={() => {
                  onTabClick(options);
                }}
              >
                <InventoryIcon
                  className={cx("mr-2", {
                    "!stroke-gs-blue":
                      options.value.indexOf(location?.pathname?.split("/")[2]) >
                      -1,
                  })}
                />
                {options.label}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="text-gs-text-gray font-semibold mt-6">SUPPORT</div>
        <div className="">
          {bottomTabs.map((options, index) => {
            return (
              <div
                key={index}
                className="w-full text-gs-text-gray font-semibold p-[14px] text-sm flex"
              >
                {LHS_BOTTOM_TABS_ICON(options)}
                {options.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
