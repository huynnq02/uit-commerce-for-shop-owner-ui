/**
 * Detail Product and update product component
 * file: ProductDetail.jsx
 */
import React, { useEffect, useState, useRef, useReducer } from "react";
import { useParams } from "react-router-dom";
import { doc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/firebase-config";
import { DATA_INPUT_PRODUCT, PRODUCT_INITITAL_VALUE } from "../../../constants";
import AddListImage from "../../atoms/AddListImage/AddListImage";
import AddColor from "../../atoms/AddColor/AddColor";
import AddImage from "../../atoms/AddImage/AddImage";
import AddDescription from "../../atoms/AddDescription/AddDescription";
import AddCategories from "../../atoms/AddCategories/AddCategories";
import AddSize from "../../atoms/AddSize/AddSize";
import ActiveStatus from "../../atoms/ActiveStatus/ActiveStatus";
import CircularUnderLoad from "../../atoms/CircularLoading/CircularLoading";
import Button from "../../atoms/Button/Button";
import AlertMessage from "../../atoms/Alert/Alert";
import "./ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAPIActionJSON,
  getAPIActionJSONNoMulti,
} from "../../../../api/ApiActions";

const ProductDetail = () => {
  const [product, setProduct] = useState(PRODUCT_INITITAL_VALUE);
  const [open, setOpen] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const [openMess, setOpenMess] = useState(false);
  const [errorType, setErrorType] = useState("error");
  const eRef = useRef(null);
  let { productId } = useParams();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.shop.items);
  useEffect(() => {
    // find product that has items id
    const temp = items.find((item) => item.id === productId);
    const product = {
      name: temp.name,
      price: temp.price,
      quantities: temp.quantity,
      sales: temp.discount,
      description: temp.description,
      category: temp.category,
      sizes: temp.sizes,
      color: temp.colors,
      image: temp.image,
      detailImages: temp.detail_image,
      active: temp.active,
    };
    setProduct(product);
    console.log("yesssss");
    console.log("product id:", productId);
  }, []);

  /**
   * handle validate inputs
   * @private
   * @params none
   */
  const _handleValidation = () => {
    if (!product.name) {
      setErrorMess(`Product name can not be empty!`);
      return false;
    } else if (product.price < 0 || !product.price) {
      setErrorMess(`Price can not be empty!`);
      return false;
    } else if (product.quantities < 0 || !product.quantities) {
      setErrorMess(`Quantities can not be empty!`);
      return false;
    } else if (product.sales < 0 || product.sales === null) {
      setErrorMess(`Sales can not be empty!`);
      return false;
    } else if (!product.description) {
      setErrorMess(`Description can not be empty!`);
      return false;
    } else if (!product.category) {
      setErrorMess(`Category can not be empty!`);
      return false;
    } else if (product.sizes.length === 0) {
      setErrorMess(`Size can not be empty!`);
      return false;
    } else if (product.color.length === 0) {
      setErrorMess(`Colors can not be empty!`);
      return false;
    } else if (!product.image) {
      setErrorMess(`Display Image can not be empty!`);
      return false;
    } else if (product.detailImages.length === 0) {
      setErrorMess(`Detail Images Image can not be empty!`);
      return false;
    } else {
      return true;
    }
  };

  /**
   * handle when value in group input change
   * @private
   * @params event
   */
  const _handleChangeValueInput = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  /**
   * handle when descriptions change value
   * @private
   * @params event
   */
  const _handleChangeDescriptions = (e) => {
    setProduct({ ...product, ["description"]: e });
  };

  /**
   * handle when select category value
   * @private
   * @params event
   */
  const _handleCategoryChange = (e) => {
    setProduct({ ...product, ["category"]: e.target.value });
  };

  /**
   * handle when change display images value
   * @private
   * @params image
   */
  const _handleChangeDisplayImage = (image) => {
    setProduct({ ...product, ["image"]: image });
  };

  /**
   * handle when change status
   * @private
   * @params none
   */
  const _handleChangeActiveStatus = () => {
    let newActive = !product.active;
    setProduct((prev) => {
      let newArr = { ...prev };
      newArr.active = newActive;
      return newArr;
    });
  };

  /**
   * handle when change detail images value
   * @private
   * @params imgs
   */
  const _handleAddImage = (imgs) => {
    setProduct((prev) => {
      let newArr = { ...prev };
      newArr.detailImages = imgs;
      return newArr;
    });
  };

  /**
   * handle when size change value
   * @private
   * @params sizes
   */
  const _handleChangeSizes = (sizes) => {
    setProduct((prev) => {
      let newArr = { ...prev };
      newArr.sizes = sizes;
      return newArr;
    });
  };

  /**
   * handle when change colors
   * @private
   * @params colors
   */
  const _handleChangeColor = (colors) => {
    setProduct({ ...product, ["color"]: colors });
  };

  /**
   * handle when submit the data to firebase
   * @private
   * @params none
   */
  const handleResponse = (response) => {
    if (!response.success) {
      toast.error(response.message);
      console.log(response.message);
      return;
    }
    setOpen(false);
    setErrorType("success");
    setErrorMess("Adding success!");
    setOpenMess(true);
    window.scrollTo(0, 0);
  };
  const _handleSubmit = async () => {
    if (_handleValidation()) {
      const data = {
        active: product.active,
        category: product.category,
        colors: product.color.join(", "),
        description: product.description,
        name: product.name,
        price: Number(product.price),
        quantity: Number(product.quantities),
        discount: product.sales,
        sizes: product.sizes.join(", "),
        productId: productId,
      };
      console.log(data);
      const formData = new FormData();
      formData.append("active", product.active);
      formData.append("category", product.category);
      formData.append("colors", product.color.join(", "));
      formData.append("description", product.description);
      formData.append("name", product.name);
      formData.append("price", Number(product.price));
      formData.append("quantity", Number(product.quantities));
      formData.append("discount", product.sales);
      formData.append("sizes", product.sizes.join(", "));
      dispatch(
        getAPIActionJSON(
          "update_item",
          {
            formData,
          },
          null,
          `/${productId}`,
          (e) => handleResponse(e)
        )
      );
    } else {
      setErrorType("error");
      setOpenMess(true);
      elementRef.current?.scrollIntoView({ behavior: "smooth" });
      window.scrollTo(0, 0);
    }
  };

  /**
   * handle when push image to storage and push image's link to firestore
   * @private
   * @params id
   */
  const _handlePushImage = async () => {
    if (typeof product.image !== "string") {
      const promises = [];
      const storageRef = ref(storage, `product-images/${product.image.name}`);
      promises.push(
        uploadBytesResumable(storageRef, product.image).then((uploadResult) => {
          return getDownloadURL(uploadResult.ref);
        })
      );
      const photo = await Promise.all(promises);

      const newRef = doc(collection(db, `products`), productId);
      await updateDoc(newRef, { image: photo[0] });
    }
  };

  /**
   * handle when push list of detail image to storage and push images's link to firestore
   * @private
   * @params id
   */
  const _handlePushListImages = async () => {
    const promises = [];
    const img = [];
    for (var i = 0; i < product.detailImages.length; i++) {
      const file = product.detailImages[i];
      if (file !== null && typeof file !== "string") {
        const storageRef = ref(storage, `product-images/${file.name}`);

        promises.push(
          uploadBytesResumable(storageRef, file).then((uploadResult) => {
            return getDownloadURL(uploadResult.ref);
          })
        );
      } else {
        img.push(file);
      }
    }
    const photos = await Promise.all(promises);
    let imgs = [...img, ...photos];
    const newRef = doc(collection(db, `products`), productId);
    await updateDoc(newRef, { detailImages: imgs });
  };
  return (
    <div className="detail-product">
      <CircularUnderLoad open={open} />
      <AlertMessage
        ref={eRef}
        message={errorMess}
        open={openMess}
        type={errorType}
        handleOpen={() => {
          setOpenMess((prev) => !prev);
        }}
      />
      <div className="detail-product__container">
        <div className="detail-product__left">
          <form className="formInput">
            {DATA_INPUT_PRODUCT.map((item, index) => {
              return (
                <label key={index} className="formInput">
                  {item.title}:
                  <input
                    value={product[`${item.name}`]}
                    name={item.name}
                    type={item.type}
                    onChange={_handleChangeValueInput}
                  />
                </label>
              );
            })}

            {/* sold */}
            <label className="formInput">
              Sold:
              <input value={product.sold} name={"sold"} disabled />
            </label>

            {/* Change status */}
            <ActiveStatus
              active={product.active}
              onChangeStatus={_handleChangeActiveStatus}
            />
            {/* Add descriptions */}
            <AddDescription
              value={product.description}
              handleChange={_handleChangeDescriptions}
            />
            {/* Add category */}
            <AddCategories
              category={product.category}
              handleCategoryChange={_handleCategoryChange}
            />
            {/* Add sizes */}
            <AddSize sizes={product.sizes} handleChange={_handleChangeSizes} />
            {/* Add colors */}
            <AddColor
              colors={product.color}
              handleAddColors={_handleChangeColor}
            />
          </form>
        </div>
        <div className="detail-product__right">
          <AddImage
            displayImage={product.image}
            handleChangeImage={_handleChangeDisplayImage}
          />
          <AddListImage
            listImages={product.detailImages}
            handleChangeImage={_handleAddImage}
          />
        </div>
      </div>
      <div className="detail-product__foot">
        <Button
          handleClick={_handleSubmit}
          backgroundColor={"#2A254B"}
          color={"white"}
          content="Submit"
          radius={5}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
