// src/pages/MyCart.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import PriceDetails from "./PriceDetails";
import "./MyCart.css";
import { fetchCart } from "../../store/slice/CartSlice";

const MyCart = () => {
  const cartItems = useSelector((state) => state.cart.Cart);
  const { userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userToken !== null) {
      dispatch(fetchCart());
    }
  }, [userToken]);
  return (
    <div className="mycart-page">
      <div className="cart-header">
        <h1>My Cart</h1>
        <button className="address-btn">Delivery Address</button>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))
          )}
        </div>
        <PriceDetails />
      </div>
    </div>
  );
};

export default MyCart;
