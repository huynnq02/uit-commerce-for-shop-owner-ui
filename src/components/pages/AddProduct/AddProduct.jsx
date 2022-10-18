/**
 * Add Product Pages
 * file: AddProduct.jsx
 */
import React from "react";
import AddNew from "../../molecules/AddNew/AddNew";
import Product from "../../organisms/Product/Product";
const AddProduct = () => {
  return (
    <AddNew title="Add New Product">
      <Product />
    </AddNew>
  );
};

export default AddProduct;
