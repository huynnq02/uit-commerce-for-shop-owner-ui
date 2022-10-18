import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({
  content,
  radius,
  color,
  fontSize,
  borderColor,
  backgroundColor,
  width,
  height,
  handleClick,
}) => {
  return (
    <button
      onClick={handleClick}
      style={{
        fontSize: `${fontSize}px`,
        borderRadius: `${radius}px`,
        color: color,
        border: `1px solid ${borderColor}`,
        backgroundColor: backgroundColor,
        width: width,
        height: height,
      }}
      className="customBtn"
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  content: PropTypes.string,
  radius: PropTypes.number,
  color: PropTypes.string,
  fontSize: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  content: "",
  radius: null,
  color: null,
  fontSize: 16,
  borderColor: "transparent",
  backgroundColor: null,
  width: null,
  height: null,
  handleClick: () => {},
};

export default Button;
