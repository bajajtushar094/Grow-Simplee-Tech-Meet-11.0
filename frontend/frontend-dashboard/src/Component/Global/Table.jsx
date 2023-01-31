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

export default function AntDesignGrid({ tab = "", displayedList }) {
  const rows = displayedList
  const columns = useMemo(() => [
    { field: "id", headerName: "Order ID", width: 130 },
    { field: "volume", headerName: "Volume (ml)", width: 130 },
    { field: "edd", headerName: "Delivery Date", width: 150, renderCell: (params) => (
      <div>
        {tab==="inventory"? dayjs().format("MMMM D, YYYY"): dayjs(params.row.edd).format("dddd, Dd MMM'YY")}
      </div>
    ), },
    {
      field: "address",
      headerName: "Delivery Address",
      sortable: false,
      width: 320,
      renderCell: (params) => (
        <div>
          {params.row.address.name}
        </div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 180,
      renderCell: (params) => (
        <div className="text-gs-blue text-sm font-semibold">
          {params.row.category}
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
            src={params.row.rider.img_URL}
          />
          <h4 className="mx-2">{params.row.rider.name}</h4>
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
  ]);
  const [columnVisible, setColumnVisible] = useState(INVENTORY_COLUMNS);
  useEffect(() => {
    if (tab === "inventory") setColumnVisible(INVENTORY_COLUMNS);
    else if (tab === "history")
      setColumnVisible(REPOSITORY_HISTORY_COLUMNS);
    else setColumnVisible(REPOSITORY_INHOUSE_COLUMNS);
  }, [tab]);
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        columnVisibilityModel={columnVisible}
        getRowId={(row) => row.id}
        pagination
        checkboxSelection
      />
    </div>
  );
}
