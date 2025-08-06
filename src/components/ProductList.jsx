import Products from "./Products";
import "../scss/productlist.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchProducts,
  filterByCategory,
  sortBy,
} from "../store/slice/ProductSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const [sortValue, setSortValue] = useState("");
  const [filterList, setFilterList] = useState([]);

  const productList = useSelector((state) => state.products);

  const handleFilterList = (category) => {
    setFilterList((prevItems) =>
      prevItems.includes(category)
        ? prevItems.filter((item) => item !== category)
        : [...prevItems, category]
    );
  };

  useEffect(() => {
    dispatch(filterByCategory(filterList));
  }, [filterList]);

  useEffect(() => {
    dispatch(sortBy(sortValue));
  }, [sortValue]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="product-list-container">
      <div className="filter-box-container">
        <p>Filter</p>
        {productList?.ProductCategories?.map((category) => {
          return (
            <div className="filter-box" key={category}>
              <input
                type="checkbox"
                onClick={() => handleFilterList(category)}
              />
              <label>{category}</label>
            </div>
          );
        })}

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
