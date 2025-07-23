import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrdersContext";

const DeleteOrder = () => {
  const { orders, fetchOrders } = useOrders();
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState("");

  const handleDelete = async () => {
    if (!selectedOrder) {
      alert("Please select an order to delete.");
      return;
    }

    if (
      !window.confirm(`Are you sure you want to delete order ${selectedOrder}?`)
    )
      return;

    try {
      const response = await fetch(
        `http://localhost:8080/orders/${selectedOrder}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete order");

      await fetchOrders();
      alert("✅ Order deleted successfully!");
      navigate("/orders");
    } catch (error) {
      alert("❌ Error deleting order: " + error.message);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">❌ Delete Order</h2>

      <div className="card p-4 shadow-sm">
        <label className="form-label mb-2">Select Order ID to Delete</label>
        <select
          className="form-select mb-3"
          value={selectedOrder}
          onChange={(e) => setSelectedOrder(e.target.value)}
        >
          <option value="">-- Choose an Order ID --</option>
          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.id} | {order.user} | {order.product}
            </option>
          ))}
        </select>

        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Selected Order
        </button>
      </div>
    </div>
  );
};

export default DeleteOrder;
