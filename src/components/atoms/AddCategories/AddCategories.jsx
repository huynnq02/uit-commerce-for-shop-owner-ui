import React from "react";
import "./AddCategories.scss";
import { CATEGORIES } from "../../../constants";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { OutlinedInput } from "@mui/material";
import PropTypes from "prop-types";

const AddCategories = ({ category, handleCategoryChange }) => {
  return (
    <FormControl className="formInput">
      <label>Category:</label>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category}
        defaultValue=""
        input={<OutlinedInput />}
        label="Category"
        inputProps={{ "aria-label": "Without label" }}
        onChange={(e) => handleCategoryChange(e)}
      >
        {CATEGORIES.map((item, index) => {
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

AddCategories.propTypes = {
  category: PropTypes.string,
  handleCategoryChange: PropTypes.func,
};

AddCategories.defaultProps = {
  category: "",
  handleCategoryChange: () => {},
};

export default AddCategories;
