// src/admin/pages/dashboard/DashboardSummary.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../../store/slice/OrdersSlice";
import { Link } from "react-router-dom";
import { ORDER_STATUS_STEPS } from "../../constants/orderStatus";
import "./DashboardSummary.css";

const DashboardSummary = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const countOrdersWithStatus = (status) =>
    orders?.filter((o) => o.status === status).length || 0;

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error}</p>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard Summary</h2>
      <div className="summary-grid">
        <div className="summary-card active">
          <h5>Total Orders</h5>
          <p>{orders.length}</p>
          <Link to="/admin/orders" className="btn-sm">
            View All
          </Link>
        </div>

        {ORDER_STATUS_STEPS.map((status) => (
          <div className="summary-card" key={status}>
            <h5>{status}</h5>
            <p>{countOrdersWithStatus(status)}</p>
            <Link
              to={`/admin/orders?status=${encodeURIComponent(status)}`}
              className="btn-sm"
            >
              View All
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSummary;
