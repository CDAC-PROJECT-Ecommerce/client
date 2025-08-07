import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ORDER_STATUS_STEPS } from "../../constants/orderStatus";
import "./OrderSummary.css";

const OrderSummary = () => {
  const { items: orders } = useSelector((state) => state.adminOrders);
  const { orderId } = useParams();
  const order = orders.find((o) => o.orderId == orderId);
  console.log(order);
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
            <span>Order ID:</span> {order?.orderId}
          </div>
          <div>
            <span>Customer:</span> {order?.address.name}
          </div>
          <div className="split-box">
            <span>Product:</span>{" "}
            {order?.items.map((item) => (
              <div className="divider">
                {" "}
                <p>{item.productName}</p>
                <p>x{item.quantity}</p>
              </div>
            ))}
          </div>
          <div>
            <span>Total:</span> ₹{order?.totalAmount}
          </div>
          <div>
            <span>OrderDate:</span> ₹
            {order.orderDate.split("T")[0].split("-").reverse().join("-")}
          </div>
          <div className="split-box">
            <span>Address:</span>
            <p style={{ textAlign: "left" }}>
              {" "}
              {order?.address.name}, {order?.address.address},
              {order?.address.city},{order?.address.state},
              {order?.address.pincode},{order?.address.phone}
            </p>
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
