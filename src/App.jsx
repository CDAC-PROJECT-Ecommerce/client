import Homepage from "./screens/Homepage";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDisplay from "./components/ProductDisplay";
// import "./assets/basic.css";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import AddAddressPage from "./components/Address/AddAddressPage";
import Footer from "./screens/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product_list" element={<ProductList />} />
        <Route path="/fullPageProduct" element={<ProductDisplay />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/cart" element={<CheckoutPage />} />
        <Route path="/addAdress" element={<AddAddressPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
