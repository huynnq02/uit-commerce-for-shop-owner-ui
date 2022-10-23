/**
 * Edit Detail Users
 * file: Single.jsx
 */
import "./EditUser.scss";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import Navbar from "../../molecules/Navbar/Navbar";
import Chart from "../../atoms/Chart/Chart";
import List from "../../organisms/Table/Table";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const USER = {
  address: "",
  fullname: "",
  password: "",
  phonenumber: "",
  email: "",
  status: "",
  age: 0,
};
const Single = () => {
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
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
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

export default Single;
