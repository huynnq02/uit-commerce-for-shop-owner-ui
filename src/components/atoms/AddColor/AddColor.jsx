/**
 * Product's add colors components
 * file: AddColor.jsx
 */
import React, { useState } from "react";
import "./AddColor.scss";
import PropTypes from "prop-types";

const AddColor = ({ colors, handleAddColors }) => {
  const [color, setColor] = useState("");

  const _handleAddColor = () => {
    let newArr = [...colors];
    newArr.push(color);
    handleAddColors(newArr);
    setColor("");
  };

  const _handleDelete = (color) => {
    let newArr = [...colors];
    let deleteArr = newArr.filter((item) => {
      return item !== color;
    });
    handleAddColors(deleteArr);
  };

  return (
    <div className="add-color">
      <label>Colors:</label>
      <div className="add">
        <input
          onChange={(e) => {
            setColor(e.target.value);
          }}
          type="text"
          value={color}
          className="input"
        />
        <div className="btn" onClick={_handleAddColor}>
          Add color
        </div>
      </div>
      <div className="group-color">
        {colors.map((item, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: `${item}` }}
              className="color"
              onClick={() => _handleDelete(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
AddColor.propTypes = {
  colors: PropTypes.array,
  handleAddColors: PropTypes.func,
};

AddColor.defaultProps = {
  colors: [],
  handleAddColors: () => {},
};
export default AddColor;
