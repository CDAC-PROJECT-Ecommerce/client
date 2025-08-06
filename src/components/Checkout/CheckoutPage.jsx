// src/components/Checkout/CheckoutPage.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { updateQuantity, removeItem } from "../../store/slice/CartSlice";
import "./CheckoutPage.css";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../store/slice/CartSlice";
import {
  fetchAddress,
  setDefaultAddress,
} from "../../store/slice/addressSlice";
import { initiatePayment, placeOrder } from "../../store/slice/UserOrderSlice";
import toast from "react-hot-toast";
import { api } from "../../services/api";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Cart, taxRate, deliveryCharge } = useSelector((state) => state.cart);
  const { defaultAddress, addresses, selectedAddressId } = useSelector(
    (state) => state.address
  );
  const token = useSelector((state) => state.user.userToken);
  // Get the selected address (either from saved addresses or default)
  const selectedAddress =
    selectedAddressId === defaultAddress?.id
      ? defaultAddress
      : addresses.find((addr) => addr.id === selectedAddressId) ||
        defaultAddress;

  // Calculate totals
  const subtotal = Cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount + deliveryCharge;

  const handleCheckout = async () => {
    const items = Cart?.map(({ productId, quantity }) => ({
      productId,
      quantity,
    }));
    const data = {
      addressId: selectedAddressId,
      totalAmount: grandTotal?.toFixed(2),
      items,
    };
    const response = await dispatch(initiatePayment(data));
    // if (response.meta.requestStatus === "fulfilled") {
    //   navigate("/orderplaced");
    // }

    if (response.type === "order/initiatePayment/fulfilled") {
      const { razorpay, order } = response.payload;

      const options = {
        key: "rzp_test_l7Q7HVqRLk6SQW",
        amount: order.totalAmount * 100,
        currency: "INR",
        name: "Shopee",
        order_id: razorpay.orderId,
        handler: async function (response) {
          await api.post(
            "/api/payment/verify",
            {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              orderId: order.orderId,
            },
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            }
          );
          toast.success("Payment successfull");
          navigate("/orderplaced?status=success");
        },
        prefill: {
          name: "Demo",
          email: "Demoemail",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", async function (response) {
        toast.error("Payment failed");

        await api.post(
          "/api/payment/failure",
          {
            orderId: order.orderId,
            reason: response.error.description,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        navigate("/orderplaced?status=failure");
      });
    }
  };

  const handleChangeAddress = () => {
    navigate("/addAdress");
  };

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchAddress());
  }, []);

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
            {addresses.length > 0 ? (
              <div className="address-display">
                <div className="address-info">
                  <h4>{selectedAddress?.name}</h4>
                  <p>{selectedAddress?.address}</p>
                  <p>
                    {selectedAddress?.city}, {selectedAddress?.state} -{" "}
                    {selectedAddress?.pincode}
                  </p>
                  <p>Phone: {selectedAddress?.phone}</p>
                </div>
                <button
                  className="checkout-btn checkout-change-adress proceed-btn-secondary"
                  onClick={handleChangeAddress}
                >
                  Change Address
                </button>
              </div>
            ) : (
              <button
                style={{ margin: "1rem" }}
                className="proceed-btn proceed-btn-secondary add-address-btn"
                onClick={() => navigate("/addAdress")}
              >
                + Add New Address
              </button>
            )}
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
                  <div key={item.productId} className="product-item">
                    <div className="product-image">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="product-details">
                      <h3>{item.productName}</h3>
                      <p> x {item.quantity}</p>
                    </div>

                    <div className="item-total">
                      ₹{(item.price * item.quantity).toFixed(2)}
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
              <span>₹{grandTotal.toFixed(2)}</span>
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
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
