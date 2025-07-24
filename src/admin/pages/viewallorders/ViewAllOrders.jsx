import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../../store/slice/OrdersSlice";
import { Link, useLocation } from "react-router-dom";
import UpdateOrderStatusModal from "../updateorderstatusmodal/UpdateOrderStatusModal";
import "./ViewAllOrders.css";

const ViewAllOrders = () => {
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector((state) => state.orders);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const statusFilter = params.get("status");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = statusFilter
    ? orders.filter((o) => o.status === statusFilter)
    : orders;

  const handleUpdateClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  if (loading) return <p className="loading">Loading orders...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="order-wrapper">
      <h2>{statusFilter ? `Orders - ${statusFilter}` : "All User Orders"}</h2>

      <div className="order-table">
        <div className="order-header">
          <div>Order ID</div>
          <div>User</div>
          <div>Product</div>
          <div>Price</div>
          <div>Shipping</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div className="order-row" key={order.id}>
              <div data-label="Order ID">{order.id}</div>
              <div data-label="User">{order.user}</div>
              <div data-label="Product">{order.product}</div>
              <div data-label="Price">₹{order.price.toFixed(2)}</div>
              <div data-label="Shipping">₹{order.shipping.toFixed(2)}</div>
              <div data-label="Status">{order.status}</div>
              <div data-label="Actions">
                <Link
                  to={`/admin/ordersummary/${order.id}`}
                  className="summary-btn"
                >
                  View
                </Link>
                <button
                  className="summary-btn"
                  onClick={() => handleUpdateClick(order)}
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-orders">No orders found.</p>
        )}
      </div>

      {showModal && selectedOrder && (
        <UpdateOrderStatusModal
          order={selectedOrder}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ViewAllOrders;
