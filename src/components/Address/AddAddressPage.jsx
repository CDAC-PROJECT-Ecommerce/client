import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addAddress,
  selectAddress,
  deleteAddress,
  setDefaultAddress,
  fetchAddress,
} from "../../store/slice/addressSlice";
import AddressForm from "./AddressForm";
import "./AddAddressPage.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddAddressPage = ({ onNavigateToCheckout }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { defaultAddress, addresses, selectedAddressId } = useSelector(
    (state) => state.address
  );

  const handleAddAddress = async (addressData) => {
    try {
      dispatch(addAddress(addressData));
      setShowAddForm(false);
      navigate("/checkout");
    } catch (error) {
      toast.error("Error adding address:", error);
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
    navigate("/checkout");
  };

  const nonDefaultAddresses = addresses.filter(
    (addr) => addr.id !== defaultAddress?.id
  );

  useEffect(() => {
    dispatch(fetchAddress());
  }, []);

  return (
    <div className="address-container">
      <div className="address-header">
        <h1>Select Delivery Address</h1>
        <p>Choose where you want your order delivered</p>
      </div>

      <div className="address-content">
        {defaultAddress && (
          <div className="checkout-card address-section">
            <h2 className="checkout-card-title">Default Address</h2>

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
        )}

        {nonDefaultAddresses?.length > 0 && (
          <div className="checkout-card address-section">
            <h2 className="checkout-card-title">Saved Addresses</h2>
            {nonDefaultAddresses.map((address) => (
              <div key={address.id} className="address-item">
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
                    className="checkout-btn address-proceed proceed-btn-primary"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Deliver here
                  </button>
                  <button
                    className="checkout-btn proceed-btn-danger delete-btn"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="checkout-card address-section">
          {!showAddForm ? (
            <div className="add-address-prompt">
              <h3>Need to deliver somewhere else?</h3>
              <button
                className="proceed-btn proceed-btn-secondary add-address-btn"
                onClick={() => setShowAddForm(true)}
              >
                + Add New Address
              </button>
            </div>
          ) : (
            <div className="add-address-form">
              <h2 className="checkout-card-title">Add New Address</h2>
              <AddressForm
                onSubmit={handleAddAddress}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}
        </div>

        <div className="address-submit">
          <button
            className="checkout-btn proceed-btn-primary proceed-submit-btn"
            onClick={() => navigate("/checkout")}
            disabled={!selectedAddressId}
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressPage;
