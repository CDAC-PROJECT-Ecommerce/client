import "../scss/productdisplay.scss";
import Review from "../components/Review";
import { useDispatch, useSelector } from "react-redux";
import { FaRegStar } from "react-icons/fa6";
import { addToCart } from "../store/slice/CartSlice";

const ProductDisplay = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.FullProduct);

  const addProduct = (e) => {
    dispatch(addToCart(product?.id));
  };
  return (
    <div className="full-page-display">
      <div className="product-display-container">
        <div className="full-product-image">
          <img src="/wirelessmouse.jpg" alt="product-image" />
        </div>
        <div className="full-product-details">
          <p className="product-title">{product?.name}</p>
          <p className="product-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut deserunt
            id ea odio? Mollitia earum debitis dolorum deleniti est quos alias,
            suscipit, magni quo ut delectus incidunt. Verita
          </p>
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
