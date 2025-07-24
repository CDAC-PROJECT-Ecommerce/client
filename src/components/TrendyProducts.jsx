import { useNavigate } from "react-router-dom";
import "../scss/trendyproduct.scss";
const TrendyProducts = () => {
  const navigate = useNavigate();
  return (
    <div className="trendybox-container">
      <div className="trendybox">
        <img src="/menclothing.jpg" alt="men_clothing" />
        <div className="overlay-content">
          <p className="title">Men's Clothing</p>
          <button onClick={() => navigate("/product_list")}>Explore</button>
        </div>
      </div>
      <div className="trendybox">
        <img src="/womenclothing.jpg" alt="men_clothing" />
        <div className="overlay-content">
          <p className="title">Women's Clothing</p>
          <button onClick={() => navigate("/product_list")}>Explore</button>
        </div>
      </div>
      <div className="trendybox">
        <img src="/babyclothing.jpg" alt="men_clothing" />
        <div className="overlay-content">
          <p className="title">Baby Clothing</p>
          <button onClick={() => navigate("/product_list")}>Explore</button>
        </div>
      </div>
    </div>
  );
};

export default TrendyProducts;
