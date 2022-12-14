import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCustomer, deleteSystemAdmin } from "../../utils/https";
import { removeCustomer } from "./../../store/customer-slice";
import { removeAdmin } from "../../store/admin-slice";
import { LoadingButton } from "@mui/lab";
import { saveAs } from "file-saver";

const Actions = ({ params, admins, onFetch }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [isDeleting, setIsDeleting] = useState(false);

  const downloadHandler = () => {
    const fileName = `${params.row.customer_name}_${params.row.vip_code}`;
    saveAs(params.row.barcode, fileName);
  };

  const deleteHandler = async () => {
    setIsDeleting(true);

    // TODO: Error handling
    if (admins) {
      // delete admin
      await deleteSystemAdmin(params.row._id, token);
      dispatch(removeAdmin(params.row._id));
    } else {
      // delete customer
      await deleteCustomer(params.row.id, token);
      dispatch(removeCustomer(params.row.id));
      await onFetch();
    }

    setIsDeleting(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: admins ? 10 : 0,
        paddingBottom: admins ? 10 : 0,
      }}
    >
      {!admins && (
        <Button
          variant="outlined"
          color="success"
          aria-label="download barcode"
          size="small"
          startIcon={<DownloadIcon />}
          style={{ marginBottom: 5 }}
          onClick={downloadHandler}
        >
          Save
        </Button>
      )}

      <LoadingButton
        variant="outlined"
        color="error"
        size="small"
        loading={isDeleting}
        loadingPosition="start"
        startIcon={<DeleteIcon />}
        onClick={deleteHandler}
      >
        Delete
      </LoadingButton>
    </div>
  );
};

export default Actions;
