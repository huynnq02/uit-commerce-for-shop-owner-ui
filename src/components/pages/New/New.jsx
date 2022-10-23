/**
 * View Detail Users page
 * file: New.jsx
 */
import "./New.scss";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import Navbar from "../../molecules/Navbar/Navbar";
import Chart from "../../atoms/Chart/Chart";
import List from "../../organisms/Table/Table";
import CircularUnderLoad from "../../atoms/CircularLoading/CircularLoading";
import ChangeStatus from "../../atoms/ChangeStatus/ChangeStatus";
import AlertMessage from "../../atoms/Alert/Alert";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import Button from "../../atoms/Button/Button";

const USER = {
  address: "",
  fullname: "",
  password: "",
  phonenumber: "",
  email: "",
  status: "",
  age: 0,
};
const New = () => {
  //Get data user from Firebase
  const [user, setUser] = useState(USER);
  let { userId } = useParams();
  useEffect(() => {
    (async () => {
      if (!userId) return;
      else {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser(data);
        } else {
          console.log("no data");
        }
      }
    })();
  }, [userId]);
  //Get data oders from Firebase
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      const colRef = collection(db, "listOrdered");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setOrders(docs);
    })();
  }, []);
  //Button update status
  const [open, setOpen] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const [openMess, setOpenMess] = useState(false);
  const [errorType, setErrorType] = useState("error");
  const elementRef = useRef(null);

  const _handleStatusChange = (e) => {
    setUser({ ...user, ["status"]: e.target.value });
  };
  const _handleSubmit = () => {
    setOpen(true);
    (async () => {
      const newRef = doc(collection(db, `users`), userId);
      await updateDoc(newRef, {
        status: user.status,
      }).then(() => {
        setOpen(false);
        setErrorType("success");
        setErrorMess("Update success!");
        setOpenMess(true);
        elementRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    })();
  };
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <CircularUnderLoad open={open} />
        <AlertMessage
          ref={elementRef}
          message={errorMess}
          open={openMess}
          type={errorType}
          handleOpen={() => {
            setOpenMess((prev) => !prev);
          }}
        />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2sC2-8l0V98cNKmtgzZr0vh96kJFm_U3fbV-3-9_tI90QKfW0x8L1iRAYbWGkxQZL5_c&usqp=CAU"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user.fullname}</h1>
                <div className="detailItem">
                  <span className="itemKey">Phone :</span>
                  <span className="itemKey">{user.phonenumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address :</span>
                  <span className="itemKey">{user.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email :</span>
                  <span className="itemKey">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status :</span>
                  <span className="itemKey">{user.status}</span>
                </div>
                <br></br>
                <div className="detailItem">
                  <ChangeStatus
                    status={user.status}
                    handleStatusChange={_handleStatusChange}
                  />
                </div>
                <div className="detailItem">
                  <Button
                    handleClick={_handleSubmit}
                    backgroundColor={"#2A254B"}
                    color={"white"}
                    content="UPDATE"
                    radius={10}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default New;
