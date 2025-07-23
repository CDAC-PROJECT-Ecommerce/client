// src/pages/MyCart.js
import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import PriceDetails from './PriceDetails';
import './MyCart.css';

const MyCart = () => {
  const cartItems = useSelector(state => state.cart.Cart);
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
            cartItems.map(item => <CartItem key={item.id} item={item} />)
          )}
          
        </div>
        <PriceDetails />

      </div>
    </div>
  );
};

export default MyCart;
