import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CmpTitle, Toast } from "../../components";
import ImgDropzone from "../Products/components/ImgDropzone";
import useStickyTitle from "../../hooks/useStickyTitle"

export default function Create() {
  const isSticky = useStickyTitle();
  const { id } = useParams();
  const navigate = useNavigate();
  //  Toast
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const [Images, setImages] = useState([]);
  const [Preview, setPreview] = useState([]);

  const [BannerData, setBannerData] = useState({
    title: "",
    sub_title: "",
    button: "",
    button_link: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;

    setBannerData({
      ...BannerData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    Images.forEach((item) => {
      formdata.append("banner_image", item);
    });
    formdata.append("title", BannerData.title);
    formdata.append("sub_title", BannerData.sub_title);
    formdata.append("button", BannerData.button);
    formdata.append("button_link", BannerData.button_link);

    const url = "http://localhost:5000/store/banner/create";
    const token = localStorage.getItem("x-access-token");

    const { data } = await axios.post(url, formdata, {
      headers: { "x-access-token": token },
    });
    settostData({ success: data.success, message: data.message });
    if (data.success) {
      tostRef.current.show();
      setBannerData({ title: "", sub_title: "", button: "", button_link: "" });
      setImages([]);
    } else {
      tostRef.current.show();
    }
  };

  const getBannerData = async () => {
    const url = `http://localhost:5000/store/banner/${id}`;
    const token = localStorage.getItem("x-access-token");

    const { data } = await axios.get(url, {
      headers: { "x-access-token": token },
    });
    if (data.success) {
      setBannerData(data.data);
      setPreview(data.data.images_path);
      // console.log(data);
    }
  };

  useEffect(() => {
    getBannerData();
  }, []);

  const handleUpdate = async () => {
    const url = `http://localhost:5000/store/banner/edit/${id}`;
    const token = localStorage.getItem("x-access-token");

    const formdata = new FormData();

    Images.forEach((item) => {
      formdata.append("banner_image", item);
    });
    formdata.append("title", BannerData.title);
    formdata.append("sub_title", BannerData.sub_title);
    formdata.append("button", BannerData.button);
    formdata.append("button_link", BannerData.button_link);

    const { data } = await axios.put(url, formdata, {
      headers: { "x-access-token": token },
    });

    settostData({ success: data.success, message: data.message });
    tostRef.current.show();
    if (data.success) {
      setTimeout(() => {
        navigate("/admin/banners");
      }, 1500);
    }
  };

  const breadcrumbs = {
    one: "Banner",
    oneLink: "/admin/banners",
    last: "Create Banner",
  };
  const updatebreadcrumbs = {
    one: "Banner",
    oneLink: "/admin/banners",
    last: "Update Banner",
  };
  return (
    <Wrapper>
      <Box className={isSticky}>
        <CmpTitle
          text={id ? "Update Banner" : "Create New Banner"}
          buttonname={id ? "Update" : "submit"}
          breadcrumbs={id ? updatebreadcrumbs : breadcrumbs}
          handleClick={id ? handleUpdate : handleSubmit}
        />
        <Toast
          message={tostData.message}
          success={tostData.success}
          tostRef={tostRef}
        />
      </Box>
      <form onSubmit={handleSubmit}>
        <Box mt={5} mb={5}>
          <Grid container gap={2}>
            <Grid item xs={12} md={5.8}>
              <Box className="paper" p={3}>
                <Stack spacing={2}>
                  <TextField
                    type="text"
                    name="title"
                    label="Title"
                    value={BannerData.title}
                    onChange={handleChange}
                  />
                  <TextField
                    type="text"
                    name="sub_title"
                    label="Sub Title"
                    value={BannerData.sub_title}
                    onChange={handleChange}
                  />
                  <TextField
                    type="text"
                    name="button"
                    label="Button Name"
                    value={BannerData.button}
                    onChange={handleChange}
                  />{" "}
                  <TextField
                    type="text"
                    name="button_link"
                    label="Button Link"
                    value={BannerData.button_link}
                    onChange={handleChange}
                  />
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="paper" p={3}>
                <Typography ml={3} color="rgba(0,0,0,0.7)">
                  Image
                </Typography>

                <Box mt={1}>
                  <ImgDropzone
                    Preview={Preview}
                    setImages={setImages}
                    Images={Images}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .paper {
    border-radius: 16px;
    background-color: rgb(255, 255, 255);
    color: rgb(33, 43, 54);
    box-shadow: rgb(145 158 171 / 20%) 0px 0px 2px 0px,
      rgb(145 158 171 / 12%) 0px 12px 24px -4px;
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
`;
