import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  getGridStringOperators,
} from "@mui/x-data-grid";
import BarcodePreview from "./BarcodePreview";
import Actions from "./Actions";
import { useDispatch } from "react-redux";
import CustomNoRowsOverlay from "../UI/CustomNoRowsOverlay";
import { getFormattedDate } from "../../utils/date";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const DataTable = (props) => {
  const [queryOptions, setQueryOptions] = React.useState({});

  const filteredOperators = getGridStringOperators().filter(({ value }) =>
    ["equals", "contains"].includes(value)
  );

  let columns = [
    {
      field: "vip_code",
      headerName: "VIP Code",
      minWidth: 100,
      flex: 1,
      editable: true,
      filterOperators: filteredOperators,
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      minWidth: 150,
      flex: 1,
      editable: true,
      filterOperators: filteredOperators,
    },
    {
      field: "barcode",
      headerName: "Barcode",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => <BarcodePreview params={params} />,
      sortable: false,
      filterable: false,
    },
    {
      field: "phone",
      headerName: "Phone No.",
      minWidth: 100,
      flex: 1,
      sortable: false,
      filterable: false,
    },
    {
      field: "nrc",
      headerName: "NRC No.",
      minWidth: 100,
      flex: 1,
      sortable: false,
      filterable: false,
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 100,
      flex: 1,
      sortable: false,
      filterable: false,
    },

    {
      field: "createdBy",
      headerName: "Created By",
      minWidth: 150,
      flex: 1,
      filterOperators: filteredOperators,
    },

    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 100,
      flex: 1,
      filterable: false,
      renderCell: (params) => getFormattedDate(params),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <Actions params={params} onFetch={props.fetchCustomers} />
      ),
      sortable: false,
      filterable: false,
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

  const onFilterChange = (filterModel) => {
    props.onFilter(filterModel);
  };

  return (
    <div style={{ display: "flex", height: "85%" }}>
      <div style={{ flexGrow: 1, backgroundColor: "white" }}>
        <DataGrid
          {...props}
          columns={columns}
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            ...(!props.admins && { Toolbar: CustomToolbar }),
          }}
          paginationMode="server"
          filterMode="server"
          getRowHeight={() => "auto"}
          style={{ padding: "10px" }}
          experimentalFeatures={{ newEditingApi: true }}
          onFilterModelChange={onFilterChange}
        />
      </div>
    </div>
  );
};

export default DataTable;
