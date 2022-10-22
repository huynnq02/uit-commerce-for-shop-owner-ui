/**
 * Product's add description components
 * file: AddDescription.jsx
 */
import React from "react";
import "./AddDescription.scss";
import PropsType from "prop-types";
const AddDescription = ({ handleChange, value }) => {
  return (
    <label className="formInput">
      Description:
      <textarea
        placeholder="Add product's descriptions"
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
};
AddDescription.propstype = {
  value: PropsType.string,
  handleChange: PropsType.func,
};
AddDescription.defaultProps = {
  value: "",
  handleChange: () => {},
};
export default AddDescription;
