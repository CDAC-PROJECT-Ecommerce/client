import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AddCategoryModal.css";
import toast from "react-hot-toast"; // use toast instead of alert
import { addCategories } from "../../redux/slices/productsSlice";

const AddCategoryModal = ({ onClose }) => {
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const categories = useSelector((state) => state.products.categories);
  console.log(categories);
  useEffect(() => {
    inputRef.current?.focus();

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = newCategory.trim();

    if (!trimmed) {
      toast.error("Please enter a category name.");
      return;
    }

    const isDuplicate = categories.some(
      (cat) => cat.toLowerCase() === trimmed.toLowerCase()
    );

    if (isDuplicate) {
      toast.error("This category already exists.");
      return;
    }

    try {
      const name = trimmed;
      await dispatch(addCategories(name));
      setNewCategory("");
      onClose();
    } catch (err) {
      console.error("Category add failed:", err);
      // no need to toast again here; already handled in the slice
    }
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
