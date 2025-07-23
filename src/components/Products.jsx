import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFullProduct } from "../store/slice/ProductSlice";
import { addToCart } from "../store/slice/CartSlice";

const Products = (props) => {
  const { name, price, id } = props.value;
  // const [isFullDisplay,setIsFullDi
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
      <img src="/wirelessmouse.jpg" alt="product-image" />
      <p className="product-name">{name}</p>
      <p className="product-price">₹ {price}</p>
      <button onClick={(e) => addProduct(e)}>Add to Cart</button>
    </div>
  );
};

export default Products;
