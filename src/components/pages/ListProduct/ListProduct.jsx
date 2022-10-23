/**
 * List Product pages
 * file: ListProduct.jsx
 */
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import Navbar from "../../molecules/Navbar/Navbar";
import DataGridView from "../../molecules/DataGridView/DataGridView";
import "../ListUsers/List.scss";
const ListProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const colRef = collection(db, "products");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setProducts(docs);
    })();
  }, []);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataGridView products={products} />
      </div>
    </div>
  );
};

export default ListProduct;
