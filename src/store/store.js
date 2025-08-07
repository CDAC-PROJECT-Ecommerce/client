import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slice/ProductSlice";
import UserSlice from "./slice/UserSlice";
import CartSlice from "./slice/CartSlice";
import AddressSlice from "./slice/addressSlice";
import OrdersSlice from "./slice/OrdersSlice";
import UserOrderSlice from "./slice/UserOrderSlice";
import UserProfile from "./slice/UserProfile";
import reviewReducer from './slice/ReviewSlice';
import AdminProductSlice from "./slice/AdminProductSlice";
import AdminOrderSlice from "./slice/AdminOrderSlice";

export const store = configureStore({
  reducer: {
    products: ProductSlice,
    user: UserSlice,
    cart: CartSlice,
    orders: OrdersSlice,
    address: AddressSlice,
    userOrder: UserOrderSlice,
    userProfile: UserProfile,
    review: reviewReducer,
    adminProducts: AdminProductSlice,
    adminOrders: AdminOrderSlice,
  },
});

export default store;