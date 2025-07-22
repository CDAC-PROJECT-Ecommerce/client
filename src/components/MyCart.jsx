import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { increment, decrement, removeFromCart } from "../store/slice/CartSlice";
import "../css/MyCart.scss";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function MyCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.Cart);
  const products = useSelector((state) => state.products.allProducts);

  console.log(cartItems);
  const handleIncrement = (id) => {
    dispatch(increment(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrement(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0.0
  );

  const totalItemQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2> My Cart</h2>
      {cartItems?.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/">Continue Shopping</Link>
        </div>
      ) : (
        <div className="addtocart-container">
          <div className="cartList">
            {cartItems.map((item) => (
              <div key={item.id} className="cartItem">
                {/* <div className="detailsSection"> */}
                <img
                  src={"/wirelessmouse.jpg"}
                  alt={item.name}
                  className="productImage"
                />
                {/* <div className="textInfo"> */}
                <h4>{item.name}</h4>
                {/* <p>Price: ₹{item.price}</p> */}
                <div className="qty">
                  <div className="quantityControls ">
                    <button onClick={() => handleDecrement(item.id)}>-</button>
                    <span className="qty">{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.id)}>+</button>
                  </div>
                </div>
                <p className="subtotal">
                  {" "}
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="removeBtn"
                >
                  <MdDeleteForever />
                </button>
                {/* </div> */}
                {/* </div> */}
              </div>
            ))}
          </div>

          <div className="totalSection">
            <h4 style={{ margin: 0 }}>Total Items: {totalItemQuantity}</h4>
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <button onClick={handleCheckout} className="checkoutBtn">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
