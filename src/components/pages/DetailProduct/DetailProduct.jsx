import React from "react";
import AddNew from "../../molecules/AddNew/AddNew";
import ProductDetail from "../../organisms/ProductDetail/ProductDetail";
import "./DetailProduct.scss";
const DetailProduct = () => {
  return (
    <AddNew title="Product's detail">
      <ProductDetail />
    </AddNew>
  );
};

export default DetailProduct;
