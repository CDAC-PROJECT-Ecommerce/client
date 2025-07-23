import Products from "./Products";
import "../scss/productlist.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/slice/ProductSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.products);

  return (
    <div className="product-list-container">
      <div className="filter-box-container">
        <p>Filter</p>
        <div className="price-comparison">
          <div>
            <input type="number" placeholder="min" />
            <input type="number" placeholder="max" />
          </div>
          <button>Filter</button>
        </div>

        <div className="filter-box">
          <input type="checkbox" />
          <label>Filter no 1</label>
        </div>
        <div className="filter-box">
          <input type="checkbox" />
          <label>Filter no 1</label>
        </div>
        <div className="filter-box">
          <input type="checkbox" />
          <label>Filter no 1</label>
        </div>
        <div className="filter-box">
          <input type="checkbox" />
          <label>Filter no 1</label>
        </div>
        <div className="filter-box">
          <input type="checkbox" />
          <label>Filter no 1</label>
        </div>
        <div className="filter-box">
          <input type="checkbox" />
          <label>Filter no 1</label>
        </div>
      </div>

      <div className="product-list">
        {productList?.products.map((product) => (
          <Products value={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
