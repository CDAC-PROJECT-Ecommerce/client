// src/components/Checkout/CheckoutPage.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { updateQuantity, removeItem } from "../../store/slice/CartSlice";
import "./CheckoutPage.css";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Cart, taxRate, deliveryCharge } = useSelector((state) => state.cart);
  const { defaultAddress, addresses, selectedAddressId } = useSelector(
    (state) => state.address
  );

  // Get the selected address (either from saved addresses or default)
  const selectedAddress =
    selectedAddressId === defaultAddress.id
      ? defaultAddress
      : addresses.find((addr) => addr.id === selectedAddressId) ||
        defaultAddress;

  // Calculate totals
  const subtotal = Cart.reduce((total, item) => total + item.price, 0);
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount + deliveryCharge;

  const handleCheckout = async () => {
    const orderId = "AWUYXJJ2";
    navigate(`/admin/ordersummary/${orderId}`);
  };

  const handleChangeAddress = () => {
    navigate("/addAdress");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Review your order and complete your purchase</p>
      </div>

      <div className="checkout-content">
        {/* Left Side - Product List */}
        <div className="checkout-left">
          {/* Delivery Address */}
          <div className="checkout-card">
            <h2 className="checkout-card-title">Delivery Address</h2>
            <div className="address-display">
              <div className="address-info">
                <h4>{selectedAddress.name}</h4>
                <p>{selectedAddress.address}</p>
                <p>
                  {selectedAddress.city}, {selectedAddress.state} -{" "}
                  {selectedAddress.pincode}
                </p>
                <p>Phone: {selectedAddress.phone}</p>
              </div>
              <button
                className="checkout-btn checkout-change-adress proceed-btn-secondary"
                onClick={handleChangeAddress}
              >
                Change Address
              </button>
            </div>
          </div>
          <div className="checkout-card">
            <h2 className="checkout-card-title">
              Order Content ({Cart.length} items)
            </h2>

            {Cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <button
                  className="proceed-btn proceed-btn-primary"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="products-list">
                {Cart.map((item) => (
                  <div key={item.id} className="product-item">
                    <div className="product-image">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="product-details">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>

                    <div className="item-total">
                      ₹{item.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Order Total */}
        <div className="checkout-right">
          <div className="checkout-card order-summary-card">
            <h2 className="checkout-card-title">Payment Summary</h2>

            <div className="summary-row">
              <span>Subtotal ({Cart.length} items)</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Tax (GST {taxRate * 100}%)</span>
              <span>₹{taxAmount.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charges</span>
              <span>₹{deliveryCharge}</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row total-row">
              <span>Total Amount</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>

            <div className="checkout-actions">
              <button
                className="proceed-btn proceed-btn-primary checkout-btn"
                onClick={handleCheckout}
                disabled={Cart.length === 0}
              >
                Proceed to Payment
              </button>

              <div className="payment-methods">
                <p>We accept:</p>
                <div className="payment-icons">
                  <span>💳 Cards</span>
                  <span>📱 UPI</span>
                  <span>💰 Wallets</span>
                  <span>🏦 Net Banking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Offers Section
          <div className="card offers-card">
            <h3>Available Offers</h3>
            <div className="offer-item">
              <span className="offer-badge">SAVE10</span>
              <span>Get 10% off on orders above ₹2000</span>
            </div>
            <div className="offer-item">
              <span className="offer-badge">FREEDEL</span>
              <span>Free delivery on orders above ₹500</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
