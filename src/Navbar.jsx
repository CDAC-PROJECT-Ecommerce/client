import { Link } from "react-router-dom";
import "./scss/Navbar.scss";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import SearchProduct from "./components/SearchProduct";

const Navbar = () => {
  const { Users } = useSelector((state) => state.user);
  const { Cart } = useSelector((state) => state.cart);
  return (
    <nav>
      <div className="navbar-logo">
        <Link to="/">Shopee</Link>
      </div>
      <SearchProduct />
      <div className="navbar-links">
        <div>
          <Link to="/cart">
            <FaShoppingCart className="cart-icon" />
          </Link>

          <span className="cart-badge">{Cart.length}</span>
        </div>
        {Users?.username ? (
          <p>Hello {Users.username}</p>
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
