import React, { useState } from "react";
import {
  Stack,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import styled from "styled-components";
import axios from "axios";
export default function Forgotpass() {
  const [Email, setEmail] = useState([]);

  const handleSubmit = async () => {
    const url = "";
    const data = await axios.post(url, Email);

    console.log(data);
  };

  return (
    <Wrapper>
      <Stack sx={{ display: "grid", placeItems: "center" }}>
        <Paper
          sx={{
            padding: "4rem",
            width: { sm: "100%", md: "40%" },
            margin: { md: "5rem 0rem" },
            borderRadius: { sm: "0px", md: "8px" },
          }}
        >
          <Box mb={4}>
            <img
              src="https://www.webcreta.com/wp-content/uploads/2020/12/creta-logo1-christmas.png"
              alt="logo...."
              width="40%"
            />
          </Box>
          <Typography
            fontSize="1.5rem"
            fontWeight="bold"
            lineHeight="1.2rem"
            mb={1.5}
            color="royalblue"
          >
            Forgot Password
          </Typography>
          <Typography color="text.disabled">
            Enter Email To Get Forgot Password Link
          </Typography>

          {/*  login Form  */}
          <form>
            <Stack gap={2} mt={5}>
              <TextField
                sx={{ width: "100%" }}
                label="Email"
                type="email"
                name="email"
                size="small"
                required
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Box display="flex" justifyContent="end">
                <Button
                  sx={{ fontWeight: "bold" }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </Stack>
          </form>
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

  @media only screen and (max-width: 900px) {
    height: 100%;
  }
`;
