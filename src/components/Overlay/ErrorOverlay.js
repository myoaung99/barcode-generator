import React from "react";
import { Typography } from "@mui/material";

const ErrorOverlay = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>
        Something went wrong. Please check your connection and try again later!
      </Typography>
    </div>
  );
};

export default ErrorOverlay;
