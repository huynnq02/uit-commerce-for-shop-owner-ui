import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/firebase-config";
import AddListImage from "../../atoms/AddListImage/AddListImage";
import AddColor from "../../atoms/AddColor/AddColor";
import AddImage from "../../atoms/AddImage/AddImage";
import AddDescription from "../../atoms/AddDescription/AddDescription";
import AddCategories from "../../atoms/AddCategories/AddCategories";
import AddSize from "../../atoms/AddSize/AddSize";
import ActiveStatus from "../../atoms/ActiveStatus/ActiveStatus";
import "./ProductDetail.scss";
import { DATA_INPUT_PRODUCT } from "../../../constants";
import CircularUnderLoad from "../../atoms/CircularLoading/CircularLoading";
import Button from "../../atoms/Button/Button";
const PRODUCT = {
  active: true,
  category: "Quần Dài Form Tiêu Chuẩn",
  color: [],
  name: "Quần Tây Tối Giản HG17",
  description:
    "Chất liệu: Vải Quần Tây Thành phần: 82% polyester 14% rayon 4% spandex",
  detailImages: [],
  image: "",
  price: 325000,
  quantities: 70,
  sales: 0,
  sizes: [],
  sold: 0,
};
const ProductDetail = () => {
  const [product, setProduct] = useState(PRODUCT);
  const [url, setUrls] = useState([]);
  const [imgUrl, setImgUrl] = useState(product.image);
  const [open, setOpen] = useState(false);
  let { productId } = useParams();
  useEffect(() => {
    (async () => {
      if (!productId) return;
      else {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct(data);
        } else {
          console.log("no data");
        }
      }
    })();
  }, [productId]);

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
    setProduct({ ...product, ["description"]: e.target.value });
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

  const _handleSubmit = () => {
    setOpen(true);
    _handlePushListImages().then(() => {
      _handlePushImage().then(async () => {
        const newRef = doc(collection(db, `products`), productId);
        await updateDoc(newRef, {
          active: product.active,
          category: product.category,
          color: product.color,
          description: product.description,
          name: product.name,
          price: Number(product.price),
          quantities: Number(product.quantities),
          sales: product.sales,
          sizes: product.sizes,
        }).then(() => {
          console.log("success");
          setOpen(false);
        });
      });
    });
  };
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
      setImgUrl(photo[0]);

      const newRef = doc(collection(db, `products`), productId);
      await updateDoc(newRef, { image: photo[0] });
    }
  };
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
    setUrls(imgs);
  };
  return (
    <div className="detail-product">
      <CircularUnderLoad open={open} />
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
