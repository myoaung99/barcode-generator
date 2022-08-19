import React, { useCallback } from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import BarcodePreview from "./BarcodePreview";
import { getFormattedDate } from "../../utils/date";
import Actions from "./Actions";

// TODO: get dynamic data
const rows = [
  {
    id: 1,
    code: "0020921912",
    customerName: "Myo Myint Aung",
    adminName: "TUN TUN",
    date: getFormattedDate(new Date()),
  },
  {
    id: 2,
    code: "0020921912",
    customerName: "Myo Myint Aung",
    adminName: "TUN TUN",
    date: getFormattedDate(new Date()),
  },
];

// TODO: get dynamic data
const columns = [
  {
    field: "code",
    headerName: "VIP Code",
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "barcode",
    headerName: "Barcode",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => <BarcodePreview params={params} />,
  },
  { field: "adminName", headerName: "Created By", minWidth: 150, flex: 1 },
  { field: "date", headerName: "Created At", minWidth: 200, flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => <Actions params={params} />,
  },
];

const DataTable = () => {
  const rowUpdateHandler = useCallback(async (newRow) => {
    // TODO: Make the HTTP request to save in the backend
    // update row
    console.log(newRow);
  }, []);

  const rowUpdateErrorHandler = useCallback((error) => {
    console.log(error);
  }, []);

  return (
    <div style={{ display: "flex", height: "85%" }}>
      <div style={{ flexGrow: 1, backgroundColor: "white" }}>
        <DataGrid
          experimentalFeatures={{ newEditingApi: true }}
          rows={rows}
          columns={columns}
          getRowHeight={() => "auto"}
          style={{ padding: "10px" }}
          processRowUpdate={rowUpdateHandler}
          onProcessRowUpdateError={rowUpdateErrorHandler}
        />
      </div>
    </div>
  );
};

export default DataTable;
