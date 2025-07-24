import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        {/* Dashboard Card */}
        <div className="dashboard-card">
          <div className="card">
            <h2>Dashboard Overview</h2>
            <p>
              Order insights, totals, and current order and product summary.
            </p>
            <Link to="dashboard" className="card-btn">
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid-actions">
          <div className="grid-card">
            <Link to="orders" className="btn view">
              View Orders
            </Link>
          </div>

          <div className="grid-card">
            <Link to="viewproduct" className="btn update">
              View Product
            </Link>
          </div>

          <div className="grid-card">
            <Link to="addproduct" className="btn add">
              Add New Product
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
