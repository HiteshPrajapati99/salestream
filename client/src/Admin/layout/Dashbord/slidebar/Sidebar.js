import React from "react";
import { styled } from "@mui/material";

// icons

import Config from "./Config";

export default function Sidebar() {
  const BoxData = styled("section")({
    height: "calc(100vh - 80px)",
    position: "fixed",
    overflowY: "scroll",
    padding: "1rem",
    // borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
    backgroundColor: "#fff",
    top: "80px",
  });

  return (
    <BoxData
      sx={{
        width: "20%",
        display: { xs: "none", md: "block" },
      }}
    >
      <Config />
    </BoxData>
  );
}
