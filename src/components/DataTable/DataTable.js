import React, { useCallback, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import BarcodePreview from "./BarcodePreview";
import Actions from "./Actions";
import { useDispatch } from "react-redux";
import CustomNoRowsOverlay from "../UI/CustomNoRowsOverlay";
import { getFormattedDate } from "../../utils/date";

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
      sortable: false,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => <Actions params={params} />,
      sortable: false,
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
      {
        field: "createdAt",
        headerName: "Created At",
        minWidth: 200,
        flex: 1,
        renderCell: (params) => getFormattedDate(params),
      },
      {
        field: "createdBy",
        headerName: "Created By",
        minWidth: 150,
        flex: 1,
      },

      {
        field: "updatedAt",
        headerName: "Updated At",
        minWidth: 150,
        flex: 1,
        renderCell: (params) => getFormattedDate(params),
      },

      {
        field: "actions",
        headerName: "Actions",
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (
          <Actions admins={props.admins} params={params} />
        ),
        sortable: false,
      },
    ];
  }

  return (
    <div style={{ display: "flex", height: "85%" }}>
      <div style={{ flexGrow: 1, backgroundColor: "white" }}>
        <DataGrid
          {...props}
          columns={columns}
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
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
