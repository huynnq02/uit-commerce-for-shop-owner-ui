/**
 * Navbar component
 * file: Navbar.jsx
 */
import "./Navbar.scss";
import FullScreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutLinedIcon from "@mui/icons-material/ListOutlined";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="banner">
          <img src="../../../logo.svg" alt="banner" />
        </div>
        <div className="items">
          <div className="item">
            <FullScreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ListOutLinedIcon className="icon" />
          </div>

          <div className="item">
            <img src="../../../avatar.svg" alt="avatar" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
