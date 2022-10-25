/**
 * Product's add category components
 * file: AddCategories.jsx
 */
import React, { useEffect, useState } from "react";
import "./AddCategories.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { OutlinedInput } from "@mui/material";
import PropTypes from "prop-types";

const AddCategories = ({ category, handleCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const colRef = collection(db, "categories");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        return data;
      });
      setCategories(docs);
    })();
  }, []);
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
        {categories.map((item, index) => {
          return item.active ? (
            <MenuItem key={index} value={item.name}>
              {item.name}
            </MenuItem>
          ) : null;
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
