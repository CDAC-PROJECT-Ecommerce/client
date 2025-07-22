import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
// import { increment, decrement } from '../store/slice/CartSlice';
import '../css/MyCart.css';
import { MdDeleteForever } from "react-icons/md";
export default function MyCart() {
  const dispatch = useDispatch();
  const cartIds = useSelector((state) => state.cart.Cart);
  const products = useSelector((state) => state.products.allProducts);

  const cartItems = cartIds?.map((id) => {
    const product = products?.find((p) => p.id === id);
    return { ...product, quantity: 1 }; // replace with real quantity logic if you have it
  });

  const handleIncrement = (id) => {
    // dispatch(increment());
    toast.success('Quantity Increased');
  };

  const handleDecrement = (id) => {
    // dispatch(decrement());
    toast.success('Quantity Decreased');
  };

  const handleRemove = (id) => {
    toast.success('Removed from Cart');
    // dispatch a remove action here
  };

  const handleCheckout = () => {
    toast.success('Proceeding to checkout...');
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h2> My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cartList">
            {cartItems.map((item) => (
              <div key={item.id} className="cartItem">
                <div className="detailsSection">
                  <img
                    src={item.image || "/wirelessmouse.jpg"}
                    alt={item.name}
                    className="productImage"
                  />
                  <div className="textInfo">
                    <h4>{item.name}</h4>
                    <p>Price: ₹{item.price}</p>
                    <div className="qty">
                      <div className="quantityControls ">
                        <button onClick={() => handleDecrement(item.id)}>-</button>
                        <span className="qty">{item.quantity}</span>
                        <button onClick={() => handleIncrement(item.id)}>+</button>
                      </div>
                      <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="removeBtn"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="totalSection">
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <button onClick={handleCheckout} className="checkoutBtn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
