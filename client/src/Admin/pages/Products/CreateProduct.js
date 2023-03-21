import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  Box,
  Stack,
  IconButton,
  ListItemButton,
  List,
  ListItemIcon,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { ProducSchema } from "./components/ProductSchema";
import axios from "axios";
import styled from "styled-components";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import JoditEditor from "jodit-react";
import Create from "../Brand/Create";
import { CmpTitle, Toast } from "../../components";
import ReactSelect from "react-select";

// Redux

import { useSelector } from "react-redux";
import ImgDropzone from "./components/ImgDropzone";

export default function CreateProduct() {
  const { brand, category } = useSelector((store) => store);
  // console.log(category);

  //  Toast
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const [Desc, setdesc] = useState("");

  const [Brand, setBrand] = useState([]);

  const [isLodding, setisLodding] = useState(false);

  // React Select Category
  const [Categories, setCategories] = useState([]);

  const options = Categories?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

  const [SelectCategory, setSelectCategory] = useState([]);

  const handlecategory = (selectedOption) => {
    setSelectCategory(selectedOption.map((item) => item.value));
  };

  useEffect(() => {
    setBrand(brand.data);
    setCategories(category.data);
  }, [brand, category]);

  const [Images, setImages] = useState([]);

  const initialValues = {
    name: "",
    desc: "",
    price: "",
    status: "",
    quantity: "",
    sku: "",
    type: "",
    special_price: "",
    isfeatured: false,
    brand: "",
  };

  const url = "http://localhost:5000/store/product/create";
  const token = localStorage.getItem("x-access-token");

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: ProducSchema,

      onSubmit: async (values, action) => {
        setisLodding(true);
        const formdata = new FormData();
        // Image Upload
        Images.forEach((item) => {
          formdata.append("product_img", item);
        });
        //  Cateory Upload
        SelectCategory.forEach((item) => {
          formdata.append("category", item);
        });
        formdata.append("name", values.name);
        formdata.append("desc", Desc);
        formdata.append("price", values.price);
        formdata.append("status", values.status);
        formdata.append("quantity", values.quantity);
        // formdata.append("category", activeId);
        formdata.append("sku", values.sku);
        formdata.append("type", values.type);
        formdata.append("special_price", values.special_price);
        formdata.append("isfeatured", values.isfeatured);
        formdata.append("brand", values.brand);

        const { data } = await axios.post(url, formdata, {
          headers: { "x-access-token": token },
        });
        settostData({ success: data.success, message: data.message });

        if (data) {
          setisLodding(false);
        }

        if (data.success) {
          tostRef.current.show();
          setdesc("");
          setImages([]);
          action.resetForm();
        } else {
          tostRef.current.show();
        }
      },
    });

  const breadcrumbs = {
    one: "Product",
    oneLink: "/admin/products",
    last: "Create Product",
  };

  return (
    <Div>
      <Box className="top-title">
        <CmpTitle
          handleClick={handleSubmit}
          text="Create New Product"
          breadcrumbs={breadcrumbs}
          buttonname="submit"
          isLodding={isLodding}
        />
        <Toast
          message={tostData.message}
          success={tostData.success}
          tostRef={tostRef}
        />
      </Box>

      <Box mb={5} mt={5}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={7.6}>
              <Stack spacing={2}>
                <Box className="paper" p={1}>
                  <Stack spacing={2} p={2}>
                    <TextField
                      label="Title"
                      name="name"
                      type="text"
                      sx={{ width: "100%" }}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.name && touched.name ? errors.name : null
                      }
                    />
                    <FormControl
                      sx={{
                        p: 1,
                      }}
                    >
                      <label
                        style={{ marginLeft: "3px", color: "rgba(0,0,0,0.6)" }}
                      >
                        Description
                      </label>
                      <JoditEditor value={Desc} onChange={(e) => setdesc(e)} />
                    </FormControl>
                  </Stack>
                </Box>
                <Box className="paper" p={3}>
                  <Typography ml={3} color="rgba(0,0,0,0.7)">
                    Image
                  </Typography>

                  <Box mt={1}>
                    <ImgDropzone
                      Preview={[]}
                      setImages={setImages}
                      Images={Images}
                    />
                  </Box>
                </Box>
                <Box className="paper" p={1}>
                  <Stack spacing={2} p={2}>
                    <Typography color="rgba(0,0,0,0.8)">Pricing</Typography>
                    <Stack spacing={2}>
                      <TextField
                        label="Price"
                        fullWidth
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.price && touched.price ? errors.price : null
                        }
                      />
                      <TextField
                        label="special price"
                        fullWidth
                        name="special_price"
                        value={values.special_price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextField
                        label="Quantity"
                        fullWidth
                        name="quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.quantity && touched.quantity
                            ? errors.quantity
                            : null
                        }
                      />
                    </Stack>
                  </Stack>
                </Box>
                {/* <Box className="paper" p={1}>
                  <Stack p={2}>
                    <Typography color="rgba(0,0,0,0.8)"> Options</Typography>
                  </Stack>
                </Box> */}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={4.3}>
              <Stack spacing={2}>
                <Box className="paper" p={1}>
                  <Stack spacing={2} p={2}>
                    <FormControl>
                      <InputLabel sx={{ top: "1px" }}>
                        Product Status
                      </InputLabel>
                      <Select
                        label="Product Status"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                      >
                        <MenuItem value="public">Public</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="SKU"
                      name="sku"
                      value={values.sku}
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      label="Is Featured"
                      control={
                        <Switch
                          name="isfeatured"
                          value={values.isfeatured}
                          onChange={handleChange}
                          color="success"
                        />
                      }
                    />
                  </Stack>
                </Box>
                <Box className="paper" p={1}>
                  <Stack spacing={2} p={2}>
                    <Typography> Product organization </Typography>
                    <Stack spacing={2}>
                      <Box display="flex" alignItems="center">
                        <FormControl sx={{ flexGrow: "1" }}>
                          <InputLabel> Brand </InputLabel>
                          <Select
                            label="Brand"
                            name="brand"
                            value={values.brand}
                            onChange={handleChange}
                          >
                            {Brand?.map((item) => (
                              <MenuItem value={item._id} key={item._id}>
                                {item.title}
                              </MenuItem>
                            ))}
                          </Select>
                          <Typography color="error" ml={1} fontSize="0.75rem">
                            {errors.brand && touched.brand
                              ? errors.brand
                              : null}
                          </Typography>
                        </FormControl>
                        <Box>
                          <Create type="icon" />
                        </Box>
                      </Box>
                      <ReactSelect
                        options={options}
                        isMulti
                        closeMenuOnSelect={false}
                        onChange={handlecategory}
                      />

                      {/* <TextField label="Tags" type="text" /> */}
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Grid>
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

  .active {
    border: 1px dashed rgba(0, 0, 0, 0.1);
    background-color: rgb(0 145 72 / 5%);
  }

  .paper {
    border-radius: 16px;
    background-color: rgb(255, 255, 255);
    color: rgb(33, 43, 54);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
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
    min-height: 58px;
    border-radius: 8px;
  }
`;
