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
<<<<<<< HEAD
import MyCart from "./components/Cart/MyCart";
=======
import MyCart from "./components/MyCart";
import AdminRoutes from "./admin/routes/AdminRoutes";
>>>>>>> 7790dde (Admin Panel)

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
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/addAdress" element={<AddAddressPage />} />
        <Route path="/cart" element={<MyCart />} />
<<<<<<< HEAD
=======
        <Route path="/admin/*" element={<AdminRoutes />} />
>>>>>>> 7790dde (Admin Panel)
      </Routes>
      <Footer />
    </>
  );
};

export default App;
