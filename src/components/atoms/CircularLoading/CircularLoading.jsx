/**
 * Loading Circularcomponents
 * file: CircularLoading.jsx
 */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import "./CircularLoading.scss";
import PropsType from "prop-types";

export default function CircularUnderLoad({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} className="dialog">
      <CircularProgress disableShrink color="secondary" />
    </Dialog>
  );
}
CircularUnderLoad.propsType = {
  open: PropsType.bool,
  handleClose: PropsType.func,
};
CircularUnderLoad.defaulProps = {
  open: false,
  handleClose: () => {},
};
