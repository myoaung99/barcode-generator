import React from "react";
import { CardMedia } from "@mui/material";

function BarcodePreview(props) {
  const { params } = props;
  return (
    <div style={{ paddingTop: 5, paddingBottom: 5 }}>
      <CardMedia component="img" image={params.row.barcode} alt="" />
    </div>
  );
}

export default BarcodePreview;
