// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slice/ProductSlice";
import UserSlice from "./slice/UserSlice";
import CartSlice from "./slice/CartSlice";
import AddressSlice from "./slice/addressSlice";
import OrdersSlice from "./slice/OrdersSlice"
import UserOrderSlice from "./slice/UserOrderSlice";
import UserProfile from "./slice/UserProfile";

export const store = configureStore({
  reducer: {
    products: ProductSlice,
    user: UserSlice,
    cart: CartSlice,
    orders: OrdersSlice,
    address: AddressSlice,
    userOrder: UserOrderSlice,
    userProfile:UserProfile
  },
});

export default store;
