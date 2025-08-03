import "../scss/productdisplay.scss";
import Review from "./Review";
import { useDispatch, useSelector } from "react-redux";
import { FaRegStar } from "react-icons/fa6";
import { addToCart } from "../store/slice/CartSlice";

const ProductDisplay = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.FullProduct);
  const { userToken } = useSelector((state) => state.user);

  const addProduct = (e) => {
    if (userToken === null) {
      toast.error("Please login");
      navigate("/signin");
    } else {
      const data = { productId: product?.productId, value: 1 };
      console.log(product);
      dispatch(addToCart({ productId: product?.id, value: 1 }));
    }
  };
  return (
    <div className="full-page-display">
      <div className="product-display-container">
        <div className="full-product-image">
          <img src="/wirelessmouse.jpg" alt="product-image" />
        </div>
        <div className="full-product-details">
          <p className="product-title">{product?.name}</p>
          <p className="product-category">{product?.categoryName}</p>
          <p className="product-description">{product?.description}</p>
          <p className="product-price">₹ {product?.price}</p>

          <p className="product-review">
            <FaRegStar className="review-star" /> {product?.review}
          </p>

          <div className="product-display-btn">
            <button onClick={addProduct}>Add to Cart</button>
          </div>
        </div>
      </div>
      <Review />
    </div>
  );
};

export default ProductDisplay;
