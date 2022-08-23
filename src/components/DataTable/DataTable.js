import React, { useCallback, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import BarcodePreview from "./BarcodePreview";
import Actions from "./Actions";
import { useDispatch } from "react-redux";
import CustomNoRowsOverlay from "../UI/CustomNoRowsOverlay";

const DataTable = (props) => {
  const dispatch = useDispatch();

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

  const rowUpdateHandler = useCallback((newRow) => {
    // TODO: Make the HTTP request to save in the backend
    // update row
    console.log(newRow.id, newRow.customer_name);
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
          rowsPerPageOptions={[5]}
          paginationMode="server"
          getRowHeight={() => "auto"}
          style={{ padding: "10px" }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
    </div>
  );
};

export default DataTable;
