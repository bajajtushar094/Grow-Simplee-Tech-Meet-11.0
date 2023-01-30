import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import cx from "classnames";
import { Avatar } from "@mui/material";
import CallMadeIcon from "../../Shared/Icons/CallMadeIcon";
import { useMemo } from "react";

export default function RiderList() {
  const rows = [
    {
      id: "1232",
      rider: {
        name: "Kathryn Murphy",
        photoURL:
          "https://images.unsplash.com/photo-1674238924120-a9d9a0425d28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      },
      range: "6 KM",
      latestLocation: "4140 Parker Rd. Allentown, New Mexico 31134",
      progress: "25%",
      status: "On Route",
    },
    {
      id: "12522",
      rider: {
        name: "Wade Warren",
        photoURL:
          "https://images.unsplash.com/photo-1674238924120-a9d9a0425d28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      },
      range: "9 KM",
      latestLocation: "2464 Royal Ln. Mesa, New Jersey 45463",
      progress: "65%",
      status: "On Route",
    },
    {
      id: "123322",
      rider: {
        name: "Courtney Henry",
        photoURL:
          "https://images.unsplash.com/photo-1674238924120-a9d9a0425d28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      },
      range: "17 KM",
      latestLocation: "3517 W. Gray St. Utica, Pennsylvania 57867",
      progress: "34%",
      status: "Delayed",
    },
  ];
  const columns = useMemo(() => [
    {
      field: "id",
      headerName: "View",
      width: 50,
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
    { field: "range", headerName: "Range", width: 130 },
    {
      field: "latestLocation",
      headerName: "Latest Location",
      sortable: false,
      width: 400,
    },
    { field: "progress", headerName: "Progress", width: 130 },
    {
      field: "status",
      headerName: "Status",
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
        rowHeight={35}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pagination
      />
    </div>
  );
}
