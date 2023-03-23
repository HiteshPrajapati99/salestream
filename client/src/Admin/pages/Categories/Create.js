import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  Box,
  Typography,
  TextField,
  Stack,
  FormControlLabel,
  Switch,
  ListItemButton,
  List,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { BsCheckAll } from "react-icons/bs";
import { getCategory } from "../../redux-store/reducer/Category";
import { useDispatch, useSelector } from "react-redux";
import { CmpTitle, Toast } from "../../components";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useStickyTitle from "../../hooks/useStickyTitle"


export default function CreateCa() {
  const isSticky = useStickyTitle();
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.category);

  //  Toast
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(data);
  }, [data]);

  const [Userdata, setUserdata] = useState({
    name: "",
    status: true,
    parent_id: "",
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setUserdata({
      ...Userdata,
      [e.target.name]: value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/store/categories/create";
    const token = localStorage.getItem("x-access-token");
    const { data } = await axios.post(url, Userdata, {
      headers: { "x-access-token": token },
    });

    settostData({ success: data.success, message: data.message });

    if (data.success) {
      tostRef.current.show();
      setUserdata({ ...Userdata, name: "" });
      dispatch(getCategory());
    } else {
      tostRef.current.show();
    }
  };

  const breadcrumbs = {
    one: "Categories",
    oneLink: "/admin/categories",
    last: "Create Category",
  };

  const animated = makeAnimated();

  const handleSelect = (selectedOption) => {
    setUserdata({ ...Userdata, parent_id: selectedOption.value });
  };

  const options = Categories?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });
  return (
    <Div>
      <Box className={isSticky}>
        <CmpTitle
          text="Create New Category"
          handleClick={handlesubmit}
          breadcrumbs={breadcrumbs}
          buttonname="submit"
        />
        <Toast
          message={tostData.message}
          success={tostData.success}
          tostRef={tostRef}
        />
      </Box>
      <Box mb={5} mt={5} display="flex" justifyContent="center">
        <form onSubmit={handlesubmit}>
          <Box className="paper" p={1}>
            <Stack spacing={2} p={2}>
              <TextField
                label="Name"
                name="name"
                type="text"
                sx={{ width: "100%" }}
                value={Userdata.name}
                onChange={handleChange}
              />
              <Box>
                <Select
                  options={options}
                  onChange={handleSelect}
                  components={animated}
                />
              </Box>
              <Box textAlign="center">
                <FormControlLabel
                  control={
                    <Switch
                      checked={Userdata.status}
                      onChange={handleChange}
                      name="status"
                      color="success"
                    />
                  }
                  label="Status"
                />
              </Box>
            </Stack>
          </Box>
        </form>
      </Box>
    </Div>
  );
}
const Div = styled.div`
  .MuiFormHelperText-root {
    color: #d32f2f;
    margin-left: 5px;
  }
  .bred-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgb(145, 158, 171);
  }
  .active {
    border: 1px dashed rgba(0, 0, 0, 0.1);
    background-color: rgb(0 145 72 / 5%);
  }
  .bredcrumb-links {
    cursor: pointer;
    text-decoration: none;
    color: black;
    line-height: 1.57143;
    font-size: 12px;
    font-family: "Public Sans", sans-serif;
    font-weight: 400;
    &:hover {
      text-decoration: underline;
    }
  }
  .paper {
    border-radius: 16px;
    background-color: rgb(255, 255, 255);
    color: rgb(33, 43, 54);
    box-shadow: rgb(145 158 171 / 20%) 0px 0px 2px 0px,
      rgb(145 158 171 / 12%) 0px 12px 24px -4px;
  }

  .select-img-box {
    width: 144px;
    height: 144px;
    cursor: pointer;
    border-radius: 50%;
    border: 1px dashed rgba(145, 158, 171, 0.32);
    display: grid;
    place-items: center;
    margin: auto;
  }

  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0.1) !important;
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
  .list-button {
    border-radius: 8px;
    color: rgb(99, 115, 129);
    margin-top: 8px;
    justify-content: space-between;
    /* border-left: 1px solid red; */
  }
  .list-box {
    border-left: 1px dashed rgba(0, 0, 0, 0.2);
  }
  .css-13cymwt-control {
    min-height: 50px;
    border-radius: 8px;
  }
`;
