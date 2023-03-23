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
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import Create from "../Brand/Create";
import { useSelector } from "react-redux";
import ImgDropzone from "./components/ImgDropzone";
import { CmpTitle, Toast } from "../../components";
import ReactSelect from "react-select";
import { getProductById } from "../../Api/ProductApi";
import useStickyTitle from "../../hooks/useStickyTitle"

export default function EditProduct() {
  const isSticky = useStickyTitle();
  //  Toast
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const { category, brand } = useSelector((store) => store);

  //  Product Category
  const [Categories, setCategories] = useState([]);

  const [SelectCategory, setSelectCategory] = useState([]);

  const options = Categories?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });
  const handlecategory = (selectedOption) => {
    setSelectCategory(selectedOption.map((item) => item.value));
  };

  const [Editdata, setEditdata] = useState([]);
  const [Desc, setdesc] = useState("");
  const [Brandvalue, setBrandvalue] = useState("");
  // console.log(Editdata);

  // Product Img
  const [Images, setImages] = useState([]);
  const [Preview, setPreview] = useState([]);

  // Get Brand
  const [Brand, setBrand] = useState([]);

  const getProduct = async () => {
    const data = await getProductById(id);
    if (data.success) {
      setEditdata(data.product);
      setdesc(data.product.desc);
      setPreview(data.product.product_img_path);
      setImages(data.product.product_img);
      if (data.product.brand.length > 0) {
        setBrandvalue(data?.product?.brand?.[0]._id);
      }
      if (data?.product?.category) {
        setSelectCategory(data.product.category.map((cat) => cat._id));
      }
    }
  };

  useEffect(() => {
    getProduct();
    setCategories(category.data);
    setBrand(brand.data);
    // set Active ID on Categories
  }, [category, brand]);

  const hendleInput = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setEditdata((pre) => {
      return { ...pre, [e.target.name]: value };
    });
  };

  const handleSubmit = async () => {
    const formdata = new FormData();

    Array.from(Images).forEach((item) => {
      formdata.append("product_img", item);
    });
    SelectCategory.forEach((item) => {
      formdata.append("category", item);
    });
    formdata.append("name", Editdata.name);
    formdata.append("desc", Desc);
    formdata.append("price", Editdata.price);
    formdata.append("special_price", Editdata.special_price);
    formdata.append("status", Editdata.status);
    formdata.append("quantity", Editdata.quantity);
    formdata.append("brand", Brandvalue);
    formdata.append("sku", Editdata.sku);
    formdata.append("type", Editdata.type);
    formdata.append("slug", Editdata.slug);
    formdata.append("isfeatured", Editdata.isfeatured);

    const url = `http://localhost:5000/store/product/edit/${id}`;
    const token = localStorage.getItem("x-access-token");

    // const token = localStorage.getItem("x-access-token");

    const { data } = await axios.put(url, formdata, {
      headers: { "x-access-token": token },
    });

    settostData({ success: data.success, message: data.message });

    if (data.success) {
      tostRef.current.show();
      setTimeout(() => {
        navigate("/admin/products");
      }, 1800);
    } else {
      tostRef.current.show();
    }
  };

  const breadcrumbs = {
    one: "Product",
    oneLink: "/admin/products",
    last: "Edit Product",
  };

  return (
    <Div>
      <Box className={isSticky}>
        <CmpTitle
          handleClick={handleSubmit}
          text="Update Product"
          breadcrumbs={breadcrumbs}
          buttonname="Update"
          // isLodding={isLodding}
        />
        <Toast
          message={tostData.message}
          success={tostData.success}
          tostRef={tostRef}
        />
      </Box>
      {/* Edit Product Data */}
      <Box mb={5} mt={5}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={7.6}>
              <Stack spacing={2}>
                <Box className="paper" p={1}>
                  <Stack spacing={2} p={2}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Title"
                      name="name"
                      type="text"
                      sx={{ width: "100%" }}
                      value={Editdata.name}
                      onChange={hendleInput}
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
                      setImages={setImages}
                      Images={Images}
                      Preview={Preview}
                    />
                  </Box>
                </Box>
                <Box className="paper" p={1}>
                  <Stack spacing={2} p={2}>
                    <Typography color="rgba(0,0,0,0.8)">Pricing</Typography>
                    <Stack spacing={2}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="Price"
                        fullWidth
                        name="price"
                        value={Editdata.price}
                        onChange={hendleInput}
                      />
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="Compare at price"
                        fullWidth
                        name="special_price"
                        value={Editdata.special_price}
                        onChange={hendleInput}
                      />
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={Editdata.quantity}
                        onChange={hendleInput}
                        label="Quantity"
                        fullWidth
                        name="quantity"
                      />
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={4.3}>
              <Stack spacing={2}>
                <Box className="paper" p={1}>
                  <Stack spacing={2} p={2}>
                    <FormControl>
                      <InputLabel> Product Status </InputLabel>
                      <Select
                        label="Product Status"
                        name="status"
                        value={Editdata.status ? Editdata.status : "public"}
                        onChange={hendleInput}
                      >
                        <MenuItem value="public">public</MenuItem>
                        <MenuItem value="pending">pending</MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Editdata.sku}
                      onChange={hendleInput}
                      label="SKU"
                      name="sku"
                    />
                    <FormControlLabel
                      label="Is Featured"
                      control={
                        <Switch
                          checked={Editdata?.isfeatured}
                          onChange={hendleInput}
                          name="isfeatured"
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
                            value={Brandvalue}
                            onChange={(e) => setBrandvalue(e.target.value)}
                          >
                            {Brand?.map((item) => (
                              <MenuItem value={item._id} key={item._id}>
                                {item.title}
                              </MenuItem>
                            ))}
                          </Select>
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
  .bred-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgb(145, 158, 171);
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
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    background-color: white;
    border-radius: 10px;
  }
  .paper-1 {
    box-shadow: rgb(145 158 171 / 20%) 0px 0px 2px 0px,
      rgb(145 158 171 / 12%) 0px 12px 24px -4px;
    border-radius: 10px;
    background-color: white;
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
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0.5);
  }
`;
