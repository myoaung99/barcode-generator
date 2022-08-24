import { Typography } from "@mui/material";

export const getFormattedDate = (params) => {
  const { createdAt } = params.row;
  return <Typography>{createdAt.slice(0, 10)}</Typography>;
};
