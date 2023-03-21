import React from "react";

import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";

// ----------------------------------------------------------------------

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));
export default function Page404() {
  return (
    <div style={{ backgroundColor: " rgb(249, 250, 251)" }}>
      <Container>
        <StyledContent
          sx={{
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/admin/logo.png"
            width="40%"
            mb={2}
          ></Box>
          <Typography variant="h3" mb={2} fontWeight="bold">
            404 Page Not Found My Store
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src="/assets/404/illustration_404.svg"
            sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
          />

          <Button
            sx={{
              fontWeight: "bold",
            }}
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </div>
  );
}
