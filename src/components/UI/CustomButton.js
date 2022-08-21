import React from "react";
import { Button } from "@mui/material";

const CustomButton = (props) => {
  return (
    <Button
      {...props}
      variant={props.variant || "contained"}
      color={props.color || "primary"}
      size={props.size || "small"}
      style={props.style || { marginRight: 10 }}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;
