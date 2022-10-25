/*
 * Product component for view detail order
 * file: ProductComponent.jsx
 */
import React, { useEffect, useState } from "react";

const ProductComponent = (props) => {
  const [productInfo, setProductInfo] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    setProductInfo(props);
  }, []);
  return (
    <div className="orderCom__products">
      <div className="orderCom__product__container">
        <div className="orderCom__product__image">
          <img
            className="orderCom__product__image--img"
            src={productInfo.image}
          />
        </div>
        <div className="orderCom__product__information">
          <span>{productInfo.name}</span>
          <span>x{productInfo.productQuantities}</span>
        </div>
        <div className="orderCom__product__price">
          <span className="orderCom__product__price--price">
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(productInfo.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
