import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UpdateOrderStatusModal from "../updateorderstatusmodal/UpdateOrderStatusModal";
import "./ViewAllOrders.css";
import { fetchAllOrders } from "../../../store/slice/AdminOrderSlice";

const ViewAllOrders = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const statusFilter = params.get("status");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { items, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleUpdateClick = (id, status) => {
    setSelectedOrder({ id, status });
    setShowModal(true);
  };

  if (loading) return <p className="loading">Loading orders...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  const filteredItems = statusFilter
    ? items.filter((order) => order.status === statusFilter)
    : items;

  return (
    <div className="order-wrapper">
      <h2>{statusFilter ? `Orders - ${statusFilter}` : "All User Orders"}</h2>

      <div className="order-table">
        <div className="order-header">
          <div>Order ID</div>
          <div>User</div>
          <div>Product</div>
          <div>Price</div>
          <div>OrderDate</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {filteredItems?.length > 0 ? (
          filteredItems.map((order) => (
            <div className="order-row" key={order.orderId}>
              <div data-label="Order ID">{order.orderId}</div>
              <div data-label="User">{order.address.name}</div>
              <div data-label="Product">{order.items[0].productName}</div>
              <div data-label="Price">₹{order.totalAmount}</div>
              <div data-label="OrderDate">
                {order.orderDate.split("T")[0].split("-").reverse().join("-")}
              </div>
              <div data-label="Status">{order.status}</div>
              <div data-label="Actions">
                <Link
                  to={`/admin/ordersummary/${order.orderId}`}
                  className="summary-btn"
                >
                  View
                </Link>
                <button
                  className="summary-btn"
                  onClick={() => handleUpdateClick(order.orderId, order.status)}
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
          selectedOrder={selectedOrder}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ViewAllOrders;
