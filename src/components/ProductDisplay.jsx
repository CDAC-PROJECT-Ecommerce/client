import "../scss/productdisplay.scss";
import Review from "../components/Review";
import { useSelector } from "react-redux";

const ProductDisplay = () => {
  const product = useSelector((state) => state.products.FullProduct);

  return (
    <div className="full-page-display">
      <div className="product-display-container">
        <div className="product-image"></div>
        <div className="product-details">
          <p className="product-title">{product?.name}</p>
          <p className="product-details">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut deserunt
            id ea odio? Mollitia earum debitis dolorum deleniti est quos alias,
            suscipit, magni quo ut delectus incidunt. Verita
          </p>
          <p className="product-review">{product?.review}/5</p>
          <p className="product-price">₹ {product?.price}</p>

          <div className="product-display-btn">
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
      <Review />
    </div>
  );
};

export default ProductDisplay;
