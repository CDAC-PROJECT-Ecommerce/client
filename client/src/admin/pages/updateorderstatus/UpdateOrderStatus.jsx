import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrdersContext";
import { ORDER_STATUS_STEPS } from "../../constants/orderStatus";

const UpdateOrderStatus = () => {
  const { orders, fetchOrders } = useOrders();
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = orders.find((o) => o.id === orderId);

  const [user, setUser] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setUser(order.user);
      setProduct(order.product);
      setPrice(order.price);
      setShipping(order.shipping);
      setStatus(order.status);
    }
  }, [order]);

  const handleUpdate = async () => {
    if (
      user.trim() === "" ||
      product.trim() === "" ||
      status.trim() === "" ||
      price === "" ||
      shipping === ""
    ) {
      alert("All fields are required.");
      return;
    }

    const updatedOrder = {
      user,
      product,
      status,
      shipping: parseFloat(shipping),
      price: parseFloat(price),
    };

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        throw new Error(`Failed to update order. Status: ${response.status}`);
      }

      await fetchOrders(); // Refresh orders from backend
      alert(`✅ Order ${orderId} updated successfully!`);
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return <div className="container my-5">Order not found.</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">🔧 Update Order Details for {orderId}</h2>

      <div className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Price (£)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Shipping (£)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Order Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {ORDER_STATUS_STEPS.map((step) => (
              <option key={step} value={step}>
                {step}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default UpdateOrderStatus;
