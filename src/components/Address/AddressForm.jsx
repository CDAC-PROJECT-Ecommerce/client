import React, { useState } from "react";
import "./AddressForm.css";

const AddressForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[+91]?[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
  ];

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      {/* Personal Information */}
      <div className="form-section">
        <h3 className="section-title">Personal Information</h3>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? "error" : ""}`}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input ${errors.phone ? "error" : ""}`}
              placeholder="+91 98765 43210"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Pincode *</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={`form-input ${errors.pincode ? "error" : ""}`}
              placeholder="411001"
              maxLength="6"
            />
            {errors.pincode && (
              <span className="error-text">{errors.pincode}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Alternate Phone</label>
            <input
              type="tel"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleChange}
              className="form-input"
              placeholder="+91 98765 43210 (Optional)"
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="form-section">
        <h3 className="section-title">Address Information</h3>

        <div className="form-group">
          <label className="form-label">Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`form-input address-textarea ${
              errors.address ? "error" : ""
            }`}
            placeholder="House No, Building Name, Road Name, Area"
            rows="3"
          />
          {errors.address && (
            <span className="error-text">{errors.address}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Landmark (Optional)</label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="form-input"
            placeholder="Near Metro Station, Mall, etc."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`form-input ${errors.city ? "error" : ""}`}
              placeholder="Pune"
            />
            {errors.city && <span className="error-text">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">State *</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`form-input ${errors.state ? "error" : ""}`}
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <span className="error-text">{errors.state}</span>}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary save-btn">
          Save Address
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
