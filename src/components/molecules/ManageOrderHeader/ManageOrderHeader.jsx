/**
 * Manage order header component
 * file: ManageOrderHeader.jsx
 */
import React, { useState } from "react";
import notificationIcon from "../../../assets/icons/notificationIcon.png";
import manIcon from "../../../assets/icons/manIcon.png";
import downArrowIcon from "../../../assets/icons/downArrowIcon.png";

const ManageOrderHeader = () => {
  const [orderFounded, setOrderFounded] = useState(6);

  return (
    <div className="manageOrderHeader">
      <div className="__TextHeader">
        <h1>Orders</h1>
        <h4>{orderFounded} orders found</h4>
      </div>
      <div className="__ButtonHeader">
        <button className="__ButtonNotification">
          <img src={notificationIcon} alt="Notification Icon" />
        </button>
        <button className="__ButtonProfileSetting">
          <img src={manIcon} alt="Profile Icon" />
        </button>
        <button className="__ButtonArrowDropDown">
          <img src={downArrowIcon} alt="More Info Icon" />
        </button>
      </div>
    </div>
  );
};

export default ManageOrderHeader;
