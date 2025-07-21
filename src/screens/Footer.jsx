import "../scss/Footer.scss";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      {/* <div className="footer-container">
        <div className="categories">
          <Link to="/">Home</Link>
          <Link to="/cart">My cart</Link>
          <Link to="/product_list">Products</Link>
        </div>
        <div className="social-media-links">
          <FaFacebookF className="react-icons" />
          <FaTwitter className="react-icons" />
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
