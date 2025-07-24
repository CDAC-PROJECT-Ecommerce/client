import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
  loadJsonProducts,
} from "../../../store/slice/ProductSlice";
import DeleteConfirmModal from "../../pages/deleteproduct/DeleteConfirmModal";
import "./ViewProduct.css";
import { useNavigate } from "react-router-dom";
import "./ViewProduct.css";

const ViewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Fetch products on mount
  useEffect(() => {
    dispatch(loadJsonProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products.jsonProducts);
  console.log(products);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(selectedId));
    closeModal();
  };

  return (
    <div className="view-product">
      <h2>All Products</h2>

      <div className="product-table">
        <div className="product-header">
          <div>ID</div>
          <div>Name</div>
          <div>Price</div>
          <div>Category</div>
          <div>Image</div>
          <div>Description</div>
          <div>Actions</div>
        </div>

        {products.length > 0 ? (
          products.map((p) => (
            <div className="product-row" key={p.id}>
              <div>{p.id}</div>
              <div>{p.name}</div>
              <div>₹{p.price}</div>
              <div>{p.category || "-"}</div>
              <div>
                <img
                  src={p.image || "https://via.placeholder.com/50"}
                  alt={p.name}
                  className="product-img"
                />
              </div>
              <div>{p.description || "-"}</div>
              <div className="product-actions">
                <button
                  className="btn btn-update"
                  onClick={() => navigate(`/admin/updateproduct/${p.id}`)}
                >
                  Update
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => openModal(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <DeleteConfirmModal
        show={showModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ViewProduct;
