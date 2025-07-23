// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slice/ProductSlice";
import UserSlice from "./slice/UserSlice";
import CartSlice from "./slice/CartSlice";
import AddressSlice from "./slice/addressSlice";
<<<<<<< HEAD
=======
import OrdersSlice from "./slice/OrdersSlice";
>>>>>>> 7790dde (Admin Panel)

export const store = configureStore({
  reducer: {
    products: ProductSlice,
    user: UserSlice,
    cart: CartSlice,
    address: AddressSlice,
<<<<<<< HEAD
=======
    orders: OrdersSlice
>>>>>>> 7790dde (Admin Panel)
  },
});

export default store;
