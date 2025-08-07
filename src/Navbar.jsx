import { Link, useNavigate } from "react-router-dom";
import "./scss/Navbar.scss";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SearchProduct from "./components/SearchProduct";
import { MdMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { fetchToken, fetchUsernameAndRole } from "./store/slice/UserSlice";
import { emptyCart, fetchCart } from "./store/slice/CartSlice";
import { toggleProfile } from "./store/slice/UserProfile";
import ProfilePage from "./components/Profile/ProfilePage";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { Cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userToken, username, role } = useSelector((state) => state.user);
  const { isSidebarOpen } = useSelector((state) => state.userProfile);

  const handleProfile = () => {
    dispatch(toggleProfile());
  };

  useEffect(() => {
    dispatch(fetchToken());
  }, []);

  useEffect(() => {
    if (userToken !== null) {
      dispatch(fetchUsernameAndRole(userToken));
      dispatch(fetchCart());
    } else {
      dispatch(emptyCart());
    }
  }, [userToken]);

  return (
    <>
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
            {userToken !== null ? (
              <p onClick={handleProfile}>Hello {username?.split(" ")[0]}</p>
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
          {role === "ADMIN" ? <Link to="/admin">Admin</Link> : ""}
          {userToken !== null ? (
            <p onClick={handleProfile}>Hello {username?.split(" ")[0]}</p>
          ) : (
            <>
              <Link to="/signin">SignIn</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
      {isSidebarOpen && (
        <ProfilePage
          isSidebarOpen={isSidebarOpen}
          handleProfile={handleProfile}
        />
      )}
    </>
  );
};

export default Navbar;
