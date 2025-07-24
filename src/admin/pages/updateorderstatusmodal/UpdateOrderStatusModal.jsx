import React, { useState, useEffect } from "react";
import "./UpdateOrderStatusModal.css";
import { useDispatch } from "react-redux";
import { updateOrderLocally } from "../../../store/slice/OrdersSlice";
import { ORDER_STATUS_STEPS } from "../../constants/orderStatus";
import { useNavigate } from "react-router-dom";

const UpdateOrderStatusModal = ({ order, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Guard clause to prevent errors
  if (!order) return null;

  const [newStatus, setNewStatus] = useState(order.status);

  const handleSubmit = () => {
    const updatedOrder = {
      ...order,
      status: newStatus,
    };

    dispatch(updateOrderLocally(updatedOrder));
    onClose(); // Close modal
    navigate(""); // ✅ Ensure correct route
  };

  return (
    <div className="update-modal-overlay">
      <div className="update-modal-content">
        <h3>Update Status - {order.id}</h3>

        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          {ORDER_STATUS_STEPS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <div className="modal-buttons">
          <button className="update-btn" onClick={handleSubmit}>
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderStatusModal;
