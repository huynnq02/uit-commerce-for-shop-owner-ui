/**
 * Change User's Status Components
 * file: ChangeStatus.jsx
 */
import React from "react";
import "./ChangeStatus.scss";
import { STATUS } from "../../../constants";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { OutlinedInput } from "@mui/material";
import PropTypes from "prop-types";

const ChangeStatus = ({ status, handleStatusChange }) => {
  return (
    <FormControl className="formInput">
      <label>Status:</label>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        defaultValue=""
        input={<OutlinedInput />}
        label="Status"
        inputProps={{ "aria-label": "Without label" }}
        onChange={(e) => handleStatusChange(e)}
      >
        {STATUS.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

ChangeStatus.propTypes = {
  status: PropTypes.string,
  handleStatusChange: PropTypes.func,
};

ChangeStatus.defaultProps = {
  status: "",
  handleStatusChange: () => {},
};

export default ChangeStatus;
