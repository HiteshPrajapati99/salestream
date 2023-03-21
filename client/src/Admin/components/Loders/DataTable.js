import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export default function DataTable({ rows, columns, loading, noRowMessage }) {
  return (
    <DataGrid
      getRowId={(row) => row._id}
      rows={rows}
      columns={columns}
      pageSize={10}
      loading={loading}
      rowsPerPageOptions={[10]}
      checkboxSelection
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
      sx={{
        border: "0px",
        boxShadow: 3,
        borderRadius: "20px",
        bgcolor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",

      }}
      components={{
        NoRowsOverlay: () => (
          <Stack
            height="100%"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
          >
            {noRowMessage}
          </Stack>
        ),
      }}
    />
  );
}
