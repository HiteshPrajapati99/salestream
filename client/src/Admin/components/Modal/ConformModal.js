import React, { useState } from "react";

import {
  Button,
  Modal,
  Typography,
  Box,
  Fade,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "444px",
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

export default function ConformModal({ DeleteImage }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Wrapper>
      <IconButton
        className="delete-icon"
        // onClick={
        //   id
        //     ? () => handleDeleteApi(file, index)
        //     : () => handleDeleteImage(index)
        // }
        onClick={handleOpen}
      >
        <RemoveCircleIcon
          style={{ width: "20px", height: "20px", color: "#000" }}
        />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" fontWeight="700" lineHeight="1.55556">
              Delete
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure want to delete?
            </Typography>
            <Box display="flex" justifyContent="end" gap={2} pt={3}>
              <Button
                variant="contained"
                color="error"
                sx={{
                  borderRadius: "16px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
                onClick={DeleteImage}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  borderRadius: "16px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .MuiFormHelperText-root {
    color: #d32f2f;
    margin-left: 5px;
  }
  .delete-icon {
    position: absolute;
    top: -8px;
    right: -10px;
    color: #979797 !important;
    z-index: 0 !important;
    background: #ffffff;
    z-index: 101;
    box-shadow: 0px 0px 5px 1px rgb(0 0 0 / 10%);
    padding: 0px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0.4) !important;
  }

  .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: black;
  }
`;
