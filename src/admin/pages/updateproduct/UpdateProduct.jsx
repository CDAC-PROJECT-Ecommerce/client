// src/components/admin/updateproduct/UpdateProduct.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFullProduct,
  updateProduct,
} from "../../../store/slice/ProductSlice";
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fullProduct = useSelector((state) => state.products.FullProduct);
  const categories = useSelector((state) => state.products.categories);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    dispatch(fetchFullProduct(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (fullProduct) {
      setFormData({
        name: fullProduct.name || "",
        price: fullProduct.price || "",
        category: fullProduct.category || "",
        description: fullProduct.description || "",
        image: fullProduct.image || "",
      });
    }
  }, [fullProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...fullProduct,
      ...formData,
      price: parseFloat(formData.price),
    };
    dispatch(updateProduct(updatedProduct));
    navigate("/admin/viewproduct");
  };

  return (
    <div className="update-product-form">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
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
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />

        <label>Image URL</label>
        <input name="image" value={formData.image} onChange={handleChange} />

        <button type="submit" className="btn-save">
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
