import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../store/slice/ProductSlice";
import AddCategoryModal from "../addcategory/AddCategoryModal";
import "./AddProduct.css";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.products.categories);
  const allProducts = useSelector((state) => state.products.items);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { name, price, category, image, description } = formData;

  useEffect(() => {
    if (category.trim()) {
      const filtered = categories.filter((cat) =>
        cat.toLowerCase().includes(category.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [category, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSuggestionSelect = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !category || !image || !description) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    const newProduct = {
      id: allProducts.length
        ? Math.max(...allProducts.map((p) => p.id)) + 1
        : 1,
      name,
      price: parseFloat(price),
      category,
      image,
      description,
      review: 0,
      quantity: 1,
    };

    dispatch(addProduct(newProduct));
    alert("✅ Product added successfully!");
    navigate("/admin/viewproduct");
  };

  return (
    <div className="add-order-container">
      <h2>Add New Product</h2>
      <form className="add-order-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <div className="category-input-wrapper">
            <input
              id="category"
              name="category"
              type="text"
              value={category}
              onChange={handleChange}
              placeholder="Search or enter category"
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              autoComplete="off"
              required
            />
            <button
              type="button"
              className="update-btn small-category-btn"
              onClick={() => setIsModalOpen(true)}
              title="Add Category"
            >
              Add Category
            </button>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="category-suggestions">
                {suggestions.map((cat, idx) => (
                  <li key={idx} onClick={() => handleSuggestionSelect(cat)}>
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="image-preview"
              loading="lazy"
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>

      {isModalOpen && (
        <AddCategoryModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default AddProduct;
