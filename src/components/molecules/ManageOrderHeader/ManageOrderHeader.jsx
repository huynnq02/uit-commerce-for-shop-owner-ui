import React, { useState, useEffect } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import notificationIcon from '../../../assets/icons/notificationIcon.png';
import manIcon from '../../../assets/icons/manIcon.png';
import downArrowIcon from '../../../assets/icons/downArrowIcon.png';
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";



const ManageOrderHeader = () => {
  return (
    <div className="manageOrderHeader">
      <div className="__TextHeader">
        <h1>Orders</h1>
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
