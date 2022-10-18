import * as React from "react";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import "./CircularLoading.scss";

export default function CircularUnderLoad({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} className="dialog">
      <CircularProgress disableShrink color="secondary"/>
    </Dialog>
  );
}
