// src/pages/AboutUs.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../scss/AboutUs.scss";

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About Shopee</h1>
          <p className="hero-subtitle">
            Your trusted partner in quality shopping since day one
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-content">
        <div className="about-container">
          {/* Our Story */}
          <div className="content-section">
            <h2>Our Story</h2>
            <p>
              Founded with a passion for bringing quality products directly to
              your doorstep, Shopee has grown from a small local business to a
              trusted online destination. We believe that everyone deserves
              access to premium products at fair prices, backed by exceptional
              customer service.
            </p>
            <p>
              What started as a vision to simplify online shopping has evolved
              into a comprehensive platform where quality meets convenience.
              Every product in our catalog is carefully selected and tested to
              ensure it meets our high standards.
            </p>
          </div>

          {/* Mission & Values */}
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To provide exceptional products and shopping experiences that
                exceed customer expectations while building lasting
                relationships.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h3>Quality First</h3>
              <p>
                Every product goes through rigorous quality checks. We partner
                only with trusted suppliers who share our commitment to
                excellence.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>
                Quick and reliable shipping to get your orders to you as fast as
                possible, because we know you're excited about your purchase.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="content-section">
            <h2>Why Choose Shopee?</h2>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-bullet">✓</span>
                <div>
                  <strong>Curated Selection:</strong> Hand-picked products that
                  meet our quality standards
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-bullet">✓</span>
                <div>
                  <strong>Competitive Pricing:</strong> Fair prices without
                  compromising on quality
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-bullet">✓</span>
                <div>
                  <strong>Secure Shopping:</strong> Safe and secure payment
                  processing
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-bullet">✓</span>
                <div>
                  <strong>Personal Touch:</strong> Direct communication with our
                  team
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <h2>Ready to Start Shopping?</h2>
            <p>Discover our curated collection of premium products today.</p>
            <div className="cta-buttons">
              <Link to="/product_list" className="cta-button bordered-button">
                Browse Products
              </Link>
              <Link to="/contact" className="cta-button bordered-button">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
