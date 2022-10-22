/**
 * Alert message components
 * file: Alert.jsx
 */
import React, { forwardRef } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import "./Alert.scss";

const AlertMessage = forwardRef(({ message, type, open, handleOpen }, ref) => {
  return (
    <Box ref={ref} sx={{ width: "100%", marginBottom: "10px" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="medium"
              onClick={handleOpen}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          variant="filled"
          severity={type}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
});
AlertMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
};
AlertMessage.defaultProps = {
  message: "",
  type: "error",
  open: false,
  handleOpen: () => {},
};
export default AlertMessage;
