import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import cx from "classnames";
import { Avatar } from "@mui/material";
import CallMadeIcon from "../../Shared/Icons/CallMadeIcon";
import { useMemo } from "react";

export default function RiderList() {
  
  const columns = useMemo(() => [
    {
      field: "id",
      headerName: "View",
      width: 50,
      headerClassName: 'bg-gs-gray',
      renderCell: () => (
        <div className="flex items-center justify-between">
          <CallMadeIcon />
        </div>
      ),
    },
    {
      field: "rider",
      headerName: "Rider",
      width: 200,
      headerClassName: 'bg-gs-gray',
      renderCell: (params) => (
        <div className="flex items-center justify-between">
          <Avatar
            sx={{ width: 21, height: 21 }}
            src={params.row.rider.photoURL}
          />
          <h4 className="mx-2">{params.row.rider.name}</h4>
          <CallMadeIcon />
        </div>
      ),
    },
    { field: "range", headerName: "Range", headerClassName: 'bg-gs-gray', width: 130 },
    {
      field: "latestLocation",
      headerClassName: 'bg-gs-gray',
      headerName: "Latest Location",
      flex: 1,
      sortable: false,
      width: 400,
    },
    { field: "progress", headerName: "Progress",headerClassName: 'bg-gs-gray', width: 130 },
    {
      field: "status",
      headerName: "Status",
      headerClassName: 'bg-gs-gray',
      renderCell: (params) => (
        <div
          className={cx("bg-[#0F5223] text-white py-1 px-2 rounded-md", {
            "bg-[#B3261E]": params.row.status === "Delayed",
            "bg-[#309134]": params.row.status === "On Route",
          })}
        >
          <h4>{params.row.status}</h4>
        </div>
      ),
    },
  ]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        density="compact"
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pagination
      />
    </div>
  );
}
