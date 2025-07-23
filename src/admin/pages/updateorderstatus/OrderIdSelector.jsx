import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrdersContext";
import "./OrderIdSelector.css"; // External CSS for styling

const OrderIdSelector = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState("");

  const handleSelect = (e) => {
    const orderId = e.target.value;
    setSelectedOrder(orderId);
    if (orderId) {
      navigate(`/updateorderstatus/${orderId}`);
    }
  };

  return (
    <div className="order-selector">
      <label htmlFor="order-selector" className="order-selector-label">
        🔎 Select an Order to Update
      </label>
      <select
        id="order-selector"
        className="order-selector-select"
        value={selectedOrder}
        onChange={handleSelect}
      >
        <option value="">-- Choose an Order ID --</option>
        {orders.length === 0 ? (
          <option disabled>No orders available</option>
        ) : (
          orders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.id} - {order.user}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default OrderIdSelector;
