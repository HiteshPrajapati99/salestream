import React from "react";
import ProtectedRoutes from "../../ProtectedRoutes";
import Sidebar from "./slidebar/Sidebar";
import Header from "./Header/Heder";
import { Box } from "@mui/material";

export default function Dashbord() {
  return (
    <div>
      <Header />
      <Box>
        <Sidebar />
        <Box
          p={3}
          sx={{
            ml: { xs: "0", md: "20%" },
            paddingTop: "100px",
            borderRadius: "15px",
            bgcolor: "rgb(249 249 249 / 68%)",
          }}
        >
          <ProtectedRoutes />
        </Box>
      </Box>
    </div>
  );
}
