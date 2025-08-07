import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateProduct.css";
import {
  getAllProducts,
  getProductById,
  updateProduct,
} from "../../../store/slice/AdminProductSlice";
import { BounceLoader } from "react-spinners";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");

  const { fullProduct, loading } = useSelector((state) => state.adminProducts);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

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

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...formData,
      price: parseFloat(formData.price),
    };

    await dispatch(updateProduct(updatedProduct));
    await dispatch(getAllProducts());
    navigate("/admin/viewproduct");
  };

  return (
    <>
      {loading && (
        <div className="page-loader-wrapper">
          <div className="page-loader-background"></div>
          <BounceLoader color="#009688" />
          <p className="page-loader-text">Updating product data...</p>
        </div>
      )}
      <div className="update-product-form">
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <label>ID</label>
          <input name="id" value={formData?.id} readOnly />

          <label>Name</label>
          <input
            name="name"
            value={formData?.name}
            onChange={handleChange}
            required
          />

          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData?.price}
            onChange={handleChange}
            step="0.01"
            required
          />

          {/* <label>Category</label>
        <select
          name="category"
          value={formData?.category}
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
        </select> */}

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
            value={formData?.description}
            onChange={handleChange}
            rows={4}
          />

          <button type="submit" className="btn-save">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
