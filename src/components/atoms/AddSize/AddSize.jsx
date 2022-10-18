/**
 * Product's add sizes components
 * file: AddSize.jsx
 */
import React, { useEffect, useState } from "react";
import { STR_SIZES, SIZES } from "../../../constants";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";

const AddSize = ({ handleChange, sizes }) => {
  const [size, setSize] = useState(SIZES);

  useEffect(() => {
    let newList = SIZES.map((item) => {
      if (sizes.includes(item.name)) return { name: item.name, value: true };
      else return item;
    });
    setSize(newList);
  }, [sizes]);

  /**
   * handle when change checked sizes
   * @private
   * @params event, index
   */
  const _handleChangeSizes = (e, index) => {
    let updateArr = size.map((item, i) => {
      if (i == index) {
        return { ...item, value: e.target.checked };
      }
      return item;
    });

    let arrSizes = [];
    let newValue = updateArr.map((item) => {
      if (item.value) {
        arrSizes.push(item.name);
      }
    });
    handleChange(arrSizes);
  };
  return (
    <FormControl style={{ width: "80%" }}>
      <label>Size:</label>
      <FormGroup
        style={{ display: "flex", justifyContent: "space-between" }}
        row={true}
      >
        {STR_SIZES.map((item, index) => {
          return (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={size[index].value}
                  sx={{
                    color: "#2A254B",
                    "&.Mui-checked": {
                      color: "#2A254B",
                    },
                  }}
                  onChange={(e) => _handleChangeSizes(e, index)}
                  name={item}
                />
              }
              label={item}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

AddSize.propTypes = {
  handleChange: PropTypes.func,
  sizes: PropTypes.array,
};

AddSize.defaultProps = {
  handleChange: () => {},
  sizes: [],
};

export default AddSize;
