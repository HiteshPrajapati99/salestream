import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoginSchema } from "./schemas";
import { useFormik } from "formik";
import { Toast } from "../../components";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Login() {
  //  tost
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });
  const navigate = useNavigate();

  const [Lodding, setLodding] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");

    if (token) {
      navigate("/admin");
    }
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleSubmit, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,

      onSubmit: async (values) => {
        setLodding(true);
        const url = "http://localhost:5000/store/login";
        const { data } = await axios.post(url, values);
        settostData({ success: data.success, message: data.message });
        if (data.success) {
          tostRef.current.show();
          localStorage.setItem("x-access-token", data.token);
          setTimeout(() => {
            setLodding(false);
            if (data.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          }, 1800);
        } else {
          setLodding(false);
          tostRef.current.show();
        }
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
            margin: { md: "2rem 0rem" },
            borderRadius: { sm: "0px", md: "8px" },
          }}
        >
          <Box mb={4}>
            <img
              src="/admin/logo.png"
              // src="https://www.webcreta.com/wp-content/uploads/2020/12/creta-logo1-christmas.png"
              alt="logo...."
              width="50%"
              loading="lazy"
            />
          </Box>
          <Typography
            variant="h1"
            fontSize="1.5rem"
            fontWeight="bold"
            lineHeight="1.2rem"
            mb={1}
          >
            Log in
          </Typography>
          <Typography color="text.disabled"> Continue to My Shopify</Typography>

          {/*  login Form  */}
          <form onSubmit={handleSubmit}>
            <Stack gap={2} mt={5}>
              <Box>
                <TextField
                  sx={{ width: "100%" }}
                  label="Email"
                  type="email"
                  name="email"
                  size="small"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.email && touched.email ? errors.email : null
                  }
                />
                {/* <Typography variant="body2" color="error" >
                {errors.email && touched.email ? errors.email : null}
              </Typography> */}
              </Box>

              <Box>
                <TextField
                  sx={{ width: "100%" }}
                  label="Password"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={showpassword}>
                        {Show ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                      </IconButton>
                    ),
                  }}
                  type={Show ? "text" : "password"}
                  name="password"
                  size="small"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="false"
                  helperText={
                    errors.password && touched.password ? errors.password : null
                  }
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/admin/forgot/password"
                >
                  <Typography color="royalblue">Forgot password ?</Typography>
                </Link>
              </Box>
              <Box display="flex" justifyContent="center" mb={3}>
                <LoadingButton
                  sx={{ width: "100%", fontWeight: "bold" }}
                  variant="outlined"
                  type="submit"
                  loading={Lodding}
                >
                  Log In
                </LoadingButton>

                <Toast
                  success={tostData.success}
                  message={tostData.message}
                  tostRef={tostRef}
                />
              </Box>
            </Stack>
          </form>

          <Box sx={{ textAlign: "center" }}>
            <Link style={{ textDecoration: "none" }} to="/admin/register">
              <Typography color="text.secondary">
                New to My Shopify?
                <span style={{ color: "royalblue" }}> Get started </span>
              </Typography>
            </Link>
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

  .register-card {
    box-shadow: 6px 12px 60px rgb(0 0 0 / 20%);
    padding: 5rem;

    .login-button {
      width: 100%;
      color: #000;
      background-color: rgba(0, 0, 0, 0.1);
      height: 3rem;
      &:hover {
        background-color: rgb(0 0 0 / 10%);
      }
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
`;
