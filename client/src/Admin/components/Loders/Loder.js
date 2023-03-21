import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Loder() {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        position: "relative",
        top: "16rem",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
