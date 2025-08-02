import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFullProduct } from "../store/slice/ProductSlice";
import { addToCart } from "../store/slice/CartSlice";
import { FaRegStar } from "react-icons/fa6";

const Products = (props) => {
  const { name, price, id, review, category } = props.value;
  console.log(props.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openFullPageProduct = (e) => {
    dispatch(fetchFullProduct(id));
    navigate(`/fullPageProduct`);
  };

  const addProduct = (e) => {
    e.stopPropagation();
    dispatch(addToCart(id));
  };

  return (
    <div className="product-box" onClick={openFullPageProduct}>
      <img
        src={
          category === "Women"
            ? "/womenclothing.jpg"
            : category === "Baby"
            ? "/babyclothing.jpg"
            : "/wirelessmouse.jpg"
        }
        alt="product-image"
      />
      <p className="product-name">{name}</p>
      <div className="product-price-review-box">
        <p className="product-review">
          <FaRegStar className="review-star" />
          {review}
        </p>
        <p className="product-price">₹ {price}</p>
      </div>

      <button onClick={(e) => addProduct(e)}>Add to Cart</button>
    </div>
  );
};

export default Products;
