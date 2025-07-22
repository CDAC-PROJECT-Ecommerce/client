import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addAddress,
  selectAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../store/slice/addressSlice";
import AddressForm from "./AddressForm";
import "./AddAddressPage.css";
import { useNavigate } from "react-router-dom";

const AddAddressPage = ({ onNavigateToCheckout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { defaultAddress, addresses, selectedAddressId, status, error } =
    useSelector((state) => state.address);
  const [showAddForm, setShowAddForm] = useState(false);
  console.log(defaultAddress);
  const handleAddAddress = async (addressData) => {
    const newAddressId = Date.now();
    const newAddress = { ...addressData, id: newAddressId };
    await dispatch(addAddress(newAddress));
    dispatch(selectAddress(newAddressId)); // Auto-select the new address
    setShowAddForm(false);

    if (onNavigateToCheckout) {
      onNavigateToCheckout();
    }
  };

  const handleSelectAddress = (addressId) => {
    dispatch(selectAddress(addressId));
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteAddress(addressId));
    }
  };

  const handleSetDefault = (addressId) => {
    dispatch(setDefaultAddress(addressId));
  };

  const handleSubmit = () => {
    if (onNavigateToCheckout) {
      onNavigateToCheckout();
    }
    navigate("/cart");
  };

  const allAddresses = [defaultAddress, ...addresses];

  return (
    <div className="address-container">
      <div className="address-header">
        <h1>Select Delivery Address</h1>
        <p>Choose where you want your order delivered</p>
      </div>

      <div className="address-content">
        <div className="card address-section">
          <h2 className="card-title">Default Address</h2>

          <div className="address-item default-address">
            <div className="address-radio">
              <input
                type="radio"
                id="default-address"
                name="selectedAddress"
                value={defaultAddress?.id}
                checked={selectedAddressId === defaultAddress?.id}
                onChange={() => handleSelectAddress(defaultAddress?.id)}
              />
              <label htmlFor="default-address"></label>
            </div>

            <div className="address-details">
              <div className="address-header-info">
                <h3>{defaultAddress?.name}</h3>
                <span className="default-badge">Default</span>
              </div>
              <p className="address-text">
                {defaultAddress?.address}
                <br />
                {defaultAddress?.city}, {defaultAddress?.state} -{" "}
                {defaultAddress?.pincode}
                <br />
                Phone: {defaultAddress?.phone}
              </p>
            </div>
          </div>
        </div>

        {addresses?.length > 0 && (
          <div className="card address-section">
            <h2 className="card-title">Saved Addresses</h2>
            {addresses.map((address) => (
              <div key={address.id} className="address-item">
                <div className="address-radio">
                  <input
                    type="radio"
                    id={`address-${address.id}`}
                    name="selectedAddress"
                    value={address.id}
                    checked={selectedAddressId === address.id}
                    onChange={() => handleSelectAddress(address.id)}
                  />
                  <label htmlFor={`address-${address.id}`}></label>
                </div>

                <div className="address-details">
                  <div className="address-header-info">
                    <h3>{address.name}</h3>
                  </div>
                  <p className="address-text">
                    {address.address}
                    <br />
                    {address.city}, {address.state} - {address.pincode}
                    <br />
                    Phone: {address.phone}
                  </p>
                </div>

                <div className="address-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </button>
                  <button
                    className="btn btn-danger delete-btn"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="card address-section">
          {!showAddForm ? (
            <div className="add-address-prompt">
              <h3>Need to deliver somewhere else?</h3>
              <button
                className="btn btn-secondary add-address-btn"
                onClick={() => setShowAddForm(true)}
              >
                + Add New Address
              </button>
            </div>
          ) : (
            <div className="add-address-form">
              <h2 className="card-title">Add New Address</h2>
              <AddressForm
                onSubmit={handleAddAddress}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}
        </div>

        <div className="address-submit">
          <button
            className="btn btn-primary submit-btn"
            onClick={handleSubmit}
            disabled={!selectedAddressId}
          >
            Deliver to This Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressPage;
