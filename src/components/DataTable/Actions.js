import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import React from "react";

const Actions = () => {
  const pressedHandler = (type) => {
    console.log("Pressed", type);
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

      <Button
        variant="outlined"
        color="error"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={pressedHandler.bind(this, "delete")}
      >
        Delete
      </Button>
    </div>
  );
};

export default Actions;
