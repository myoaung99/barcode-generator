import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCustomer } from "../../utils/https";
import { removeCustomer } from "./../../store/customer-slice";
import { LoadingButton } from "@mui/lab";

const Actions = ({ params }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [isDeleting, setIsDeleting] = useState(false);

  const pressedHandler = (type) => {
    console.log("Pressed", type);
    console.log(params);
  };

  const deleteHandler = async () => {
    setIsDeleting(true);
    const deletedCustomer = await deleteCustomer(params.row.id, token);
    dispatch(removeCustomer(params.row.id));
    console.log("Deleted", deletedCustomer);
    setIsDeleting(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        variant="outlined"
        color="success"
        size="small"
        startIcon={<DownloadIcon />}
        style={{ marginRight: 10 }}
        onClick={pressedHandler.bind(this, "download")}
      >
        Save
      </Button>

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
