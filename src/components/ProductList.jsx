import Products from "./Products";
import "../scss/productlist.scss";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { fetchProducts, sortBy } from "../store/slice/ProductSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const [sortValue, setSortValue] = useState("");

  const productList = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(sortBy(sortValue));
  }, [sortValue]);
=======
import { useEffect } from "react";
import { fetchProducts } from "../store/slice/ProductSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.products);

>>>>>>> 7790dde (Admin Panel)
  return (
    <div className="product-list-container">
      <div className="filter-box-container">
        <p>Filter</p>
<<<<<<< HEAD
        {/* <div className="price-comparison">
          <div>
            <input type="number" placeholder="min" />
            <input type="number" placeholder="max" value={maxValue} />
          </div>
          <button>Filter</button>
        </div> */}

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

        <div className="sort-by-container">
          <p style={{ marginTop: "1rem" }}>Sort by</p>
          <select
            className="sortbybox"
            onChange={(e) => setSortValue(e.target.value)}
          >
            <option value="">Select option</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
            <option value="review">Review</option>
          </select>
=======
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
>>>>>>> 7790dde (Admin Panel)
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
