/**
 * Product's add description components
 * file: AddDescription.jsx
 */
import React from "react";
import "./AddDescription.scss";
import PropsType from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const AddDescription = ({ handleChange, value }) => {
  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px"
      }}
    >
      {"Description: "}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(e) => handleChange(e)}
      ></ReactQuill>
    </div>
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
