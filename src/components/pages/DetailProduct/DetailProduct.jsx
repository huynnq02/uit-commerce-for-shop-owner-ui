/**
 * Detail Product Pages
 * file: DetailProduct.jsx
 */
import React from "react";
import AddNew from "../../molecules/AddNew/AddNew";
import ProductDetail from "../../organisms/ProductDetail/ProductDetail";
const DetailProduct = () => {
  return (
    <AddNew title="Product's detail">
      <ProductDetail />
    </AddNew>
  );
};

export default DetailProduct;
