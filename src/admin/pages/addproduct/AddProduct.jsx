import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddCategoryModal from "../addcategory/AddCategoryModal";
import "./AddProduct.css";
import toast from "react-hot-toast";
import {
  addProduct,
  fetchCategories,
} from "../../../store/slice/AdminProductSlice";
import { BounceLoader } from "react-spinners";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.adminProducts);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { name, price, category, image, description } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Please upload image below 5 mb");
      return;
    }
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !image || !category || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      category,
      image,
      description,
    };

    dispatch(addProduct(newProduct));
    setFormData({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    });
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      {loading && (
        <div className="page-loader-wrapper">
          <div className="page-loader-background"></div>
          <BounceLoader color="#009688" />
          <p className="page-loader-text">Adding product...</p>
        </div>
      )}
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
              <select
                id="category"
                name="category"
                value={category}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="update-btn small-category-btn"
                onClick={() => setIsModalOpen(true)}
              >
                Add Category
              </button>
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
            />
            {image && (
              <img
                src={preview}
                alt="Preview"
                className="image-preview"
                loading="eager"
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
    </>
  );
};

export default AddProduct;
