import Homepage from "./screens/Homepage";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDisplay from "./components/ProductDisplay";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import AddAddressPage from "./components/Address/AddAddressPage";
import Footer from "./screens/Footer";
import MyCart from "./components/Cart/MyCart";
import AdminRoutes from "./admin/routes/AdminRoutes";
import ProfilePage from "./components/Profile/ProfilePage";

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
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
