import { Link } from "react-router-dom";
<<<<<<< HEAD
import "./scss/Navbar.scss";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import SearchProduct from "./components/SearchProduct";
=======
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import "./scss/Navbar.scss";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
>>>>>>> 7790dde (Admin Panel)

const Navbar = () => {
  const { Users } = useSelector((state) => state.user);
  const { Cart } = useSelector((state) => state.cart);
  return (
    <nav>
      <div className="navbar-logo">
        <Link to="/">Shopee</Link>
      </div>
<<<<<<< HEAD
      <SearchProduct />
=======
      <div className="navbar-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
        />
      </div>

>>>>>>> 7790dde (Admin Panel)
      <div className="navbar-links">
        <div>
          <Link to="/cart">
            <FaShoppingCart className="cart-icon" />
          </Link>

          <span className="cart-badge">{Cart.length}</span>
        </div>
<<<<<<< HEAD
        {Users?.username ? (
          <p>Hello {Users.username}</p>
=======
        {Users?.name ? (
          <p>Hello {Users.name}</p>
>>>>>>> 7790dde (Admin Panel)
        ) : (
          <>
            <Link to="/signin">SignIn</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
