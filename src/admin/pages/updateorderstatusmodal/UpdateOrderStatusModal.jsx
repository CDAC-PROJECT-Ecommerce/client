import React, { useState, useEffect } from "react";
import "./UpdateOrderStatusModal.css";
import { useDispatch } from "react-redux";
import { updateOrderLocally } from "../../../store/slice/OrdersSlice";
import { ORDER_STATUS_STEPS } from "../../constants/orderStatus";
import { useNavigate } from "react-router-dom";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../../store/slice/AdminOrderSlice";

const UpdateOrderStatusModal = ({ selectedOrder, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newStatus, setNewStatus] = useState(selectedOrder.status);

  const handleSubmit = async () => {
    const updatedOrder = { orderId: selectedOrder.id, status: newStatus };
    await dispatch(updateOrderStatus(updatedOrder));
    dispatch(fetchAllOrders());
    onClose();
    navigate("");
  };

  return (
    <div className="update-modal-overlay">
      <div className="update-modal-content">
        <h3>Update Status - {selectedOrder.id}</h3>

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
