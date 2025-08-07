import React, { useEffect, useState } from "react";
import DeleteConfirmModal from "../../pages/deleteproduct/DeleteConfirmModal";
import { useNavigate } from "react-router-dom";
import "./ViewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProducts,
} from "../../../store/slice/AdminProductSlice";

const ViewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.adminProducts.items);
  const loading = useSelector((state) => state.adminProducts.loading);

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

  const confirmDelete = async () => {
    // You must have deleteProduct thunk created and handled in Redux
    await dispatch(deleteProduct(selectedId));
    dispatch(getAllProducts());
    closeModal();
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="view-product">
      <h2>All Products</h2>

      {loading ? (
        <p>Loading Products...</p>
      ) : (
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

          {products?.length > 0 ? (
            products.map((p) => (
              <div className="product-row" key={p.id}>
                <div>{p.id}</div>
                <div>{p.name}</div>
                <div>₹{p.price}</div>
                <div>{p.category?.name || "-"}</div>
                <div>
                  <img
                    src={p.imageUrl || "https://via.placeholder.com/50"}
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
      )}

      <DeleteConfirmModal
        show={showModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ViewProduct;
