import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  Box,
  Stack,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { RegisterSchema } from "./schemas";
import { useFormik } from "formik";
import { Toast } from "../../components";

export default function RegisterWithEmail() {
  const navigate = useNavigate();
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const initialValues = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    c_password: "",
    store: "",
  };

  const { values, handleSubmit, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues,
      validationSchema: RegisterSchema,

      onSubmit: (values, ations) => {
        const url = "http://localhost:5000/store/register";

        axios.post(url, values).then((res) => {
          settostData({ success: res.data.success, message: res.data.message });
          if (res.data.success) {
            tostRef.current.show();

            setTimeout(() => {
              navigate("/admin/login");
            }, 2000);
          } else {
            tostRef.current.show();
          }
        });
      },
    });

  const [Show, setShow] = useState(false);
  const showpassword = () => setShow(!Show);

  return (
    <Wrapper>
      <Stack display="flex" justifyContent="center" alignItems="center">
        <Paper
          className="register-card"
          sx={{
            width: { sm: "100%", md: "40%" },
            margin: { sm: "0", md: "4rem 0rem" },
            borderRadius: { sm: "0", md: "8px" },
            height: { xs: "100vh", md: "100%" },
          }}
        >
          <Box mb={4}>
            <img
              src="/admin/logo.png"
              // src="https://www.webcreta.com/wp-content/uploads/2020/12/creta-logo1-christmas.png"
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

          <form onSubmit={handleSubmit}>
            <Stack gap={2}>
              <Box>
                <TextField
                  variant="outlined"
                  required
                  label="Email"
                  sx={{ width: "100%" }}
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.email && touched.email ? errors.email : null
                  }
                />
              </Box>

              <Box display="flex" gap={2}>
                <TextField
                  variant="outlined"
                  label="First Name"
                  sx={{ width: "100%" }}
                  required
                  name="firstname"
                  type="text"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.firstname && touched.firstname
                      ? errors.firstname
                      : null
                  }
                />
                <TextField
                  variant="outlined"
                  label="Last Name"
                  sx={{ width: "100%" }}
                  required
                  name="lastname"
                  type="text"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.lastname && touched.lastname ? errors.lastname : null
                  }
                />
              </Box>
              <Typography px={1} variant="body2">
                Enter your first and last name as they appear on your
                government-issued ID.
              </Typography>
              <Box>
                <Box mb={2}>
                  <TextField
                    label="password"
                    required
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <IconButton size="large" onClick={showpassword}>
                          {Show ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                        </IconButton>
                      ),
                    }}
                    type={Show ? "text" : "password"}
                    sx={{ width: "100%" }}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                </Box>

                <Box>
                  <TextField
                    variant="outlined"
                    label="Confirm new password"
                    required
                    sx={{ width: "100%" }}
                    name="c_password"
                    type="password"
                    value={values.c_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.c_password && touched.c_password
                        ? errors.c_password
                        : null
                    }
                  />
                </Box>
              </Box>
            </Stack>

            <Box mt={5}>
              <Button className="register-button" type="submit">
                Create Shop ID
              </Button>
              <Toast
                success={tostData.success}
                message={tostData.message}
                tostRef={tostRef}
              />
            </Box>
          </form>

          <Box className="register-footer" mt={5}>
            <Typography variant="subtitle2">
              By proceeding, you agree to the &nbsp;
              <span style={{ color: "royalblue" }}>Terms and Conditions</span>
              and <span style={{ color: "royalblue" }}>Privacy Policy</span>
            </Typography>
            <Box mt={5} sx={{ textAlign: "end" }}>
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
  height: calc(100% + 100vh) ;

  .register-card {
    box-shadow: 6px 12px 60px rgb(0 0 0 / 20%);
    padding: 2rem;
    .register-button {
      width: 100%;
      color: #000;
      background-color: rgba(0, 0, 0, 0.1);
      &:hover {
        background-color: rgb(0 0 0 / 10%);
      }
    }

    .login-link {
      text-decoration: none;
      color: royalblue;
    }
    .MuiFormHelperText-root {
      color: #d32f2f;
      margin-left: 5px;
    }
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0.5);
  }
  .editor-class {
    padding: 0.3rem;
  }
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    height: 1rem;
  }
  .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
    line-height: 1rem;
  }
  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: black;
  }
  .fvMYAf .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    border-color: black !important;
    border-width: 1px;
  }
  .css-1pysi21-MuiFormLabel-root-MuiInputLabel-root {
    line-height: 1.7em !important;
  }
`;
