import React, { useCallback } from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import BarcodePreview from "./BarcodePreview";
import { getFormattedDate } from "../../utils/date";
import Actions from "./Actions";
import { useSelector } from "react-redux";
import CustomNoRowsOverlay from "../UI/CustomNoRowsOverlay";

// TODO: get dynamic data
const columns = [
  {
    field: "vip_code",
    headerName: "VIP Code",
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "customer_name",
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
  { field: "createdBy", headerName: "Created By", minWidth: 150, flex: 1 },
  { field: "createdAt", headerName: "Created At", minWidth: 200, flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => <Actions params={params} />,
  },
];

const DataTable = ({ isFetching }) => {
  const customers = useSelector((state) => state.customer.customers);

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
          rows={customers}
          columns={columns}
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          loading={isFetching}
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
