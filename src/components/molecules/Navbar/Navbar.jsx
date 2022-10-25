/**
 * Navbar component
 * file: Navbar.jsx
 */
import "./Navbar.scss";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";
import { Avatar, Hidden, MenuItem } from "@mui/material";
import { Box, styled } from "@mui/system";
import AvatarMenu from "../../atoms/AvatarMenu/AvatarMenu";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";

//Style
const UserMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 20,
}));

const StyledItem = styled(MenuItem)(() => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& span": {
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 35,
    color: "black",
    paddingRight: 10,
    paddingBottom: 5,
  },
  "& span:hover": {
    color: "red",
  },
}));
//Style End
const Navbar = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="banner">
          <img src="../../../logo.svg" alt="banner" />
        </div>
        <div className="items">
          <div className="item">
            <NotificationsNoneOutlined className="icon2" />
            <div className="counter">3</div>
          </div>
          <Box display="flex" alignItems="center">
            <AvatarMenu
              menuButton={
                <UserMenu>
                  <Hidden xsDown>
                    <span>
                      Welcome back,
                      <strong className="admin"> Admin </strong>
                    </span>
                  </Hidden>
                  <Avatar
                    src="../../../avatar.svg"
                    alt="avatar"
                    className="avatar"
                    sx={{ cursor: "pointer" }}
                  />
                </UserMenu>
              }
            >
              <StyledItem>
                <Link to="/">
                  <li>
                    <DashboardIcon className="icon_avatar" />
                    <span> Home </span>
                  </li>
                </Link>
              </StyledItem>
              <StyledItem>
                <Link to="/login">
                  <InputOutlinedIcon className="icon_avatar" />
                  <span onClick={handleSignOut}> Logout </span>
                </Link>
              </StyledItem>
            </AvatarMenu>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
