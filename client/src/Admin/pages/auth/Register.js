import React from "react";
import styled from "styled-components";
import { Box, Stack, Paper, Typography, Button } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Stack display="flex" alignItems="center">
        <Paper
          className="register-card"
          sx={{
            width: { sm: "100%", md: "40%" },
            margin: { sm: "0", md: "4rem 0rem" },
            borderRadius: { sm: "0", md: "8px" },
            height: { xs: "100vh", md: "100%" },
          }}
        >
          <Box className="register-herder">
            <Box mb={4}>
              <img
                src="/admin/logo.png"
                alt="logo...."
                width="40%"
                loading="lazy"
              />
            </Box>
            <Typography
              variant="h1"
              fontSize="1.5rem"
              fontWeight="bold"
              lineHeight="1.2rem"
              mb={2}
            >
              Create a Store ID
            </Typography>
            <Typography
              variant="h3"
              fontSize="1rem"
              fontWeight="500"
              sx={{ color: "rgba(0,0,0,0.4)" }}
              mb={2}
            >
              One last step before starting your free trial.
            </Typography>

            <Box display="flex" justifyContent="center" my={3}>
              <Button
                variant="outlined"
                startIcon={<MailIcon />}
                sx={{ width: "100%", fontWeight: "bold" }}
                onClick={() => navigate("/admin/register/email")}
              >
                Continue with Email
              </Button>
            </Box>
          </Box>

          <Box className="register-footer" mt={2}>
            <Typography variant="subtitle2">
              By proceeding, you agree to the {""}
              <span style={{ color: "royalblue" }}>
                Terms and Conditions
              </span>{" "}
              and <span style={{ color: "royalblue" }}>Privacy Policy</span>
            </Typography>
            <Box mt={5} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2">
                Already have a Store ID? &nbsp;
                <Link className="login-link" to="/admin/login">
                  Log in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-image: linear-gradient(
    to right top,
    #302348,
    #344471,
    #2b6797,
    #0f8db7,
    #00b3cf,
    #00b6d1,
    #00bad4,
    #00bdd6,
    #009fc9,
    #0081b8,
    #0062a2,
    #114487
  );
  width: 100%;
  height: 100vh;

  /*  page content  */
  .register-card {
    box-shadow: 6px 12px 60px rgb(0 0 0 / 20%);
    padding: 3rem;

    .login-link {
      text-decoration: none;
      color: royalblue;
    }
  }

  @media only screen and (max-width: 900px) {
    height: 100%;
  }
`;
