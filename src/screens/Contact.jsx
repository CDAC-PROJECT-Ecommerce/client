// src/pages/Contact.jsx
import React, { useState } from "react";
import "../scss/Contact.scss";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been sent to the seller.");
    setFormData({ name: "", phone: "", description: "" });
  };

  return (
    <div className="contact-page">
      <section className="contact-content">
        <div className="container">
          <div className="contact-form-box">
            <h2>Got a question or issue? Reach out to the seller directly.</h2>
            <form onSubmit={handleSubmit} className="styled-form">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Contact Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
