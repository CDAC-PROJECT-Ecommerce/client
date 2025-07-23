import React from 'react';
import { useDispatch } from 'react-redux';
import { increment, decrement, removeFromCart } from '../../store/slice/CartSlice';
import './CartItem.css';
import { RiDeleteBin6Line } from "react-icons/ri";



const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      
      {/* <div className="details"> */}
        <h3>{item.name}</h3>
        {/* <p>{item.spec}</p> */}
        
        <div className="actions">
          <button onClick={() => dispatch(decrement(item.id))}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(increment(item.id))}>+</button>
        </div>
          <span className="price">₹{item.price * item.quantity}</span>
        
        <button className="remove" onClick={() => dispatch(removeFromCart(item.id))}>
          <RiDeleteBin6Line />
        </button>
      
      {/* </div> */}
    </div>
  );
};

export default CartItem;
