/**
 * Popup component
 * file: Popup.jsx
 */
import React from "react";
import "./Popup.scss";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PropsType from "prop-types";

const Popup = ({ children, title, open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      className="popup"
    >
      <DialogTitle>{title}</DialogTitle>
      <div className="children">{children}</div>
    </Dialog>
  );
};
Popup.propsType = {
  children: PropsType.node,
  title: PropsType.string,
  open: PropsType.bool,
  handleClose: PropsType.func,
};
Popup.defaultProps = {
  children: null,
  title: "",
  open: false,
  handleClose: () => {},
};
export default Popup;
