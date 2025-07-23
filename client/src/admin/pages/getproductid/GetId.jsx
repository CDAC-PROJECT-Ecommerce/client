import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetId.css";

const GetId = () => {
  const [productId, setProductId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId.trim()) {
      navigate(`/updateproduct/${productId}`);
    }
  };

  return (
    <div className="get-id-container">
      <h2>Enter Product ID to Edit</h2>
      <form className="get-id-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product-id">Product ID</label>
          <input
            id="product-id"
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="e.g. P001"
            required
          />
        </div>
        <button type="submit" className="summary-btn">
          Edit
        </button>
      </form>
    </div>
  );
};

export default GetId;
