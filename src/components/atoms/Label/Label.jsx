/**
 * Label component
 * file: Label.jsx
 */
import React from "react";

const Label = ({ children, htmlFor = "", ...props }) => {
  return (
    <label className="label__form" htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
};

export default Label;
