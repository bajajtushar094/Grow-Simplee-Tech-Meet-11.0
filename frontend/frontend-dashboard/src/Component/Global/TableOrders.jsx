import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import cx from "classnames";
import { useMemo } from "react";

export default function OrderList(props) {
  // const data = [
  //   {
  //     folderName: "order1",
  //     files: ["building", "design", "drone", "forest", "ocean"],
  //   },
  //   {
  //     folderName: "order2",
  //     files: ["building", "design", "drone", "forest", "ocean"],
  //   },
  // ];
  const data = props.data;
  const rows = data.map((folder, index) => ({
    id: index,
    folderName: folder.folderName,
    number: folder.files.length,
    status: "Previewing",
  }));
  console.log(rows);
  // const rows = [
  //   {
  //     id: "1232",
  //     folderName: "Folder 1",
  //     number: "4",
  //     status: "Previewing",
  //   },
  //   {
  //     id: "12522",
  //     folderName: "Folder 2",
  //     number: "2",
  //     status: "Uploading",
  //   },
  //   {
  //     id: "123322",
  //     folderName: "Folder 3",
  //     number: "3",
  //     status: "Failed",
  //   },
  //   {
  //     id: "1233342",
  //     folderName: "Folder 3",
  //     number: "3",
  //     status: "Failed",
  //   },
  //   {
  //     id: "123354222",
  //     folderName: "Folder 3",
  //     number: "3",
  //     status: "Failed",
  //   },
  // ];
  const columns = useMemo(() => [
    {
      field: "folderName",
      headerClassName: "bg-white",
      renderHeader: () => <p className="font-semibold">{"Folder Name"}</p>,
      width: 260,
    },
    {
      field: "number",
      headerClassName: "bg-white",
      renderHeader: () => <p className="font-semibold">{"No. of Items"}</p>,
      width: 130,
    },
    {
      field: "status",
      headerClassName: "bg-white",
      renderHeader: () => <p className="font-semibold">{"Status"}</p>,
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
    <div className="my-8">
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight={true}
        checkboxSelection
      />
    </div>
  );
}
