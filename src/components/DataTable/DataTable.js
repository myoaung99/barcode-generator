import React, { useCallback, useState } from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import BarcodePreview from "./BarcodePreview";
import { getFormattedDate } from "../../utils/date";
import Actions from "./Actions";
import { useSelector } from "react-redux";
import CustomNoRowsOverlay from "../UI/CustomNoRowsOverlay";

const DataTable = (props) => {
  let columns = [
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

  if (props.admins) {
    columns = [
      {
        field: "username",
        headerName: "Admin Name",
        minWidth: 150,
        flex: 1,
        editable: true,
      },
      { field: "createdAt", headerName: "Created At", minWidth: 200, flex: 1 },
      { field: "createdBy", headerName: "Created By", minWidth: 150, flex: 1 },

      {
        field: "updatedAt",
        headerName: "Updated At",
        minWidth: 150,
        flex: 1,
      },

      {
        field: "actions",
        headerName: "Actions",
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (
          <Actions admins={props.admins} params={params} />
        ),
      },
    ];
  }

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
          {...props}
          columns={columns}
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          pageSize={5}
          paginationMode="server"
          getRowHeight={() => "auto"}
          style={{ padding: "10px" }}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={rowUpdateHandler}
          onProcessRowUpdateError={rowUpdateErrorHandler}
        />
      </div>
    </div>
  );
};

export default DataTable;
