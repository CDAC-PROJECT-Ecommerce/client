import Categories from "./Categories";
import TrendyProducts from "../components/TrendyProducts";
import Products from "../components/Products";
import "../scss/homepage.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/slice/ProductSlice";

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
          <p>Designer </p>
          <p>Printed tees</p>
          <p className="desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing
          </p>
          <button onClick={() => navigate("/product_list")}>Explore Now</button>
        </div>
        {/* <img src="" alt="offer-imge" /> */}
      </div>
      <TrendyProducts />
      <div className="product-container">
        {productList?.map((product) => (
          <Products value={product} key={product.id} />
        ))}
      </div>
    </main>
  );
};

export default Homepage;
