// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import ordersReducer from "./slices/OrdersSlice";
import categoriesReducer from "./slices/categoriesSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    categories: categoriesReducer,
  },
});

export default store;
