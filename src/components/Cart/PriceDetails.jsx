// src/components/PriceDetails.js
import React from "react";
import { useSelector } from "react-redux";
import "./PriceDetails.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PriceDetails = () => {
  const cartItems = useSelector((state) => state.cart.Cart);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    } else {
      toast.dismiss();
      toast.error("Cart is empty");
    }
  };

  return (
    <div className="price-details-order">
      <div className="price-details">
        <h2>Price Details</h2>
        <hr />
        {cartItems.map((item) => (
          <div key={item.productId} className="price-row">
            <span>
              {item.productName} × {item.quantity}
            </span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <div className="total">
          <strong>Total</strong>
          <strong>₹{total.toFixed(2)}</strong>
        </div>
      </div>
      <div>
        <button onClick={handleCheckout} className="place-order">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PriceDetails;
