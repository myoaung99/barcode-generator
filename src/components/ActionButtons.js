import React from "react";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ActionButtons = ({ toggleModal }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "10px",
        paddingBottom: "20px",
      }}
    >
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddCircleOutlineIcon />}
          style={{ marginRight: 10 }}
          onClick={() => toggleModal()}
        >
          Add Customer
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<FilterListIcon />}
          style={{ marginRight: 10 }}
          onClick={() => console.log("Filter List ")}
        >
          Filter
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<DownloadIcon />}
          style={{ marginRight: 10 }}
          onClick={() => console.log("Download All")}
        >
          Download All
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
