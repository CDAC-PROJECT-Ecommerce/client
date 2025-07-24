// src/components/admin/updateproduct/UpdateProduct.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateProduct.css";
import {
  loadJsonProductsById,
  updateProduct,
} from "../../../store/slice/ProductSlice";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fullProduct = useSelector((state) => state.products.jsonProductsById);
  const categories = useSelector((state) => state.products.categories);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    image: "", // store image file or URL
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    dispatch(loadJsonProductsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (fullProduct) {
      setFormData({
        id: fullProduct.id || "",
        name: fullProduct.name || "",
        price: fullProduct.price || "",
        category: fullProduct.category || "",
        description: fullProduct.description || "",
        image: fullProduct.image || "",
      });
      setImagePreview(fullProduct.image || "");
    }
  }, [fullProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...formData,
      price: parseFloat(formData.price),
      image: imagePreview, // Using preview URL or existing image
    };

    dispatch(updateProduct(updatedProduct));
    navigate("/admin/viewproduct");
  };

  return (
    <div className="update-product-form">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <label>ID</label>
        <input name="id" value={formData.id} readOnly />

        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Price (₹)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {categories &&
            categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
        </select>

        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ width: "150px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit" className="btn-save">
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
