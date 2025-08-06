// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slice/ProductSlice";
import UserSlice from "./slice/UserSlice";
import CartSlice from "./slice/CartSlice";
import AddressSlice from "./slice/addressSlice";
<<<<<<< HEAD
import OrdersSlice from "./slice/OrdersSlice"
import ProfileSlice from "./slice/profileSlice"

=======
import OrdersSlice from "./slice/OrdersSlice";
import UserOrderSlice from "./slice/UserOrderSlice";
>>>>>>> main

export const store = configureStore({
  reducer: {
    products: ProductSlice,
    user: UserSlice,
    cart: CartSlice,
    orders: OrdersSlice,
    address: AddressSlice,
<<<<<<< HEAD
    profile: ProfileSlice
=======
    userOrder: UserOrderSlice,
>>>>>>> main
  },
});

export default store;
