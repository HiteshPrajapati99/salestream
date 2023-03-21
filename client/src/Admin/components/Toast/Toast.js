import { useState, forwardRef, useImperativeHandle } from "react";
import { Alert, Box, Slide, Snackbar } from "@mui/material";
import { BsCheckCircleFill } from "react-icons/bs";
import ErrorIcon from "@mui/icons-material/Error";

export const Toast = forwardRef(({ success, message, tostRef }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    transition: "right",
  });

  const { vertical, horizontal } = state;

  useImperativeHandle(tostRef, () => ({
    show(newState) {
      newState === undefined
        ? setState({ ...state, open: true })
        : setState({ ...newState, open: true });
    },
  }));

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Box>
      {success ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={state.open}
          autoHideDuration={1800}
          TransitionComponent={Slide}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            className="alert-box"
            iconMapping={{
              success: (
                <div className="icon-bg">
                  <BsCheckCircleFill style={{ color: "green" }} />
                </div>
              ),
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={state.open}
          autoHideDuration={1800}
          TransitionComponent={Slide}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            className="alert-box"
            iconMapping={{
              error: (
                <div className="icon-bg">
                  <ErrorIcon color="error" />
                </div>
              ),
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
});
