import React from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import BarcodePreview from "./BarcodePreview";
import { getFormattedDate } from "../../utils/date";
import Actions from "./Actions";

// TODO: get dynamic data
const rows = [
  {
    id: 1,
    col1: "0020921912",
    col2: "Myo Myint Aung",
    col4: "TUN TUN",
    col5: getFormattedDate(new Date()),
  },
];

// TODO: get dynamic data
const columns = [
  {
    field: "col1",
    headerName: "VIP Code",
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "col2",
    headerName: "Customer Name",
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "col3",
    headerName: "Barcode",
    minWidth: 150,
    flex: 1,
    renderCell: () => <BarcodePreview />,
  },
  { field: "col4", headerName: "Created By", minWidth: 150, flex: 1 },
  { field: "col5", headerName: "Created At", minWidth: 200, flex: 1 },
  {
    field: "col6",
    headerName: "Actions",
    minWidth: 150,
    flex: 1,
    renderCell: () => <Actions />,
  },
];

const DataTable = () => {
  return (
    <div style={{ display: "flex", height: "85%" }}>
      <div style={{ flexGrow: 1, backgroundColor: "white" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowHeight={() => "auto"}
          style={{ padding: "10px" }}
        />
      </div>
    </div>
  );
};

export default DataTable;
