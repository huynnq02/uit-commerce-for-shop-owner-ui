/**
 * Dropdown Avatar Menu component
 * file: ProductDetail.jsx
 */
import { Menu } from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { Fragment } from "react";

const MenuButton = styled(Box)(() => ({
  display: "inline-block",
  "& div:hover": {
    backgroundColor: "#d4d0f1",
  },
}));

const AvatarMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const children = React.Children.toArray(props.children);
  let { shouldCloseOnItemClick = true, horizontalPosition = "left" } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <MenuButton onClick={handleClick}>{props.menuButton}</MenuButton>
      <Menu
        elevation={8}
        getcontentanchorel={null}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: horizontalPosition,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: horizontalPosition,
        }}
      >
        {children.map((child, index) => (
          <div
            onClick={shouldCloseOnItemClick ? handleClose : () => {}}
            key={index}
          >
            {child}
          </div>
        ))}
      </Menu>
    </Fragment>
  );
};

export default AvatarMenu;
