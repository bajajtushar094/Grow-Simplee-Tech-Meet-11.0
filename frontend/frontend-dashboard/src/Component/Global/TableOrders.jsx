import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import cx from "classnames";
import { useMemo } from "react";

export default function OrderList() {
  const rows = [
    {
      id: "1232",
      fileName: "Folder 1",
      number: "4",
      status: "Previewing",
    },
    {
      id: "12522",
      fileName: "Folder 2",
      number: "2",
      status: "Uploading",
    },
    {
      id: "123322",
      fileName: "Folder 3",
      number: "3",
      status: "Failed",
    },
  ];
  const columns = useMemo(() => [
    {
      field: "fileName",
      headerName: "File Name",
      headerClassName: "bg-white",
      width: 180,
    },
    {
      field: "number",
      headerName: "No. of items",
      headerClassName: "bg-white",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-white",
      width: 180,
      renderCell: (params) => (
        <div
          className={cx("bg-[#0F5223] text-white py-1 px-2 rounded-md", {
            "bg-[#B3261E]": params.row.status === "Previewing",
            "bg-gray-500": params.row.status === "Uploading",
            "bg-[#309134]": params.row.status === "Failed",
          })}
        >
          <h4>{params.row.status}</h4>
        </div>
      ),
    },
  ]);

  return (
    <div style={{ height: 88 * rows.length, width: 545, overflowX:"hidden" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
      />
    </div>
  );
}
