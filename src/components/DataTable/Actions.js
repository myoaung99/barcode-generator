import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCustomer } from "../../utils/https";
import { removeCustomer } from "./../../store/customer-slice";
import { LoadingButton } from "@mui/lab";
import { saveAs } from "file-saver";

const Actions = ({ params, admins }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [isDeleting, setIsDeleting] = useState(false);

  const downloadHandler = () => {
    const fileName = `${params.row.customer_name}_${params.row.vip_code}`;
    saveAs(params.row.barcode, fileName);
  };

  const deleteHandler = async () => {
    setIsDeleting(true);

    if (admins) {
      // delete admin
    } else {
      // delete customer
      await deleteCustomer(params.row.id, token);
      dispatch(removeCustomer(params.row.id));
    }

    setIsDeleting(false);
  };

  return (
    <div
      style={{
        display: "flex",
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
          style={{ marginRight: 10 }}
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
