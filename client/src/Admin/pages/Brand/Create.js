import { useState, useRef } from "react";
import styled from "styled-components";
import {
  Box,
  Typography,
  TextField,
  Stack,
  FormControlLabel,
  Switch,
  IconButton,
  Modal,
  Fade,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import { Toast } from "../../components";
import ImgDropzone from "../Products/components/ImgDropzone";

//  redux
import { useDispatch } from "react-redux";
import Brand, { getBrand } from "../../redux-store/reducer/Brand";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 560,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function Createbrand({ type }) {
  //  Toast
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const dispatch = useDispatch();

  // MOdal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setTitle("");
    setOpen(false);
  };

  // Brand Data

  const [Title, setTitle] = useState("");
  const [Status, setStatus] = useState(true);

  const [Images, setImages] = useState([]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/store/brand/create";
    const token = localStorage.getItem("x-access-token");

    const formdata = new FormData();
    Images.forEach((item) => {
      formdata.append("brand_image", item);
    });
    formdata.append("title", Title);
    formdata.append("status", Status);

    const { data } = await axios.post(url, formdata, {
      headers: { "x-access-token": token },
    });

    settostData({ success: data.success, message: data.message });

    if (data.success) {
      setOpen(false);
      tostRef.current.show();
      setImages([]);
      setTitle("");
      dispatch(getBrand());
    } else {
      tostRef.current.show();
    }
  };

  return (
    <div>
      {type === "icon" ? (
        <Button onClick={handleOpen}>
          <IconButton>
            <AiOutlinePlus />
          </IconButton>
        </Button>
      ) : (
        <Button
          onClick={handleOpen}
          variant="contained"
          color="success"
          className="button-1"
        >
          Add New
        </Button>
      )}
      <Toast
        message={tostData.message}
        success={tostData.success}
        tostRef={tostRef}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Div>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  sx={{
                    lineHeight: "1.5",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    marginBottom: "20px",
                  }}
                >
                  Create Brand
                </Typography>
              </Box>
              <form onSubmit={handlesubmit}>
                <Box mb={2}>
                  <Stack spacing={2} p={2}>
                    <TextField
                      label="Name"
                      name="title"
                      type="text"
                      value={Title}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <Box textAlign="center">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={Status}
                            onChange={(e) => setTitle(e.target.checked)}
                            name="status"
                            color="success"
                          />
                        }
                        label="Status"
                      />
                    </Box>
                    <Box>
                      <ImgDropzone
                        Preview={[]}
                        setImages={setImages}
                        Images={Images}
                      />
                    </Box>
                  </Stack>
                </Box>
                <Box textAlign="right">
                  <LoadingButton
                    className="button-1"
                    color="success"
                    variant="contained"
                    type="submit"
                  >
                    submit
                  </LoadingButton>
                </Box>
              </form>
            </Div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const Div = styled.div`
  .MuiFormHelperText-root {
    color: #d32f2f;
    margin-left: 5px;
  }

  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0.4) !important;
  }

  .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: black;
  }
`;
