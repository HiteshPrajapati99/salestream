import { useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Stack,
  TextField,
  FormControl,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { CmpTitle, Toast } from "../../components";
import JoditEditor from "jodit-react";
import ImgDropzone from "../Products/components/ImgDropzone";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  //  Toast
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const [Desc, setDesc] = useState("");
  const [Images, setImages] = useState([]);
  const [Preview, setPreview] = useState([]);

  const [BlogData, setBlogData] = useState({
    title: "",
    sub_title: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;

    setBlogData({
      ...BlogData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    Images.forEach((item) => {
      formdata.append("blog_img", item);
    });
    formdata.append("title", BlogData.title);
    formdata.append("sub_title", BlogData.sub_title);
    formdata.append("desc", Desc);

    const url = "http://localhost:5000/store/blog/create";
    const token = localStorage.getItem("x-access-token");

    const { data } = await axios.post(url, formdata, {
      headers: { "x-access-token": token },
    });
    settostData({ success: data.success, message: data.message });
    if (data.success) {
      tostRef.current.show();
      setBlogData({ title: "", sub_title: "" });
      setDesc("");
      setImages([]);
    } else {
      tostRef.current.show();
    }
  };

  const getBlogData = async () => {
    const url = `http://localhost:5000/store/blog/${id}`;
    const token = localStorage.getItem("x-access-token");

    const { data } = await axios.get(url, {
      headers: { "x-access-token": token },
    });
    if (data.success) {
      setBlogData(data.data);
      setDesc(data.data.desc);
      setPreview(data.data.image_path);
      // console.log(data);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  const handleUpdate = async () => {
    const url = `http://localhost:5000/store/blog/edit/${id}`;
    const token = localStorage.getItem("x-access-token");

    const formdata = new FormData();

    Images.forEach((item) => {
      formdata.append("blog_img", item);
    });
    formdata.append("title", BlogData.title);
    formdata.append("sub_title", BlogData.sub_title);
    formdata.append("desc", Desc);
    const { data } = await axios.put(url, formdata, {
      headers: { "x-access-token": token },
    });

    settostData({ success: data.success, message: data.message });
    tostRef.current.show();
    if (data.success) {
      setTimeout(() => {
        navigate("/admin/blogs");
      }, 1500);
    }
  };

  const breadcrumbs = {
    one: "Blog",
    oneLink: "/admin/blogs",
    last: "Create Blog",
  };
  const updatebreadcrumbs = {
    one: "Blog",
    oneLink: "/admin/blogs",
    last: "Update Blog",
  };
  return (
    <Wrapper>
      <Box className="top-title">
        <CmpTitle
          text={id ? "Update Blog" : "Create New Blog"}
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
      <Box mt={5} mb={5}>
        <Grid container gap={2}>
          <Grid item xs={12} md={5.8}>
            <Box className="paper" p={3}>
              <Stack spacing={2}>
                <TextField
                  type="text"
                  name="title"
                  label="Title"
                  value={BlogData.title}
                  onChange={handleChange}
                />
                <TextField
                  type="text"
                  name="sub_title"
                  label="Sub Title"
                  value={BlogData.sub_title}
                  onChange={handleChange}
                />
              </Stack>
            </Box>
            <Box className="paper" p={3} mt={2}>
              <FormControl fullWidth>
                <label style={{ marginLeft: "3px", color: "rgba(0,0,0,0.6)" }}>
                  Description
                </label>
                <JoditEditor value={Desc} onChange={(e) => setDesc(e)} />
              </FormControl>
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
