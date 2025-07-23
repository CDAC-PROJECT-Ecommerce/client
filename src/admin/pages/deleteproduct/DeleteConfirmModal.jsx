import React from "react";
import "./DeleteConfirmModal.css";

const DeleteConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this product?</p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
