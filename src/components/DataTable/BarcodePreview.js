import React from "react";
import { CardMedia } from "@mui/material";

function BarcodePreview(props) {
  return (
    <div style={{ paddingTop: 5, paddingBottom: 5 }}>
      <CardMedia
        component="img"
        height="50px"
        image="/images/barcode.png"
        alt=""
      />
    </div>
  );
}

export default BarcodePreview;
