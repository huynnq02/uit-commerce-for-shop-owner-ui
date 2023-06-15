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
import { useDispatch, useSelector } from "react-redux";
import { getAPIActionJSON } from "../../../../api/ApiActions";
import { toast } from "react-toastify";
const ListProduct = () => {
  // const [products, setProducts] = useState([]);
  const products = useSelector((state) => state.shop.items);
  // const dispatch = useDispatch();
  // const shopId = useSelector((state) => state.shop.id);
  // console.log("shop id:", shopId);
  // const handleResponse = (response) => {
  //   if (!response.success) {
  //     toast.error(response.message);
  //     return;
  //   }
  //   console.log(response.data);
  //   setProducts(response.data);
  // };
  // const getItemsData = () => {
  //   dispatch(
  //     getAPIActionJSON("get_all_shop_items", null, null, `/${shopId}`, (e) =>
  //       handleResponse(e)
  //     )
  //   );
  // };
  // useEffect(() => {
  //   getItemsData();
  // }, [products]);
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
