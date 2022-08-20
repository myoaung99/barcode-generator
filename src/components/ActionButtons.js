import React from "react";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutUser } from "../store/auth-slice";
import { useDispatch } from "react-redux";

const ActionButtons = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
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
        <Button
          variant="outlined"
          color="primary"
          size="small"
          endIcon={<LogoutIcon />}
          style={{ marginRight: 10 }}
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
