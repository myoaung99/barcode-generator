import * as React from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./LoadingOverlay.module.css";

export default function LoadingOverlay() {
  return (
    <>
      <div className={classes.backdrop}></div>
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    </>
  );
}
