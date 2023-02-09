import InventoryIcon from "../Shared/Icons/InventoryIcon";
import IssueStatusIcon from "../Shared/Icons/IssueStatusIcon";
import RaiseIssueIcon from "../Shared/Icons/RaiseIssueIcon";
import cx from "classnames";
import { useLocation } from "react-router-dom";
import CartIcon from "../Shared/Icons/CartIcon";
import NotebookIcon from "../Shared/Icons/NotebookIcon";
import DashboardIcon from "../Shared/Icons/DashboardIcon";

export const routePaths = {
  dashboard: "/dashboard",
  ridermanagement: "/ridermanagement/listView",
  warehouse: "/warehouse",
  inventory: "/warehouse/inventory",
  history: "/warehouse/history",
  inhouse: "/warehouse/inhouse",
  raiseissue: "raiseissue",
  issuestatus: "issuestatus",
  profile: `/student/profile/`,
  login: "/login",
  listView: "/ridermanagement/listView",
  mapView: "/ridermanagement/mapView",
  volumeEstimation: "/volumeestimation"
};
export const TOP_TABS = [
  {
    id: "gs_dashboard",
    label: "Dashboard",
    value: routePaths.dashboard,
  },
  {
    id: "gs_rider_management",
    label: "Rider Management",
    value: routePaths.ridermanagement,
  },
  {
    id: "gs_warehouse",
    label: "Warehouse",
    value: routePaths.inventory,
  },
];
export const LHS_TABS = [
  {
    id: "gs_inventory",
    label: "Inventory",
    value: routePaths.inventory,
  },
  {
    id: "gs_history",
    label: "History",
    value: routePaths.history,
  },
  {
    id: "gs_inhouse",
    label: "Inhouse",
    value: routePaths.inhouse,
  },
  {
    id: "gs_task_1",
    label: "Vol Estimation",
    value: routePaths.volumeEstimation,
  },
];
export const LHS_TABS_VOL = [
  {
    id: "gs_live_feed_1",
    label: "Live Feed 1",
    value: routePaths.livefeed1,
  },
  {
    id: "gs_live_feed_2",
    label: "Live Feed 2",
    value: routePaths.livefeed2,
  },
  {
    id: "gs_live_feed_3",
    label: "Live Feed 3",
    value: routePaths.livefeed3,
  },
  {
    id: "gs_live_feed_4",
    label: "Live Feed 4",
    value: routePaths.livefeed4,
  },
  {
    id: "gs_live_feed_5",
    label: "Live Feed 5",
    value: routePaths.livefeed5,
  },
];
export const LHS_RIDER_MANAGEMENT_TABS = [
  {
    id: "gs_raise_issue",
    label: "list View",
    value: routePaths.listView,
  },
  {
    id: "gs_map_view",
    label: "Map View",
    value: routePaths.mapView,
  },
];
export const LHS_BOTTOM_TABS = [
  {
    id: "gs_raise_issue",
    label: "Raise Issue",
    value: routePaths.raiseissue,
  },
  {
    id: "gs_issue_status",
    label: "Issue Status",
    value: routePaths.issuestatus,
  },
];

export const LHS_BOTTOM_TABS_ICON = (options) => {
  let icon;
  switch (options.value) {
    case routePaths.raiseissue:
      icon = <RaiseIssueIcon className="mr-2" />;
      break;
    case routePaths.issuestatus:
      icon = <IssueStatusIcon className="mr-2" />;
      break;
  }
  return icon;
};

export const TOP_TABS_ICON = (options, location) => {
  let icon;
  switch (options.value) {
    case routePaths.dashboard:
      icon = (<DashboardIcon className={cx("", {
        "!stroke-gs-blue stroke-1":
          options.value.indexOf(location?.pathname.split("/")[2]) > -1,
        })}
        />
      );
      break;
    case routePaths.ridermanagement:
      icon = (
        <CartIcon
          className={cx("", {
            "!stroke-gs-blue stroke-[0.8px]":
              options.value.indexOf(location?.pathname.split("/")[2]) > -1,
          })}
        />
      );
      break;
    case routePaths.inventory || routePaths.history || routePaths.inhouse:
      icon = (
        <NotebookIcon
          className={cx("", {
            "!stroke-gs-blue !fill-gs-blue":
              options.value.indexOf(location?.pathname.split("/")[2]) > -1,
          })}
        />
      );
      break;
  }
  return icon;
};
