import { Link, useNavigate } from "react-router-dom";
import "./scss/Navbar.scss";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import SearchProduct from "./components/SearchProduct";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { Users } = useSelector((state) => state.user);
  const { Cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  return (
    <nav>
      <div className="navbar-logo">
        <Link to="/">Shopee</Link>
      </div>
      {openMenu && (
        <div className="menu-box">
          <div>
            <Link to="/cart">
              <div>
                <FaShoppingCart className="cart-icon" />
                <span className="cart-badge">{Cart.length}</span>
              </div>
              My cart
            </Link>
          </div>
          {Users?.username ? (
            <p onClick={() => navigate("/profile")}>Hello {Users.username}</p>
          ) : (
            <div>
              <Link to="/signin">SignIn</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>
      )}
      <SearchProduct setOpenMenu={setOpenMenu} />
      <div className="small-navbar-link-container">
        {!openMenu && (
          <MdMenu onClick={() => setOpenMenu(true)} className="menu-bar" />
        )}
        {openMenu && (
          <RxCross2 onClick={() => setOpenMenu(false)} className="menu-bar" />
        )}
      </div>
      <div className="navbar-links">
        <div>
          <Link to="/cart">
            <FaShoppingCart className="cart-icon" />
          </Link>

          <span className="cart-badge">{Cart.length}</span>
        </div>
        {Users?.username ? (
          <p onClick={() => navigate("/profile")}>Hello {Users.username}</p>
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
