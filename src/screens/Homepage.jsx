import Categories from "./Categories";
import TrendyProducts from "../components/TrendyProducts";
import Products from "../components/Products";
import "../scss/homepage.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/slice/ProductSlice";
import { fetchCart } from "../store/slice/CartSlice";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <main>
      {/* <Categories /> */}
      <div className="offer-slider">
        <div className="product-details">
          <p style={{ fontSize: "3rem" }}>Explore </p>
          <p style={{ fontSize: "1.5rem" }}>variety of products</p>
          <p className="desc">Or scroll to find Trendy products </p>
          <button onClick={() => navigate("/product_list")}>Explore</button>
        </div>
        <img
          src="/slider_image.png"
          className="slider-image"
          alt="offer-imge"
        />
      </div>
      <TrendyProducts />
      <h3 style={{ textAlign: "center", fontSize: "2rem" }}>TRENDY PRODUCTS</h3>

      <div className="product-container">
        {productList?.map((product) => (
          <Products value={product} key={product.id} />
        ))}
      </div>
    </main>
  );
};

export default Homepage;
