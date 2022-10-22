import React, { useEffect, useState } from "react";

export default ProductComponent = (props) => {
    // function call API from FireStore.
    // const _GetCollectionListOrder = async () => {
    //     // get collection list order
    //     const _listOrderCollection = collection(db, "listOrdered");
    //     let _docsListOrders = await getDocs(_listOrderCollection);
    //     const docsListOrder = _docsListOrders.docs.map((doc) => {
    //     const data = doc?.data();
    //     return data;
    //     });
    //     setDataOrder(docsListOrder);

    //     //get collection list Products
    //     const _productsCollection = collection(db, "products");
    //     let _docsProducts = await getDocs(_productsCollection);
    //     const docsProducts = _docsProducts.docs.map((doc) => {
    //     const data = doc?.data();
    //     return data;
    //     });
    //     setDataProduct(docsProducts);
    //     // console.log(docsProducts);

    //     // get collection list Users
    //     const _usersCollection = collection(db, "users");
    //     let _docsUser = await getDocs(_usersCollection);
    //     const docsUser = _docsUser.docs.map((doc) => {
    //     const data = doc?.data();
    //     return data;
    //     });
    //     setDataUser(docsUser);
    //     // console.log(docsListOrder);
    //     // console.log(docsProducts);
    //     // console.log(docsUser);


    //     // -------------------------------- Format dataOrder --------------------------------
    //     if (
    //     dataOrder !== undefined &&
    //     dataProduct !== undefined &&
    //     dataUser !== undefined
    //     ) {


    //     // adding value for Total, shippingTotal, subTotal field
    //     dataOrder.map((element) => {
    //         if (element.productInfo !== null) {
    //         element.productInfo.map((_productInfo) => {
    //             dataProduct.map((_dataProduct) => {
    //             if (_productInfo.productId === _dataProduct.id) {
    //                 // console.log(_dataProduct);
    //                 // element.shippingTotal = 40000;
    //                 element.subTotal =
    //                 _productInfo.productQuantities * _dataProduct.price;
    //                 element.Total = element.subTotal + element.shippingTotal;
    //             }
    //             });
    //         });


    //         // adding userName field to data
    //         dataOrder.map((_dataOrder) => {
    //             dataUser.map((_dataUser) => {
    //             if (_dataOrder.userId == _dataUser.userUid) {
    //                 _dataOrder.userName = _dataUser.fullname;
    //                 return _dataOrder.username;
    //             } else {
    //                 console.log("No valid user name");
    //             }
    //             });
    //         });
    //         setDataOrderComplete(dataOrder);
    //         // console.log(dataOrderComplete);
            
    //         } else {
    //         console.log(
    //             "Invalid value in productInfo: field productInfo is null"
    //         );
    //         }
    //     });
    //     setIsFletchingData(true);
    //     console.log(dataOrder);
    //     return;
    //     } else {
    //     console.log("There are no data called from FireStore");
        
    //     }
    // };
    const [productInfo, setProductInfo] = useState();

    useEffect (() => {
        setProductInfo(props);
    }, [])
    return (
        <div className="orderCom__products">
            <div className="orderCom__product__container">
                <div className="orderCom__product__image">
                    <img className='orderCom__product__image--img' src={productInfo.image}/>
                </div>
                <div className="orderCom__product__information">
                    <span>{productInfo.name}</span>
                    <span>x{productInfo.productQuantities}</span>
                </div>
                <div className="orderCom__product__price">
                    {/* <span className='orderCom__product__price--text'>đ</span> */}
                    <span className='orderCom__product__price--price'>{Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(productInfo.price)}</span>
                </div>
            </div>
        </div>
    );
}