import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../redux/slices/productsSlice"; // changed slice import
import "./AddCategoryModal.css";

const AddCategoryModal = ({ onClose }) => {
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const categories = useSelector((state) => state.products.categories); // updated path

  useEffect(() => {
    inputRef.current?.focus();

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = newCategory.trim();

    if (!trimmed) {
      alert("Please enter a category name.");
      return;
    }

    if (categories.includes(trimmed)) {
      alert("This category already exists.");
      return;
    }

    dispatch(addCategory(trimmed));
    alert(`Category "${trimmed}" added successfully.`);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h3>Add Category</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            ref={inputRef}
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="e.g. Electronics"
            maxLength="30"
            className="input-field"
            autoCapitalize="words"
          />
          <div className="modal-actions">
            <button type="submit" className="btn">
              Add
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
