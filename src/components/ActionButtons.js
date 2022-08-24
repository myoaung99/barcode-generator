import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutUser } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import CustomButton from "./UI/CustomButton";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const ActionButtons = ({ toggleModal, onDownload }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  const navigateToCreateAdminHandler = () => {
    navigate("/dashboard/createAdmin");
  };

  const navigateToAllAdminsHandler = () => {
    navigate("/dashboard/admins");
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
        <CustomButton
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => toggleModal()}
        >
          Create Barcode
        </CustomButton>

        <CustomButton
          startIcon={<SupervisorAccountIcon />}
          onClick={navigateToAllAdminsHandler}
        >
          Admins
        </CustomButton>

        <CustomButton
          color="warning"
          startIcon={<AdminPanelSettingsIcon />}
          onClick={navigateToCreateAdminHandler}
        >
          Create Admin
        </CustomButton>
      </div>
      <div>
        <CustomButton startIcon={<DownloadIcon />} onClick={() => onDownload()}>
          Download All
        </CustomButton>

        <CustomButton
          variant="outlined"
          endIcon={<LogoutIcon />}
          onClick={logoutHandler}
        >
          Logout
        </CustomButton>
      </div>
    </div>
  );
};

export default ActionButtons;
