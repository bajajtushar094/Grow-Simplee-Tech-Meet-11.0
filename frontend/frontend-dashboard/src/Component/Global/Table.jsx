import * as React from "react";
import { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import cx from "classnames";
import dayjs from 'dayjs'
import { Avatar } from "@mui/material";
import CallMadeIcon from "../../Shared/Icons/CallMadeIcon";
import { useState, useEffect } from "react";
import {
  INVENTORY_COLUMNS,
  REPOSITORY_HISTORY_COLUMNS,
  REPOSITORY_INHOUSE_COLUMNS,
} from "../../constants/tableconstants";

export default function AntDesignGrid({ tab = "", displayedList , checkboxSelection=true, className='' }) {
  const rows = displayedList
  const riderColumn = [
    {
      field: "id",
      headerName: "View",
      width: 50,
      headerClassName: 'bg-[#F8F8F7]',
      renderCell: () => (
        <div className="flex items-center justify-between">
          <CallMadeIcon />
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Rider",
      width: 200,
      headerClassName: 'bg-[#F8F8F7]',
      renderCell: (params) => (
        <div className="flex items-center justify-between">
          {params.row.photoURL &&<Avatar
            sx={{ width: 21, height: 21 }}
            src={params.row.photoURL}
          />}
          <h4 className="mx-2">{params.row.name}</h4>
          <CallMadeIcon />
        </div>
      ),
    },
    { field: "range", headerName: "Range", headerClassName: 'bg-[#F8F8F7]', width: 130 },
    {
      field: "current_order",
      headerClassName: 'bg-[#F8F8F7]',
      headerName: "Latest Location",
      flex: 0.8,
      sortable: false,
      width: 400,
      renderCell: (params) => (
        <div>
          {params.row.current_order.location}
        </div>
      ),
    },
    { field: "progress", headerName: "Progress %",headerClassName: 'bg-[#F8F8F7]', width: 130 },
    {
      field: "rider_status",
      headerName: "Status",
      headerClassName: 'bg-[#F8F8F7]',
      renderCell: (params) => (
        <div
          className={cx("bg-[#12B76A] text-white py-1 px-2 rounded-lg", {
            "bg-[#B3261E]": params.row.status === "Delayed",
            "bg-[#309134]": params.row.status === "On Route",
          })}
        >
          <h4>{params.row.rider_status}</h4>
        </div>
      ),
    },
  ]

  const inventoryColumn = [
    { field: "id", headerName: "Order ID", width: 130 },
    { field: "volume", headerName: "Volume (ml)", width: 130 },
    { field: "edd", headerName: "Delivery Date", width: 150, renderCell: (params) => (
      <div>
        {tab==="inventory"? dayjs().format("MMMM D, YYYY"): dayjs(params.row.edd).format("dddd, Dd MMM'YY")}
      </div>
    ), },
    {
      field: "location",
      headerName: "Delivery Address",
      sortable: false,
      width: 320,
    },
    {
      field: "delivery_action",
      headerName: "Category",
      width: 180,
      renderCell: (params) => (
        <div className="text-gs-blue text-sm font-semibold">
          {params.row.delivery_action}
        </div>
      ),
    },
    {
      field: "rider",
      headerName: "Rider",
      width: 180,
      renderCell: (params) => (
        <div className="flex items-center justify-between">
          <Avatar
            sx={{ width: 21, height: 21 }}
            src={params.row.rider?.img_URL}
          />
          <h4 className="mx-2">{params.row.rider?.name}</h4>
          <CallMadeIcon />
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => (
        <div
          className={cx("bg-[#0F5223] text-white py-1 px-2 rounded-2xl", {
            "bg-[#B3261E]": params.row.order_status === "delayed",
            "bg-[#706D64]": params.row.order_status === "out for delivery",
          })}
        >
          <h4>{params.row.order_status}</h4>
        </div>
      ),
    },
  ]
  const columns = useMemo(() => tab==="listView"? riderColumn:inventoryColumn);
  const [columnVisible, setColumnVisible] = useState(INVENTORY_COLUMNS);

  useEffect(() => {
    if (tab === "inventory")
     setColumnVisible(INVENTORY_COLUMNS);
    else if (tab === "history")
      setColumnVisible(REPOSITORY_HISTORY_COLUMNS);
    else if(tab==="inhouse")
     setColumnVisible(REPOSITORY_INHOUSE_COLUMNS);
  }, [tab]);

  return (
    <div style={{ height: "80vh", width: "100%" }} className={className}>
      <DataGrid
        rows={rows}
        columns={columns}
        columnVisibilityModel={columnVisible}
        getRowId={(row) => row.id}
        pagination
        checkboxSelection = {checkboxSelection}
      />
    </div>
  );
}
