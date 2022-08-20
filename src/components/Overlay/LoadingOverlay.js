import * as React from "react";
import { Backdrop, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./LoadingOverlay.module.css";

export default function SimpleBackdrop() {
  return (
    <Box className={classes.loadingContainer}>
      <CircularProgress />
    </Box>
  );
}
