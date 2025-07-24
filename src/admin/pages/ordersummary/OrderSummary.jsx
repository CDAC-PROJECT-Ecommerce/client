import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ORDER_STATUS_STEPS } from "../../constants/orderStatus";
import "./OrderSummary.css";

const OrderSummary = () => {
  const { orders = [] } = useSelector((state) => state.orders);
  const { orderId } = useParams();
  const order = orders.find((o) => o.id === orderId);

  const getStepStatus = (step) => {
    const stepIndex = ORDER_STATUS_STEPS.indexOf(step);
    const orderIndex = ORDER_STATUS_STEPS.indexOf(order?.status);
    return stepIndex <= orderIndex ? "active" : "";
  };

  if (!order) {
    return (
      <div className="order-summary-container">
        <div className="summary-card">
          <h2>Order Not Found</h2>
          <p>
            No order with ID: <strong>{orderId}</strong>
          </p>
        </div>
      </div>
    );
  }

  const total = order.price + order.shipping;

  return (
    <div className="order-summary-container">
      <div className="summary-card">
        <h2>Order Summary</h2>

        <div className="summary-details">
          <div>
            <span>Order ID:</span> {order.id}
          </div>
          <div>
            <span>Customer:</span> {order.user}
          </div>
          <div>
            <span>Product:</span> {order.product}
          </div>
          <div>
            <span>Price:</span> ₹{order.price.toFixed(2)}
          </div>
          <div>
            <span>Shipping:</span> ₹{order.shipping.toFixed(2)}
          </div>
          <div className="total">
            <span>Total:</span> ₹{total.toFixed(2)}
          </div>
        </div>

        <div className="tracking-section">
          <h4>Tracking</h4>
          <div className="tracking-line">
            {ORDER_STATUS_STEPS.map((step, i) => (
              <div key={i} className={`step ${getStepStatus(step)}`}>
                <div className="dot" />
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
