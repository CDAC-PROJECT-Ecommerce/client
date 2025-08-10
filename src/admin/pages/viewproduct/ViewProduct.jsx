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
  const [searchByName, setSearchByName] = useState("");
  const [searchByCategory, setSearchByCategory] = useState("");

  const openModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const confirmDelete = async () => {
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
          <div className="product-search-container">
            <div>
              <p>Search by name:</p>
              <input
                type="text"
                placeholder="Search products"
                onChange={(e) => setSearchByName(e.target.value)}
              />
            </div>
            <div>
              <p>Search by category:</p>
              <input
                type="text"
                placeholder="Search category"
                onChange={(e) => setSearchByCategory(e.target.value)}
              />
            </div>
          </div>
          <div className="product-header">
            <div>ID</div>
            <div>Image</div>
            <div>Name</div>
            <div>Price</div>
            <div>Category</div>
            <div>Description</div>
            <div>Actions</div>
          </div>

          {products?.length > 0 ? (
            products
              ?.filter((item) => {
                if (searchByName === "") {
                  return true;
                } else if (
                  searchByName !== "" &&
                  item.name.toLowerCase().includes(searchByName.toLowerCase())
                ) {
                  return true;
                }
              })
              ?.filter((item) => {
                if (searchByCategory === "") {
                  return true;
                } else if (
                  searchByCategory !== "" &&
                  item.category.name
                    .toLowerCase()
                    .includes(searchByCategory.toLowerCase())
                ) {
                  return true;
                }
              })
              .map((p) => (
                <div className="product-row" key={p.id}>
                  <div>{p.id}</div>
                  <div>
                    <img
                      src={p.imageUrl || "https://via.placeholder.com/50"}
                      alt={p.name}
                      className="product-img"
                    />
                  </div>
                  <div>{p.name}</div>
                  <div>₹{p.price}</div>
                  <div>{p.category?.name || "-"}</div>

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
