// src/components/Footer.jsx
import React from "react";
import "../scss/Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>Shopee</h2>
          <p>
            Your one-stop shop for quality and trendy products, directly from
            our store to your doorstep.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/product_list">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>{" "}
            {/* Updated */}
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>Email: support@shopee.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Pune, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Shopee | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
